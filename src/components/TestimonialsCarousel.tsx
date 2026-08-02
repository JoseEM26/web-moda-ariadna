"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  avatar: string;
  rating: number;
  text: string;
  product: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "María García",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    rating: 5,
    text: "La cartera que compré es absolutamente beautiful. La calidad supera expectativas y el servicio fue impecable. Ya estoy buscando mi próxima compra.",
    product: "Cartera Rosa Cuero",
  },
  {
    id: 2,
    name: "Carolina Ruiz",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    rating: 5,
    text: "Encontré mi paleta de sombras perfecta aquí. Los colores son exactly lo que buscaba y la textura es increíble. 100% recomendado.",
    product: "Paleta Sombras",
  },
  {
    id: 3,
    name: "Ana Martínez",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
    rating: 5,
    text: "El packaging llegó como un regalo, todo tão bem cuidado. La cartera es even prettier que nas fotos. Super recomendado!",
    product: "Bolso Lavanda",
  },
  {
    id: 4,
    name: "Sofia López",
    avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop",
    rating: 5,
    text: "Compré el kit de maquillaje y foi a melhor decisão. Productos de alta calidad, envío rápido y el soporte es muito atencioso.",
    product: "Kit Maquillaje Premium",
  },
];

export default function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  return (
    <section id="testimonials" className="py-16 md:py-24 px-4 bg-lavender-dream/20">
      <div className="max-w-7xl mx-auto">
        <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="font-script text-hot-pink text-lg">Testimonios</span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold mt-2 text-text-primary">
            Lo Que Dicen Nuestras Clientas
          </h2>
        </motion.div>

        {/* Carousel container */}
        <div
          className="relative max-w-4xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Navigation arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-rose-blush transition-colors z-10"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={20} className="text-text-primary" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-rose-blush transition-colors z-10"
            aria-label="Next testimonial"
          >
            <ChevronRight size={20} className="text-text-primary" />
          </button>

          {/* Testimonial cards */}
          <div className="overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="bg-white rounded-3xl p-8 md:p-12 shadow-lg"
              >
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  {/* Avatar */}
                  <div className="flex-shrink-0">
                    <motion.img
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.2, duration: 0.4 }}
                      src={testimonials[currentIndex].avatar}
                      alt={testimonials[currentIndex].name}
                      className="w-24 h-24 rounded-full object-cover border-4 border-rose-blush/30"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 text-center md:text-left">
                    {/* Stars */}
                    <div className="flex items-center justify-center md:justify-start gap-1 mb-4">
                      {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: 0.1 + i * 0.05, duration: 0.3 }}
                        >
                          <Star
                            size={20}
                            className="fill-hot-pink text-hot-pink"
                          />
                        </motion.div>
                      ))}
                    </div>

                    {/* Quote */}
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.4 }}
                      className="text-text-primary text-lg md:text-xl italic mb-6 leading-relaxed"
                    >
                      &ldquo;{testimonials[currentIndex].text}&rdquo;
                    </motion.p>

                    {/* Author info */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3, duration: 0.4 }}
                    >
                      <p className="font-medium text-text-primary">
                        {testimonials[currentIndex].name}
                      </p>
                      <p className="text-text-secondary text-sm">
                        Compró: {testimonials[currentIndex].product}
                      </p>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots indicator */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "w-8 bg-hot-pink"
                    : "bg-rose-blush hover:bg-hot-pink/50"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
