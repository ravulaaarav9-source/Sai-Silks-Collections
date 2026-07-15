"use client";
import { useState, useEffect } from "react";
import { FaWhatsapp } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Phone, ArrowRight, Star, ShieldCheck, Clock } from "lucide-react";

// Site Images
const heroImages = [
  "/site-images/Hero%20Section%201.png",
  "/site-images/Hero%20Section%202.png",
  "/site-images/Hero%20Section%203.png",
];

const categories = [
  { name: "Cotton Sarees", image: "/site-images/Cotton%20Sarees.png", link: "/products?category=cotton" },
  { name: "Designer Sarees", image: "/site-images/Designer%20Sarees.png", link: "/products?category=designer" },
  { name: "Dress Materials", image: "/site-images/Dress%20Materials.png", link: "/products?category=dress-materials" },
  { name: "Kalamkari", image: "/site-images/Kalamkari.png", link: "/products?category=kalamkari" },
  { name: "Nighties", image: "/site-images/Nighties.png", link: "/products?category=nighties" },
  { name: "Blouse Bundles", image: "/site-images/Blouse%20Bundles.png", link: "/products?category=blouse-bundles" },
  { name: "Handloom Sarees", image: "/site-images/Handloom%20Sarees.png", link: "/products?category=handloom" },
  { name: "Pattu Sarees", image: "/site-images/Pattu%20Sarees.png", link: "/products?category=pattu" },
];



export default function Home() {
  const [currentHero, setCurrentHero] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHero((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[90vh] md:h-[80vh] w-full overflow-hidden flex items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentHero}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 z-0"
          >
            <div className="absolute inset-0 bg-black/40 z-10" />
            <Image
              src={heroImages[currentHero]}
              alt="Sai Silks Hero"
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        </AnimatePresence>

        <div className="container mx-auto px-4 md:px-6 relative z-20 text-white pt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold leading-tight mb-6 text-white drop-shadow-lg">
              Discover Timeless <span className="text-secondary">Elegance</span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl drop-shadow-md">
              Premium Collection of Sarees, Dress Materials & Handloom Fabrics for Every Occasion.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/products"
                className="bg-primary hover:bg-primary-hover text-white px-8 py-4 rounded-md font-medium transition-all flex items-center gap-2"
              >
                <ShoppingBag size={20} />
                Shop Now
              </Link>
              <a
                href="https://wa.me/919642449960"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] hover:bg-[#1EBE5D] text-white px-8 py-4 rounded-md font-medium transition-all flex items-center gap-2"
              >
                <FaWhatsapp size={20} />
                WhatsApp Order
              </a>
              <a
                href="tel:9642449960"
                className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white px-8 py-4 rounded-md font-medium transition-all flex items-center gap-2"
              >
                <Phone size={20} />
                Call Now
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">Shop by Category</h2>
            <div className="h-1 w-24 bg-secondary mx-auto"></div>
          </div>

          <div className="overflow-hidden whitespace-nowrap relative">
            {/* Left and Right gradients for smooth fading */}
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10"></div>
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10"></div>
            
            <motion.div
              className="flex gap-8 w-max"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
            >
              {/* Double array to create a seamless loop */}
              {[...categories, ...categories].map((category, index) => (
                <div
                  key={`${category.name}-${index}`}
                  className="group cursor-pointer rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all w-72 shrink-0"
                >
                  <Link href={category.link}>
                    <div className="relative h-80 overflow-hidden">
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors z-10" />
                      <Image
                        src={category.image}
                        alt={category.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 300px"
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute bottom-0 left-0 w-full p-6 z-20 translate-y-2 group-hover:translate-y-0 transition-transform">
                        <h3 className="text-2xl font-bold text-white mb-2 whitespace-normal">{category.name}</h3>
                        <div className="flex items-center text-secondary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                          View Collection <ArrowRight size={16} className="ml-1" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>


    </div>
  );
}
