import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import CategoriesSection from "@/components/CategoriesSection";
import ProductGrid from "@/components/ProductGrid";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-cream-white">
      <Header />
      <HeroSection />
      <CategoriesSection />
      <ProductGrid />
      <TestimonialsCarousel />
      <Footer />
    </main>
  );
}
