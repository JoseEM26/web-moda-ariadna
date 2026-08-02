"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Minus, Plus, ShoppingBag, Heart, Check, Truck, Shield, RotateCcw } from "lucide-react";
import Link from "next/link";
import { products, getProductById } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

export default function ProductDetailPage() {
  const params = useParams();
  const { addItem } = useCart();
  const { isInWishlist, toggleItem } = useWishlist();

  const product = getProductById(Number(params.id));
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-cream-white">
        <p className="text-text-secondary mb-4">Producto no encontrado</p>
        <Link href="/" className="text-hot-pink hover:text-deep-rose transition-colors">
          Volver al inicio
        </Link>
      </div>
    );
  }

  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
  };

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-cream-white">
      <header className="bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-2 text-text-primary hover:text-hot-pink transition-colors"
            >
              <ArrowLeft size={24} />
              <span className="font-medium">Volver</span>
            </Link>
            <Link href="/" className="font-display text-2xl font-semibold tracking-widest">
              P&A COQUETTE
            </Link>
            <div className="w-20" />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-lavender-dream/20 mb-4">
              <img
                src={product.images?.[selectedImage] || product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.isNew && (
                <div className="absolute top-4 left-4 bg-hot-pink text-white text-sm font-medium px-4 py-2 rounded-full">
                  Nuevo
                </div>
              )}
            </div>

            {product.images && product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                      selectedImage === idx ? "border-hot-pink" : "border-transparent"
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col"
          >
            <span className="text-text-secondary text-sm uppercase tracking-wider mb-2">
              {product.category === "carteras" ? "Carteras" : "Maquillaje"}
            </span>

            <h1 className="font-display text-3xl md:text-4xl font-semibold text-text-primary mb-4">
              {product.name}
            </h1>

            <p className="font-script text-3xl text-hot-pink mb-6">€{product.price}</p>

            <p className="text-text-secondary leading-relaxed mb-8">{product.description}</p>

            <div className="mb-6">
              <label className="block text-text-primary font-medium mb-3">Cantidad</label>
              <div className="flex items-center gap-4">
                <div className="flex items-center border-2 border-rose-blush/30 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 flex items-center justify-center hover:bg-rose-blush/10 transition-colors"
                  >
                    <Minus size={18} />
                  </button>
                  <span className="w-16 text-center font-medium text-lg">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-12 h-12 flex items-center justify-center hover:bg-rose-blush/10 transition-colors"
                  >
                    <Plus size={18} />
                  </button>
                </div>
                <span className="text-text-secondary text-sm">
                  Total: {quantity * product.price}€
                </span>
              </div>
            </div>

            <div className="flex gap-4 mb-8">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-hot-pink text-white py-4 rounded-2xl font-medium text-lg hover:bg-deep-rose transition-colors active:scale-95 flex items-center justify-center gap-2"
              >
                <ShoppingBag size={20} />
                Añadir al Carrito
              </button>
              <button
                onClick={() => toggleItem(product)}
                className={`w-14 h-14 rounded-2xl border-2 flex items-center justify-center transition-all ${
                  inWishlist
                    ? "border-hot-pink bg-hot-pink text-white"
                    : "border-rose-blush/30 hover:border-hot-pink"
                }`}
              >
                <Heart size={24} className={inWishlist ? "fill-white" : ""} />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-6 bg-white rounded-2xl mb-8">
              <div className="flex items-center gap-3">
                <Truck size={20} className="text-hot-pink" />
                <div>
                  <p className="font-medium text-text-primary text-sm">Envío Gratis</p>
                  <p className="text-text-secondary text-xs">Pedidos +€50</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Shield size={20} className="text-hot-pink" />
                <div>
                  <p className="font-medium text-text-primary text-sm">Pago Seguro</p>
                  <p className="text-text-secondary text-xs">100% protegido</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <RotateCcw size={20} className="text-hot-pink" />
                <div>
                  <p className="font-medium text-text-primary text-sm">Devolución</p>
                  <p className="text-text-secondary text-xs">30 días</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6">
              <h3 className="font-display text-lg font-semibold text-text-primary mb-4">
                Detalles del Producto
              </h3>
              <ul className="space-y-2">
                {product.details.map((detail, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-text-secondary">
                    <Check size={16} className="text-hot-pink" />
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        {relatedProducts.length > 0 && (
          <section className="mt-16 md:mt-24">
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-text-primary text-center mb-8">
              También te puede gustar
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {relatedProducts.map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Link href={`/product/${item.id}`}>
                    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                      <div className="aspect-[4/5] overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-medium text-text-primary truncate">{item.name}</h3>
                        <p className="font-script text-hot-pink text-lg">€{item.price}</p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
