"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

interface ScrollIndicatorProps {
  show?: boolean;
}

export default function ScrollIndicator({ show = true }: ScrollIndicatorProps) {
  const [isVisible, setIsVisible] = useState(true);
  const { scrollYProgress } = useScroll();

  // Tous les Hooks doivent être appelés au premier niveau, sans condition
  const opacity = useTransform(scrollYProgress, [0, 0.9], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.1], [1, 0.9]);
  const progressHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    const handleScroll = () => {
      // Masquer si on est tout en bas (marge de 100px)
      const isAtBottom =
        Math.ceil(window.innerHeight + window.scrollY) >=
        document.documentElement.scrollHeight - 100;
      setIsVisible(!isAtBottom);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Si "show" est faux, on ne rend rien, mais les hooks ci-dessus ont déjà été appelés
  if (!show) return null;

  return (
    <motion.div
      style={{ opacity, scale }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: isVisible ? 1 : 0, 
        y: isVisible ? [0, 10, 0] : 20,
      }}
      transition={{
        y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
        opacity: { duration: 0.5 }
      }}
      className="fixed bottom-12 left-1/2 -translate-x-1/2 z-[999] pointer-events-none flex flex-col items-center gap-3"
    >
      <div className="bg-royal-blue/90 backdrop-blur-md text-white px-6 py-3 rounded-full shadow-[0_15px_35px_rgba(43,80,170,0.3)] flex items-center gap-3 border border-white/20">
        <span className="text-[10px] font-bold uppercase tracking-[0.3em] font-sans">
          Découvrir
        </span>
        <motion.div
           animate={{ y: [0, 3, 0] }}
           transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown className="w-4 h-4 text-peach" />
        </motion.div>
      </div>
      
      {/* Barre de progression subtile */}
      <div className="w-[2px] h-12 bg-royal-blue/10 rounded-full relative overflow-hidden">
        <motion.div 
          className="absolute top-0 left-0 w-full bg-peach shadow-[0_0_8px_rgba(255,176,128,0.8)]"
          style={{ height: progressHeight }}
        />
      </div>
    </motion.div>
  );
}
