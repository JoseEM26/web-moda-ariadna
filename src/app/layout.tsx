import type { Metadata } from "next";
import { Cormorant_Garamond, Quicksand, Petit_Formal_Script } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const petitFormal = Petit_Formal_Script({
  variable: "--font-petit-formal",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "P&A Coquette | Carteras & Maquillaje",
  description: "Tesoros para la Tú Extraordinaria. Descubre carteras artesanales y maquillaje premium en nuestra boutique coquette.",
  icons: {
    icon: [
      {
        url: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>💖</text></svg>",
        type: "image/svg+xml",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${cormorant.variable} ${quicksand.variable} ${petitFormal.variable}`}>
      <body className="min-h-screen flex flex-col antialiased">
        {children}
      </body>
    </html>
  );
}
