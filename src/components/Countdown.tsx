"use client";

import { useEffect, useState } from "react";
import Section from "./Section";
import { motion } from "framer-motion";

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date("2026-04-25T08:30:00").getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        ),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const TimerBox = ({ label, value }: { label: string; value: number }) => (
    <div className="flex flex-col items-center bg-white/50 backdrop-blur-sm p-4 md:p-8 rounded-3xl border border-peach/20 shadow-sm w-full animate-fade-up">
      <span className="text-4xl md:text-6xl font-serif text-royal-blue mb-2">
        {value.toString().padStart(2, "0")}
      </span>
      <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-peach">
        {label}
      </span>
    </div>
  );

  return (
    <Section className="py-32 relative text-center">
      {/* Hand-drawn style accents (SVGs) */}
      <div className="max-w-4xl mx-auto space-y-16 relative">
        <div className="space-y-4">
          <h2 className="text-5xl md:text-6xl font-delphia text-royal-blue">
            Nous comptons les jours
          </h2>
          <p className="text-royal-blue/80 text-xl">
            Notre journée spéciale se dessine dans...
          </p>
        </div>

        <div className="grid grid-cols-4 gap-2 px-2 md:grid-cols-4 md:gap-4 md:px-4">
          <TimerBox label="Jours" value={timeLeft.days} />
          <TimerBox label="Heures" value={timeLeft.hours} />
          <TimerBox label="Minutes" value={timeLeft.minutes} />
          <TimerBox label="Secondes" value={timeLeft.seconds} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="flex justify-center items-center gap-6 mt-12 bg-white/30 backdrop-blur-3xl py-6 px-10 rounded-full border border-peach/10 shadow-sm inline-flex mx-auto"
        >
          <span className="font-delphia text-4xl text-royal-blue/60 group-hover:text-royal-blue transition-colors duration-500">
            Gaëlle
          </span>

          <div className="relative flex items-center justify-center w-12 h-12">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.4, 0.8, 0.4],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute inset-0 bg-peach/20 rounded-full blur-md"
            />
            <motion.span
              animate={{
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="text-peach text-3xl z-10 filter drop-shadow-sm"
            >
              ♥
            </motion.span>
          </div>

          <span className="font-delphia text-4xl text-royal-blue/60 group-hover:text-royal-blue transition-colors duration-500">
            Joël
          </span>
        </motion.div>
      </div>
    </Section>
  );
}
