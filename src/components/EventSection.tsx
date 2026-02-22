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
}

export default function EventSection({
  title,
  time,
  location,
  description,
  image,
  reversed,
  footerText,
}: EventSectionProps) {
  return (
    <Section className="py-24">
      <div
        className={cn(
          "flex flex-col gap-12 items-center",
          reversed ? "lg:flex-row-reverse" : "lg:flex-row",
        )}
      >
        {/* Image with Organic/Ovale Mask */}
        <div className="w-full lg:w-1/2 relative aspect-[4/5] rounded-[100px] overflow-hidden shadow-xl border border-peach/20 group">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-royal-blue/10 group-hover:bg-transparent transition-colors duration-500" />
        </div>

        {/* Text Content */}
        <div className="w-full lg:w-1/2 space-y-6 text-center lg:text-left px-4">
          <div className="space-y-1">
            <span className="text-peach font-sans font-bold text-sm tracking-widest uppercase">
              {time}
            </span>
            <h3 className="text-3xl md:text-4xl font-serif text-royal-blue">
              {title}
            </h3>
            <p className="text-royal-blue/60 italic font-serif">{location}</p>
          </div>

          <p className="text-foreground/80 leading-relaxed font-sans text-lg">
            {description}
          </p>

          {footerText && (
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="pt-8 font-serif text-2xl text-royal-blue text-center lg:text-left"
            >
              {footerText}
            </motion.p>
          )}
        </div>
      </div>
    </Section>
  );
}
