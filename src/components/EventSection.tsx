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
          "flex flex-col-reverse gap-12 items-center",
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
            <p className="text-peach font-sans font-bold text-2xl tracking-widest uppercase">
              {time}
            </p>
            <h3 className="text-5xl md:text-6xl font-delphia text-royal-blue">
              {title}
            </h3>
            <p className="text-royal-blue/60 font-sans">{location}</p>
          </div>

          <p className="text-foreground/80 leading-relaxed font-serif text-2xl">
            {description}
          </p>

          {/* Desktop Footer (Inside text column) */}
          <div className="relative pt-12 hidden lg:block">
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
