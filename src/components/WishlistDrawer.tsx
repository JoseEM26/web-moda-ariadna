"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Heart, Trash2 } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";

export default function WishlistDrawer() {
  const { totalItems } = useWishlist();

  return (
    <AnimatePresence>
      {totalItems > 0 && (
        <div className="fixed bottom-20 right-4 z-40">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="relative"
          >
            <div className="bg-hot-pink text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center cursor-pointer hover:bg-deep-rose transition-colors">
              <Heart size={24} className="fill-white" />
            </div>
            <span className="absolute -top-2 -right-2 w-6 h-6 bg-deep-rose text-white text-xs rounded-full flex items-center justify-center font-medium">
              {totalItems}
            </span>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export function WishlistDrawerFull({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { items, removeItem, totalItems } = useWishlist();
  const { addItem } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-rose-blush/20">
              <h2 className="font-display text-2xl font-semibold text-text-primary flex items-center gap-2">
                <Heart size={24} className="text-hot-pink fill-hot-pink" />
                Mi Wishlist
              </h2>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full hover:bg-rose-blush/20 flex items-center justify-center transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="w-24 h-24 bg-rose-blush/10 rounded-full flex items-center justify-center mb-4">
                    <Heart size={40} className="text-rose-blush" />
                  </div>
                  <p className="text-text-secondary text-lg">Tu wishlist está vacío</p>
                  <p className="text-text-secondary/60 text-sm mt-1">
                    ¡Guarda lo que te gusta!
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      className="flex gap-4 p-4 bg-lavender-dream/10 rounded-2xl"
                    >
                      <div className="w-20 h-20 relative rounded-xl overflow-hidden bg-white flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-text-primary truncate">
                          {item.name}
                        </h3>
                        <p className="font-script text-hot-pink text-lg mt-1">
                          €{item.price}
                        </p>

                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => {
                              addItem(item);
                              removeItem(item.id);
                            }}
                            className="flex-1 bg-hot-pink text-white py-2 rounded-xl text-sm font-medium hover:bg-deep-rose transition-colors"
                          >
                            Añadir al Carrito
                          </button>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="w-9 h-9 rounded-full hover:bg-red-100 flex items-center justify-center text-red-400 hover:text-red-500 transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
