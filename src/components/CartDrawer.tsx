"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    removeItem,
    updateQuantity,
    totalPrice,
    clearCart,
  } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-rose-blush/20">
              <h2 className="font-display text-2xl font-semibold text-text-primary flex items-center gap-2">
                <ShoppingBag size={24} className="text-hot-pink" />
                Mi Carrito
              </h2>
              <button
                onClick={closeCart}
                className="w-10 h-10 rounded-full hover:bg-rose-blush/20 flex items-center justify-center transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="w-24 h-24 bg-rose-blush/10 rounded-full flex items-center justify-center mb-4">
                    <ShoppingBag size={40} className="text-rose-blush" />
                  </div>
                  <p className="text-text-secondary text-lg">Tu carrito está vacío</p>
                  <p className="text-text-secondary/60 text-sm mt-1">
                    ¡Agrega algo bonito!
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

                        <div className="flex items-center gap-3 mt-2">
                          <div className="flex items-center gap-2 bg-white rounded-full px-2 py-1">
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              className="w-7 h-7 rounded-full hover:bg-rose-blush/20 flex items-center justify-center transition-colors"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="w-6 text-center font-medium">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              className="w-7 h-7 rounded-full hover:bg-rose-blush/20 flex items-center justify-center transition-colors"
                            >
                              <Plus size={14} />
                            </button>
                          </div>

                          <button
                            onClick={() => removeItem(item.id)}
                            className="w-7 h-7 rounded-full hover:bg-red-100 flex items-center justify-center text-red-400 hover:text-red-500 transition-colors ml-auto"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-rose-blush/20 bg-white">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-text-secondary">Subtotal</span>
                  <span className="font-script text-2xl text-hot-pink">
                    €{totalPrice.toFixed(2)}
                  </span>
                </div>

                <button className="w-full bg-hot-pink text-white py-4 rounded-2xl font-medium text-lg hover:bg-deep-rose transition-colors active:scale-95">
                  Proceder al Pago
                </button>

                <button
                  onClick={clearCart}
                  className="w-full mt-3 text-text-secondary text-sm hover:text-red-500 transition-colors"
                >
                  Vaciar carrito
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
