"use client";

import { motion, useScroll, useAnimationControls } from "framer-motion";
import { ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";

export default function Footer() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="py-12 px-6 border-t border-peach/10 text-center space-y-4 bg-royal-blue relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-peach/30 to-transparent" />

      <div className="font-delphia text-5xl text-background pt-4 flex items-center justify-center gap-4">
        Gaëlle & Joël
      </div>

      <p className="font-sans text-xl tracking-widest text-peach/80 font-bold">
        25 Avril 2026 • Douala
      </p>

      <div className="flex items-center justify-center gap-6">
        <div className="w-16 h-[2px] bg-white/40" />
        <span className="text-peach text-3xl animate-pulse">♥</span>
        <div className="w-16 h-[2px] bg-white/40" />
      </div>

      <div className="pt-8 opacity-70 text-sm md:text-base tracking-widest text-background flex items-center justify-center gap-2 whitespace-nowrap">
        <span>Fait avec</span>
        <span className="text-peach-light text-3xl animate-pulse">♥</span>
        <span>pour notre grand jour</span>
      </div>

      {/* Scroll to Top Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: isVisible ? 1 : 0.5,
          pointerEvents: isVisible ? "auto" : "none",
        }}
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 z-40 bg-peach text-royal-blue p-4 rounded-full shadow-2xl hover:bg-peach/90 transition-all hover:-translate-y-1 active:scale-95 group"
        aria-label="Retour en haut"
      >
        <ChevronUp className="w-6 h-6 group-hover:animate-bounce" />
      </motion.button>
    </footer>
  );
}
