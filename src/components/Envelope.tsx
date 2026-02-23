"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";

interface EnvelopeProps {
  guestName: string;
  onOpen: () => void;
}

export default function Envelope({ guestName, onOpen }: EnvelopeProps) {
  const envelopeRef = useRef<HTMLDivElement>(null);
  const lidRef = useRef<HTMLDivElement>(null);
  const letterRef = useRef<HTMLDivElement>(null);
  const sealRef = useRef<HTMLDivElement>(null);
  const [isOpened, setIsOpened] = useState(false);

  const handleOpen = () => {
    if (isOpened) return;
    setIsOpened(true);

    const tl = gsap.timeline({
      onComplete: onOpen,
    });

    // 1. Seal pop and fade
    tl.to(sealRef.current, {
      scale: 1.5,
      opacity: 0,
      duration: 0.5,
      ease: "back.in(1.7)",
    });

    // 2. Lid opens
    tl.to(
      lidRef.current,
      {
        rotateX: 180,
        duration: 1,
        transformOrigin: "top",
        ease: "power2.inOut",
      },
      "-=0.2",
    );

    // 3. Letter slides up and envelope fades
    tl.to(
      envelopeRef.current,
      {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: "power2.in",
      },
      "+=0.2",
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-peach-light/20 backdrop-blur-md">
      <div
        ref={envelopeRef}
        className="relative w-[320px] h-[220px] bg-white/90 rounded-b-lg shadow-2xl cursor-pointer perspective-1000"
        onClick={handleOpen}
      >
        {/* Lid */}
        <div
          ref={lidRef}
          className="absolute top-0 left-0 w-full h-full bg-white rounded-t-lg z-20 origin-top shadow-md"
          style={{ clipPath: "polygon(0 0, 100% 0, 50% 50%)" }}
        />

        {/* Body Front Overlay (to give depth) */}
        <div className="absolute inset-0 bg-white/95 z-10 rounded-b-lg overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.1),transparent)]" />
        </div>

        {/* Letter Inside */}
        <div
          ref={letterRef}
          className="absolute top-4 left-4 right-4 bottom-4 bg-white/95 shadow-inner flex flex-col items-center justify-center p-6 text-center border border-peach/20 z-0"
        >
          <p className="font-serif text-royal-blue text-sm uppercase tracking-widest mb-2">
            Invitation pour
          </p>
          <h2 className="font-delphia text-3xl text-royal-blue">{guestName}</h2>
          <div className="w-12 h-[1px] bg-peach mt-4" />
        </div>

        {/* Golden Seal */}
        <div
          ref={sealRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 w-16 h-16 bg-[#D4AF37] rounded-full shadow-lg flex items-center justify-center cursor-pointer hover:scale-110 transition-transform"
        >
          <div className="w-14 h-14 border border-white/30 rounded-full flex items-center justify-center text-white font-serif text-[10px] text-center leading-tight">
            OUVRIR
            <br />
            <span className="font-delphia text-sm tracking-normal">G&J</span>
          </div>
        </div>
      </div>
    </div>
  );
}
