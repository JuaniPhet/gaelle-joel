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
    <footer className="py-12 px-6 border-t border-peach/10 text-center space-y-4 bg-background relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-peach/30 to-transparent" />

      <div className="font-serif text-2xl text-royal-blue pt-4 flex items-center justify-center gap-4">
        <span className="text-peach/40 text-sm">❀</span>
        Gaëlle & Joël
        <span className="text-peach/40 text-sm">♥</span>
      </div>

      <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-royal-blue/40 font-bold">
        25 AVRIL 2026 • YAOUNDÉ, CAMEROUN
      </p>

      <div className="pt-8 opacity-30 text-[9px] uppercase tracking-widest text-royal-blue flex items-center justify-center gap-2">
        <span>© 2026 — Fait avec</span>
        <span className="text-peach text-xs">♥</span>
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
        className="fixed bottom-8 right-8 z-40 bg-royal-blue text-white p-4 rounded-full shadow-2xl hover:bg-royal-blue/90 transition-all hover:-translate-y-1 active:scale-95 group"
        aria-label="Retour en haut"
      >
        <ChevronUp className="w-6 h-6 group-hover:animate-bounce" />
      </motion.button>
    </footer>
  );
}
