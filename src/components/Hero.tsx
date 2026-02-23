"use client";

import { Guest } from "@/types";
import { motion } from "framer-motion";

export default function Hero({ guest }: { guest: Guest }) {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 pb-10 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-peach/10 rounded-full blur-3xl -z-10 animate-pulse" />
      <div className="absolute bottom-10 left-0 w-80 h-80 bg-royal-blue/5 rounded-full blur-3xl -z-10" />

      {/* Floating Decorative Elements - Visible on all screens */}
      <motion.div
        animate={{
          y: [0, -15, 0],
          rotate: [0, 5, 0],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[20%] left-[5%] md:left-[10%] text-peach text-2xl md:text-3xl select-none"
      >
        ❀
      </motion.div>
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[35%] right-[8%] md:right-[15%] text-peach text-lg md:text-xl select-none"
      >
        ♥
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="text-center space-y-6 z-10 w-full px-4"
      >
        <h2 className="font-serif text-4xl md:text-6xl text-royal-blue tracking-tighter">
          Gaëlle & Joël
        </h2>

        {/* Invisible Image Container for Layout only */}
        <div className="relative w-full h-[450px] md:h-[450px] mx-auto my-4 overflow-hidden">
          <motion.img
            src="/img/hero-image.png"
            alt="Gaëlle & Joël"
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
            }}
            className="w-full h-full object-contain"
          />
        </div>

        <div className="space-y-2">
          <p className="font-sans text-xs md:text-sm uppercase tracking-[0.3em] text-peach font-bold">
            Bienvenue à notre mariage
          </p>
          <h1 className="font-serif text-3xl md:text-5xl text-royal-blue">
            {guest.prenom}
          </h1>
        </div>
      </motion.div>

      {/* Modern Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 flex flex-col items-center gap-3"
      >
        <span className="text-[10px] uppercase tracking-[0.4em] text-royal-blue/60 font-semibold">
          Découvrir
        </span>
        <div className="relative w-[2px] h-12 bg-royal-blue/10 rounded-full overflow-hidden">
          <motion.div
            animate={{
              y: [-48, 48],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-transparent via-royal-blue to-transparent"
          />
        </div>
      </motion.div>
    </section>
  );
}
