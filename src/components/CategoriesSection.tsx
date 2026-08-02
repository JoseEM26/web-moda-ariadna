"use client";

import { motion } from "framer-motion";
import { Handbag, Sparkles } from "lucide-react";

const categories = [
  {
    id: "carteras",
    title: "Carteras",
    description: "Artesanales y únicas",
    icon: Handbag,
    gradient: "from-rose-blush/60 to-rose-blush/20",
    hoverGradient: "hover:from-rose-blush/80 hover:to-rose-blush/40",
    image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&h=400&fit=crop",
  },
  {
    id: "maquillaje",
    title: "Maquillaje",
    description: "Belleza premium",
    icon: Sparkles,
    gradient: "from-soft-lavender/60 to-lavender-dream/20",
    hoverGradient: "hover:from-soft-lavender/80 hover:to-lavender-dream/40",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&h=400&fit=crop",
  },
];

export default function CategoriesSection() {
  return (
    <section id="categories" className="py-16 md:py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="font-script text-hot-pink text-lg">Explora</span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold mt-2 text-text-primary">
            Nuestras Colecciones
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.a
                key={category.id}
                href={`#${category.id}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={{ scale: 1.03, y: -5 }}
                className={`relative group block overflow-hidden rounded-3xl bg-gradient-to-br ${category.gradient} ${category.hoverGradient} p-8 md:p-12 shadow-lg transition-shadow duration-300 hover:shadow-xl`}
              >
                {/* Background image with overlay */}
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-20 group-hover:opacity-30 transition-opacity duration-500"
                  style={{ backgroundImage: `url(${category.image})` }}
                />

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center text-center">
                  <motion.div
                    whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                    transition={{ duration: 0.4 }}
                    className="w-20 h-20 bg-white/40 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6 group-hover:bg-white/50 transition-colors"
                  >
                    <Icon size={36} className="text-hot-pink" />
                  </motion.div>

                  <h3 className="font-display text-2xl md:text-3xl font-semibold text-text-primary mb-2">
                    {category.title}
                  </h3>
                  <p className="text-text-secondary font-medium">
                    {category.description}
                  </p>

                  <div className="mt-6 inline-flex items-center gap-2 text-hot-pink font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>Explorar</span>
                    <svg
                      className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-4 right-4 w-16 h-16 bg-white/10 rounded-full blur-xl" />
                <div className="absolute bottom-4 left-4 w-12 h-12 bg-white/10 rounded-full blur-lg" />
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
