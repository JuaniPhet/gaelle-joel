"use client";

import { Guest } from "@/types";
import { motion } from "framer-motion";

export default function Hero({ guest }: { guest: Guest }) {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 pb-10 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-peach/10 rounded-full blur-3xl -z-10 animate-pulse" />
      <div className="absolute bottom-10 left-0 w-80 h-80 bg-royal-blue/5 rounded-full blur-3xl -z-10" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="text-center space-y-6 z-10"
      >
        <h2 className="font-serif text-4xl md:text-6xl text-royal-blue tracking-tighter">
          Gaëlle & Joël
        </h2>

        {/* Arch Masked Photo */}
        <div className="relative w-[280px] h-[400px] md:w-[350px] md:h-[500px] mx-auto my-8 overflow-hidden rounded-t-full shadow-2xl border-4 border-peach-light/50">
          <img
            src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=800"
            alt="Gaëlle & Joël"
            className="w-full h-full object-cover transition-transform duration-[3s] hover:scale-110"
          />
        </div>

        <div className="space-y-2">
          <p className="font-sans text-sm uppercase tracking-[0.3em] text-peach font-bold">
            Bienvenue à notre mariage
          </p>
          <h1 className="font-serif text-3xl md:text-5xl text-royal-blue">
            {guest.prenom}
          </h1>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 flex flex-col items-center gap-2 opacity-50"
      >
        <span className="text-[10px] uppercase tracking-widest text-royal-blue">
          Découvrir
        </span>
        <div className="w-[1px] h-10 bg-royal-blue" />
      </motion.div>
    </section>
  );
}
