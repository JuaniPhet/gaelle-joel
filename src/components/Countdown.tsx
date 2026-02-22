"use client";

import { useEffect, useState } from "react";
import Section from "./Section";

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
          <h2 className="text-3xl md:text-5xl font-serif text-royal-blue">
            Le décompte a commencé
          </h2>
          <p className="text-royal-blue/60 italic">
            Chaque seconde nous rapproche de ce moment magique.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-4">
          <TimerBox label="Jours" value={timeLeft.days} />
          <TimerBox label="Heures" value={timeLeft.hours} />
          <TimerBox label="Minutes" value={timeLeft.minutes} />
          <TimerBox label="Secondes" value={timeLeft.seconds} />
        </div>

        <div className="flex justify-center items-center gap-8 opacity-40 select-none">
          <span className="font-serif italic text-xl">Gaëlle</span>
          <div className="w-16 h-[1px] bg-royal-blue relative">
            <div className="absolute -top-1 left-1/2 w-2 h-2 rounded-full bg-peach" />
          </div>
          <span className="font-serif italic text-xl">Joël</span>
        </div>
      </div>
    </Section>
  );
}
