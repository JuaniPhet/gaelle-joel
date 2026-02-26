"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface EnvelopeProps {
  guestName: string;
  onOpen: () => void;
}

const WaxSeal = () => (
  <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center group">
    {/* Outer Wax Texture - Irregular shape */}
    <div className="absolute inset-0 bg-[#d4af37] rounded-full shadow-lg overflow-hidden blur-[0.3px] transform group-hover:scale-105 transition-transform duration-300">
      <div className="absolute inset-0 bg-gradient-to-tr from-[#9b710b] via-[#cf9f2d] to-[#efd279] opacity-90" />
      <div className="absolute inset-2 border-[1px] border-white/20 rounded-full" />
      {/* Texture spots */}
      <div className="absolute top-2 left-4 w-4 h-4 bg-white/10 rounded-full blur-sm" />
      <div className="absolute bottom-4 right-6 w-6 h-6 bg-black/10 rounded-full blur-md" />
    </div>

    {/* Inner Seal Content */}
    <div className="relative z-10 flex flex-col items-center justify-center text-[#7a5500] pointer-events-none select-none">
      <span className="text-[10px] sm:text-[12px] uppercase tracking-[0.25em] font-serif font-bold mb-0.5 drop-shadow-sm">
        Ouvrir
      </span>
      <div className="w-8 h-[1px] bg-[#7a5500]/40 my-1" />
      <div className="flex items-center gap-1 opacity-80">
        <span className="text-[6px] uppercase tracking-tighter">❦</span>
        <span className="text-[14px] sm:text-[16px] font-delphia">G&J</span>
        <span className="text-[6px] uppercase tracking-tighter">❦</span>
      </div>
    </div>

    {/* Realistic Wax Edges / Ripple */}
    <div className="absolute -inset-2 border-[8px] border-[#cf9f2d]/10 rounded-full blur-xl animate-pulse" />
  </div>
);

export default function Envelope({ guestName, onOpen }: EnvelopeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const envelopeRef = useRef<HTMLDivElement>(null);
  const lidRef = useRef<HTMLDivElement>(null);
  const sealRef = useRef<HTMLDivElement>(null);
  const [isOpened, setIsOpened] = useState(false);

  const handleOpen = () => {
    if (isOpened) return;
    setIsOpened(true);

    const tl = gsap.timeline({
      onComplete: onOpen,
    });

    // 1. Seal animation - Pops slightly then flies off
    tl.to(sealRef.current, {
      scale: 1.3,
      y: -30,
      opacity: 0,
      duration: 0.7,
      ease: "back.in(1.7)",
    });

    // 2. Lid opens - Clean vertical rotation for both
    tl.to(
      lidRef.current,
      {
        rotateX: 160,
        duration: 1.5,
        transformOrigin: "top",
        ease: "power3.inOut",
      },
      "-=0.4",
    );

    // 3. Whole container fades and shrinks
    tl.to(
      containerRef.current,
      {
        scale: 1.2,
        opacity: 0,
        filter: "blur(10px)",
        duration: 1,
        ease: "power2.in",
      },
      "-=0.5",
    );
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#fdfaf8] overflow-hidden"
    >
      {/* Soft Elegant Background */}
      <div className="absolute inset-0 bg-[#f8f7f2]" />
      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_50%_50%,#ffb080_0%,transparent_70%)]" />

      {/* Envelope Container */}
      <div
        ref={envelopeRef}
        onClick={handleOpen}
        className={`relative cursor-pointer group active:scale-[0.99] transition-all duration-700
          ${/* Responsive Sizing */ ""}
          md:w-[850px] md:h-[500px] w-[320px] h-[460px]
          bg-[#fcfbf7] shadow-[0_40px_100px_rgba(0,0,0,0.12)]
          perspective-3000
        `}
      >
        {/* Shadow Overlay for Depth */}
        <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.03)] z-0" />

        {/* Names and Date on Front (under the seat area) */}
        <div className="absolute inset-0 flex flex-col items-center justify-start pointer-events-none z-10 px-6 py-12 md:py-16 text-center">
          <div className="mb-4 md:mb-8 space-y-1 md:space-y-3">
            <h1 className="font-delphia text-4xl md:text-7xl text-royal-blue drop-shadow-sm px-4">
              Gaëlle et Joël
            </h1>
            <p className="font-serif text-sm md:text-2xl text-royal-blue/60 tracking-[0.3em] md:tracking-[0.4em] uppercase">
              25 Avril 2026
            </p>
          </div>
          <div className="w-16 md:w-24 h-[1px] bg-peach/40 mb-4 md:mb-8" />
          <div className="space-y-1 mt-auto pb-12 md:pb-20">
            <span className="font-serif text-royal-blue/80 text-lg md:text-2xl">
              {guestName}
            </span>
          </div>
        </div>

        {/* Flaps Construction */}

        {/* Left Flap */}
        <div className="absolute inset-0 bg-[#f4f3ed] z-0 [clip-path:polygon(0_0,0_100%,50%_50%)] shadow-inner" />

        {/* Right Flap */}
        <div className="absolute inset-0 bg-[#f4f3ed] z-0 [clip-path:polygon(100%_0,100%_100%,50%_50%)] shadow-inner" />

        {/* Bottom Flap */}
        <div className="absolute inset-0 bg-[#eff0e9] z-0 [clip-path:polygon(0_100%,100%_100%,50%_50%)] border-t border-black/5" />

        {/* Top Opening Lid (The one that animates) */}
        <div
          ref={lidRef}
          className="absolute inset-0 bg-[#fdfdfb] z-20 shadow-[0_10px_30px_rgba(0,0,0,0.05)] origin-top [clip-path:polygon(0_0,100%_0,50%_50%)]"
          style={{
            boxShadow: "inset 0 -2px 10px rgba(0,0,0,0.05)",
          }}
        />

        {/* Wax Seal Positioned at the tip of the lid */}
        <div
          ref={sealRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30"
          style={{
            filter: "drop-shadow(0 8px 15px rgba(0,0,0,0.3))",
          }}
        >
          <WaxSeal />
        </div>
      </div>

      {/* Floating Instructions */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 pointer-events-none">
        <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-royal-blue/20 to-transparent" />
        <span className="text-royal-blue/40 font-serif text-xs tracking-[0.5em] uppercase">
          Appuyez pour découvrir
        </span>
      </div>
    </div>
  );
}
