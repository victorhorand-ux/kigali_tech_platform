// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "@/app/globals.css"; // Ensure your Tailwind directives are here
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";

// Configure optimized Google Fonts with CSS variables
const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-inter",
  display: "swap",
});

const montserrat = Montserrat({ 
  subsets: ["latin"], 
  variable: "--font-montserrat",
  display: "swap",
});

// Centralized SEO Metadata Engine Base
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: {
    default: "Premium Security & Electronics in Kigali",
    template: "%s | Kigali Tech Platform",
  },
  description:
    "Rwanda's leading provider for professional TV wall mounting, CCTV camera installation, smart home networking, and premium electronics.",
  openGraph: {
    title: "Premium Security & Electronics in Kigali",
    description: "Professional TV wall mounting, CCTV camera installation, and smart home networking across Rwanda.",
    url: "/",
    siteName: "Kigali Tech Platform",
    locale: "en_RW",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Added data-scroll-behavior="smooth" to prevent Next.js console warnings
  return (
    <html lang="en" className="scroll-smooth" data-scroll-behavior="smooth">
      <body 
        className={`${inter.variable} ${montserrat.variable} flex min-h-screen flex-col bg-white font-sans text-gray-900 antialiased`}
      >
        <Navbar />
        <div className="flex-grow">{children}</div>
        <Footer />
      </body>
    </html>
  );
}