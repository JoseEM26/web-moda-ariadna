export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  images?: string[];
  isNew?: boolean;
  category: string;
  description: string;
  details: string[];
}

export const products: Product[] = [
  {
    id: 1,
    name: "Cartera Rosa Cuero",
    price: 89,
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=500&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&h=1000&fit=crop",
    ],
    isNew: true,
    category: "carteras",
    description: "Cartera artesanal elaborada en cuero rosa de alta calidad. Perfecta para cualquier ocasión, combina elegancia con funcionalidad.",
    details: ["Material: Cuero genuino", "Color: Rosa empolvado", "Dimensiones: 28x20x10cm", "Interior forrado", "Bolsillo interior con zipper"],
  },
  {
    id: 2,
    name: "Bolso Lavanda",
    price: 120,
    image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400&h=500&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&h=1000&fit=crop",
    ],
    category: "carteras",
    description: "Bolso en tono lavanda con acabado suave y elegante. Ideal para el día a día o eventos especiales.",
    details: ["Material: Cuero sintético premium", "Color: Lavanda", "Dimensiones: 32x25x12cm", "Tirantes ajustables", "3 bolsillos exteriores"],
  },
  {
    id: 3,
    name: "Paleta Sombras",
    price: 45,
    image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400&h=500&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=800&h=1000&fit=crop",
    ],
    isNew: true,
    category: "maquillaje",
    description: "Paleta de sombras con 12 tonos irresistibles, desde nudes hasta vibrantes. Textura sedosa y alta pigmentación.",
    details: ["12 tonos variados", "Acabado: Mate y shimmer", "Duración: 8+ horas", "Vegano y libre de crueldad", "Incluye pincel aplicador"],
  },
  {
    id: 4,
    name: "Labial Rosa Mate",
    price: 28,
    image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&h=500&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=800&h=1000&fit=crop",
    ],
    category: "maquillaje",
    description: "Labial rojo rosa mate de larga duración. Fórmula cremosa que hidrata mientras define tus labios.",
    details: ["Color: Rosa empolvado", "Acabado: Mate", "Duración: 6+ horas", "No tested en animales", "Contenido: 3.5g"],
  },
  {
    id: 5,
    name: "Clutch Dorado",
    price: 75,
    image: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=400&h=500&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=800&h=1000&fit=crop",
    ],
    category: "carteras",
    description: "Clutch dorado elegante para ocasiones especiales. Estilo minimalista con acabado metálico.",
    details: ["Material: Cuero con acabado dorado", "Color: Dorado", "Dimensiones: 25x15x5cm", "Cierre con broche magnético", "Interior satinado"],
  },
  {
    id: 6,
    name: "Rímel Volumen",
    price: 32,
    image: "https://images.unsplash.com/photo-1631214524020-7e18db9a8f92?w=400&h=500&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1631214524020-7e18db9a8f92?w=800&h=1000&fit=crop",
    ],
    category: "maquillaje",
    description: "Rímel que aporta volumen extremo a tus pestañas. Cepillo curves que atrapa cada pestaña.",
    details: ["Color: Negro", "Efecto: Volumen intenso", "Duración: 12 horas sin borrones", "Resistente al agua", "Contenido: 10ml"],
  },
  {
    id: 7,
    name: "Mochila Mini",
    price: 95,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=500&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=1000&fit=crop",
    ],
    category: "carteras",
    description: "Mochila mini en tendencia. Perfecta para quotidien con estilo. Funcional y fashionable.",
    details: ["Material:Canvas premium", "Color: Negro/Rosa", "Dimensiones: 24x30x10cm", "Compartimento laptop", "Bolsillo frontal con zipper"],
  },
  {
    id: 8,
    name: "Iluminador Dulce",
    price: 38,
    image: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=400&h=500&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=800&h=1000&fit=crop",
    ],
    isNew: true,
    category: "maquillaje",
    description: "Iluminador en polvo con finish radiante. Aporta eseglow natural y saludable a tu piel.",
    details: ["Tono: Dulce rosa", "Acabado: Radiante", "Textura: Polvo fino", "Vegano y libre de crueldad", "Contenido: 8g"],
  },
];

export function getProductById(id: number): Product | undefined {
  return products.find((p) => p.id === id);
}
