"use client";

import { motion } from "framer-motion";
import { Sparkles, Truck, Shield, Gift } from "lucide-react";

const promotions = [
  {
    id: 1,
    code: "BIENVENIDA15",
    discount: "15%",
    description: "en tu primera compra",
    color: "from-hot-pink to-deep-rose",
  },
  {
    id: 2,
    code: "ENVIOGRATIS",
    discount: "GRATIS",
    description: "en pedidos +€50",
    color: "from-lavender-dream to-soft-lavender",
  },
];

const features = [
  {
    icon: Truck,
    title: "Envío Gratis",
    subtitle: "En pedidos +€50",
  },
  {
    icon: Shield,
    title: "Pago Seguro",
    subtitle: "100% protegido",
  },
  {
    icon: Sparkles,
    title: "Calidad Premium",
    subtitle: "Productos selecionados",
  },
  {
    icon: Gift,
    title: "Empaque de Regalo",
    subtitle: "Siempre incluido",
  },
];

export default function PromotionsBanner() {
  return (
    <section className="bg-gradient-to-r from-rose-blush/30 via-lavender-dream/30 to-rose-blush/30 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Promo codes */}
        <div className="grid md:grid-cols-2 gap-4 mb-12">
          {promotions.map((promo, index) => (
            <motion.div
              key={promo.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className={`bg-gradient-to-r ${promo.color} p-6 rounded-2xl text-white`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-script text-3xl">{promo.discount}</span>
                  <p className="text-white/80 text-sm mt-1">{promo.description}</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl">
                  <span className="font-mono font-bold tracking-wider">{promo.code}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Features */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="text-center"
              >
                <div className="w-14 h-14 mx-auto bg-white rounded-2xl shadow-md flex items-center justify-center mb-3">
                  <Icon size={24} className="text-hot-pink" />
                </div>
                <h3 className="font-medium text-text-primary">{feature.title}</h3>
                <p className="text-text-secondary text-sm">{feature.subtitle}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
