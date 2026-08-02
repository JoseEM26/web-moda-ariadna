"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingBag, Heart } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { products } from "@/data/products";

function ProductCard({ product, index }: { product: typeof products[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const { addItem } = useCart();
  const { isInWishlist, toggleItem } = useWishlist();

  const inWishlist = isInWishlist(product.id);

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300">
        <div className="relative aspect-[4/5] overflow-hidden bg-lavender-dream/20">
          <Link href={`/product/${product.id}`}>
            {!imageLoaded && !imageError && (
              <div className="absolute inset-0 bg-gradient-to-br from-rose-blush/20 to-lavender-dream/20 animate-pulse" />
            )}

            {imageError ? (
              <div className="absolute inset-0 flex items-center justify-center bg-rose-blush/10">
                <span className="text-rose-blush text-4xl">👛</span>
              </div>
            ) : (
              <motion.img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover cursor-pointer"
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageError(true)}
                animate={{ scale: isHovered ? 1.08 : 1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                style={{ opacity: imageLoaded ? 1 : 0 }}
              />
            )}
          </Link>

          {product.isNew && (
            <div className="absolute top-4 left-4 bg-hot-pink text-white text-xs font-medium px-3 py-1.5 rounded-full">
              Nuevo
            </div>
          )}

          <motion.button
            onClick={(e) => {
              e.preventDefault();
              toggleItem(product);
            }}
            className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:bg-white transition-colors z-10"
            aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
            whileTap={{ scale: 0.9 }}
          >
            <motion.div
              animate={{ scale: inWishlist ? [1, 1.3, 1] : 1 }}
              transition={{ duration: 0.3 }}
            >
              <Heart
                size={20}
                className={inWishlist ? "fill-hot-pink text-hot-pink" : "text-text-secondary"}
              />
            </motion.div>
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-4 left-4 right-4"
          >
            <button
              onClick={(e) => {
                e.preventDefault();
                addItem(product);
              }}
              className="w-full bg-hot-pink text-white py-3 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-deep-rose transition-colors active:scale-95"
            >
              <ShoppingBag size={18} />
              Añadir al Carrito
            </button>
          </motion.div>
        </div>

        <Link href={`/product/${product.id}`}>
          <div className="p-5 cursor-pointer">
            <h3 className="font-medium text-text-primary mb-1 group-hover:text-hot-pink transition-colors">
              {product.name}
            </h3>
            <p className="font-script text-hot-pink text-xl">
              €{product.price}
            </p>
          </div>
        </Link>
      </div>
    </motion.article>
  );
}

export default function ProductGrid() {
  return (
    <section id="products" className="py-16 md:py-24 px-4 bg-gradient-to-b from-cream-white to-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="font-script text-hot-pink text-lg">Favoritos</span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold mt-2 text-text-primary">
            Productos Destacados
          </h2>
          <p className="text-text-secondary mt-4 max-w-2xl mx-auto">
            Piezas cuidadosamente seleccionadas que combinan calidad, estilo y personalidad para ti.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <a
            href="#products"
            className="inline-flex items-center gap-2 border-2 border-hot-pink text-hot-pink px-8 py-3 rounded-full font-medium hover:bg-hot-pink hover:text-white transition-all duration-300"
          >
            Ver Toda la Colección
          </a>
        </motion.div>
      </div>
    </section>
  );
}
