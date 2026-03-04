"use client";

import { cn } from "@/lib/utils";
import Section from "./Section";
import { motion } from "framer-motion";

interface EventSectionProps {
  title: string;
  time: string;
  location: string;
  description: string;
  image: string;
  reversed?: boolean;
  footerText?: string;
  zoomInfo?: {
    id: string;
    password: string;
  };
}

export default function EventSection({
  title,
  time,
  location,
  description,
  image,
  reversed,
  footerText,
  zoomInfo,
}: EventSectionProps) {
  return (
    <Section className="py-24">
      <div
        className={cn(
          "flex flex-col-reverse gap-12 items-center lg:items-start",
          reversed ? "lg:flex-row-reverse" : "lg:flex-row",
        )}
      >
        {/* Image with Organic/Ovale Mask */}
        <div className="w-full lg:w-1/2 flex flex-col gap-8">
          <div className="relative aspect-[4/4] rounded-[50px] overflow-hidden shadow-xl border border-peach/20 group">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-royal-blue/10 group-hover:bg-transparent transition-colors duration-500" />
          </div>

          {/* Mobile Zoom Box */}
          {zoomInfo && (
            <div className="lg:hidden mt-6">
              <ZoomBox id={zoomInfo.id} password={zoomInfo.password} />
            </div>
          )}

          {/* Mobile Footer (Under Image) */}
          <div className="relative lg:hidden text-center pt-8">
            {footerText && (
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="font-serif text-2xl text-royal-blue mb-8"
              >
                {footerText}
              </motion.p>
            )}
            <motion.span
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 0.4, scale: 1 }}
              className="text-peach text-2xl inline-block"
            >
              ♥
            </motion.span>
          </div>
        </div>

        {/* Text Content */}
        <div className="w-full lg:w-1/2 space-y-6 text-center lg:text-left px-4 relative">
          {/* Subtle decorations */}
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.3 }}
            className="absolute -top-8 -right-4 text-2xl text-peach hidden lg:block"
          >
            {reversed ? "❀" : "♥"}
          </motion.span>

          <div className="space-y-1">
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              animate={{
                scale: [1, 1.05, 1],
                textShadow: [
                  "0 0 0px rgba(255, 176, 128, 0)",
                  "0 0 10px rgba(255, 176, 128, 0.4)",
                  "0 0 0px rgba(255, 176, 128, 0)",
                ],
              }}
              transition={{
                scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                textShadow: {
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
                opacity: { duration: 0.8 },
                x: { duration: 0.8 },
              }}
              className="text-peach font-sans font-bold text-2xl tracking-widest uppercase"
            >
              {time}
            </motion.p>
            <h3 className="text-5xl md:text-6xl font-delphia text-royal-blue">
              {title}
            </h3>
            <p className="text-royal-blue/60 font-sans">{location}</p>
          </div>

          <p className="text-foreground/80 leading-relaxed font-serif text-2xl">
            {description}
          </p>

          {/* Desktop Zoom Box */}
          {zoomInfo && (
            <div className="hidden lg:block pt-2">
              <ZoomBox id={zoomInfo.id} password={zoomInfo.password} />
            </div>
          )}

          {/* Desktop Footer (Inside text column) */}
          <div className="relative pt-8 hidden lg:block">
            {footerText && (
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="font-serif text-2xl text-royal-blue mb-10 text-center lg:text-left"
              >
                {footerText}
              </motion.p>
            )}
            <motion.span
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 0.4, scale: 1 }}
              className="text-peach text-2xl inline-block lg:ml-0"
            >
              ♥
            </motion.span>
          </div>
        </div>
      </div>
    </Section>
  );
}

function ZoomBox({ id, password }: { id: string; password: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-3 p-6 bg-royal-blue/5 border border-royal-blue/10 rounded-[40px] backdrop-blur-sm w-full lg:w-fit shadow-sm lg:shadow-none"
    >
      <div className="flex items-center gap-3 text-royal-blue">
        <div className="p-2 bg-royal-blue text-white rounded-lg">
          <svg
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        </div>
        <span className="font-sans font-bold tracking-tight text-lg">
          Suivre en direct sur Zoom
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 text-left">
        <div className="space-y-1">
          <p className="text-[10px] text-royal-blue/50 uppercase font-black tracking-widest leading-none">
            ID Réunion
          </p>
          <p className="font-sans font-medium text-royal-blue/80 tabular-nums">
            {id}
          </p>
        </div>
        <div className="space-y-1">
          <p className="text-[10px] text-royal-blue/50 uppercase font-black tracking-widest leading-none">
            Code secret
          </p>
          <p className="font-sans font-medium text-royal-blue/80 tabular-nums">
            {password}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
