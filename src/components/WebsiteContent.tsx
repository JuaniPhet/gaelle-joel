"use client";

import { useState } from "react";
import { Guest } from "@/types";
import Envelope from "./Envelope";
import Section from "./Section";
import Hero from "./Hero";
import EventSection from "./EventSection";
import RSVPSection from "./RSVPSection";
import Countdown from "./Countdown";
import Footer from "./Footer";
import { TablePlan, ThemeVestimentaire, Consignes } from "./MiscSections";
import { motion } from "framer-motion";

export default function WebsiteContent({ guest }: { guest: Guest }) {
  const [showSite, setShowSite] = useState(false);

  return (
    <main className="min-h-screen bg-background selection:bg-peach/30">
      {!showSite && (
        <Envelope
          guestName={`${guest.prenom} ${guest.nom}`}
          onOpen={() => setShowSite(true)}
        />
      )}

      <div
        className={
          showSite
            ? "opacity-100 transition-opacity duration-1000 relative"
            : "opacity-0 invisible"
        }
      >
        {/* Global Floating Elements */}
        {showSite && (
          <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            <motion.div
              animate={{
                y: [0, -20, 0],
                rotate: [0, 10, 0],
                opacity: [0.1, 0.2, 0.1],
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-[15%] left-[5%] text-peach text-4xl"
            >
              ❀
            </motion.div>
            <motion.div
              animate={{
                y: [0, 20, 0],
                rotate: [0, -10, 0],
                opacity: [0.05, 0.15, 0.05],
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2,
              }}
              className="absolute top-[40%] right-[8%] text-royal-blue text-2xl"
            >
              ♥
            </motion.div>
            <motion.div
              animate={{
                y: [0, -15, 0],
                scale: [1, 1.1, 1],
                opacity: [0.08, 0.18, 0.08],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
              className="absolute top-[70%] left-[10%] text-peach text-3xl"
            >
              ♥
            </motion.div>
            <motion.div
              animate={{
                y: [0, 25, 0],
                rotate: [0, 15, 0],
                opacity: [0.1, 0.2, 0.1],
              }}
              transition={{
                duration: 14,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 3,
              }}
              className="absolute top-[85%] right-[5%] text-royal-blue text-4xl"
            >
              ❀
            </motion.div>
          </div>
        )}
        <Hero guest={guest} />

        <Section className="text-center italic font-serif text-2xl lg:text-3xl text-royal-blue/80 py-32 space-y-12 relative overflow-hidden">
          <motion.div
            animate={{ y: [0, -10, 0], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-10 left-1/2 -translate-x-1/2 text-peach text-4xl"
          >
            ❀
          </motion.div>
          <p>
            "Les fleurs fleurissent, les coeurs s'aiment, et la vie trouve son
            plus beau sens entre les deux. Nous serons heureux de vous compter
            parmi nos convives le 25 Avril 2026."
          </p>
          <div className="max-w-3xl mx-auto rounded-[100px] overflow-hidden shadow-xl aspect-video">
            <img
              src="https://images.unsplash.com/photo-1519225421980-619bd20196e5?auto=format&fit=crop&q=80&w=1200"
              alt="Décoration florale"
              className="w-full h-full object-cover"
            />
          </div>
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="text-peach text-3xl"
          >
            ♥
          </motion.div>
        </Section>

        {guest.groupes.includes("civil") && (
          <EventSection
            title="La Cérémonie Civile"
            time="08:30"
            location="Happyness Garden"
            description="Dans ce cadre enchanteur, entourés de fleurs et de verdure, vous serez témoins du début d'une aventure éternelle."
            image="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1200"
          />
        )}

        {guest.groupes.includes("salle-royaume") && (
          <EventSection
            title="La Bénédiction Nuptiale"
            time="11:00"
            location="Salle du Royaume (Kambo-Pariso)"
            description="Nous nous retrouverons pour la bénédiction nuptiale dans la sérénité et le respect."
            image="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=1200"
            reversed
          />
        )}

        {guest.groupes.includes("vh") && (
          <EventSection
            title="Le Vin d'Honneur"
            time="13:00"
            location="Happyness Garden"
            description="Le jardin réouvrira à nouveau ses portes afin que nous partagions un moment convivial ensemble."
            image="https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&q=80&w=1200"
          />
        )}

        {guest.groupes.includes("diner") && (
          <EventSection
            title="Le Gala Nuptial"
            time="18:30"
            location="Salle de fête de Rodann, Neptune Nyalla"
            description="Les fleurs ont éclos, le jardin est en fête. L'amour est dans l'air et la musique est prête."
            image="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=1200"
            footerText="Il ne manque plus que vous."
          />
        )}

        <TablePlan guest={guest} />

        <Consignes />

        <ThemeVestimentaire />

        <RSVPSection guest={guest} />

        <Countdown />

        <Footer />
      </div>
    </main>
  );
}
