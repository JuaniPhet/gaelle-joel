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
import ScrollIndicator from "./ScrollIndicator";

export default function WebsiteContent({ guest }: { guest: Guest }) {
  const [showSite, setShowSite] = useState(false);

  return (
    <main className="min-h-screen bg-background selection:bg-peach/30">
      {!showSite && (
        <Envelope
          guestName={guest.slug === "general" ? "" : `${guest.prenom} ${guest.nom}`}
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

        <Section className="text-center font-serif text-2xl lg:text-3xl text-foreground/80 py-32 space-y-12 relative overflow-hidden">
          <motion.div
            animate={{ y: [0, -10, 0], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-10 left-1/2 -translate-x-1/2 text-peach text-4xl"
          >
            ❀
          </motion.div>
          <div className="max-w-4xl mx-auto space-y-4">
            {[
              "Les fleurs fleurissent,",
              "les coeurs s'aiment,",
              "et la vie trouve son plus beau sens entre les deux.",
              "Nous serons heureux de vous compter parmi nos convives le",
            ].map((line, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 1 }}
                className="leading-tight"
              >
                {line}
              </motion.p>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 4.3 }}
            >
              <motion.p
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2,
                }}
                className="font-bold text-royal-blue text-4xl lg:text-5xl mt-4"
              >
                25 Avril 2026
              </motion.p>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 5 }}
            className="max-w-3xl mx-auto rounded-[50px] overflow-hidden shadow-xl aspect-[4/5] lg:aspect-video"
          >
            <img
              src="img/22.png"
              alt="Gaelle & Joel"
              className="w-full h-full object-cover"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.5 }}
            className="mt-10 bg-white/40 backdrop-blur-3xl py-5 px-5 rounded-full border border-peach/20 shadow-sm inline-flex items-center gap-3 mx-auto group hover:bg-white/50 transition-all duration-500"
          >
            <div className="flex flex-col items-center">
              <span className="text-royal-blue/40 text-[10px] uppercase font-bold tracking-[0.4em] mb-1 leading-none">
                Thème du Mariage
              </span>
              <span className="text-royal-blue font-serif text-2xl lg:text-3xl italic tracking-wide">
                « Du Mur au Jardin »
              </span>
            </div>
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="text-peach text-2xl opacity-60 group-hover:opacity-100 transition-opacity"
            >
              ❀
            </motion.span>
          </motion.div>
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
            time="09:00"
            location="Happyness Garden (Nyalla Kambo)"
            description={[
              "Dans ce cadre enchanteur,",
              "entouré de fleurs et de verdure,",
              "vous serez témoins du début d'une aventure éternelle.",
            ]}
            image="img/2.jpeg"
            zoomInfo={{ id: "308 981 2058", password: "2020" }}
          />
        )}

        {guest.groupes.includes("salle-royaume") && (
          <EventSection
            title="La Bénédiction Nuptiale"
            time="12:30"
            location="Salle du Royaume (Kambo-Pariso)"
            description="Nous nous y retrouverons pour la bénédiction nuptiale dans la sérénité et le respect."
            image="img/44.png"
            reversed
            zoomInfo={{ id: "308 981 2058", password: "2020" }}
          />
        )}

        {guest.groupes.includes("vh") && (
          <EventSection
            title="Le Vin d 'Honneur"
            time="13:30"
            location="Happyness Garden (Nyalla Kambo)"
            description="Le jardin réouvrira à nouveau ses portes afin que nous partagions un moment convivial ensemble."
            image="img/5.jpg"
            footerText="Nous avons hâte de passer cette journée en votre compagnie."
          />
        )}

        {guest.groupes.includes("diner") && (
          <EventSection
            title="Le Gala Nuptial"
            time="18:30"
            location="Salle de fête de Rodann (après l'agence eneo Yassa)"
            description={[
              "Les fleurs ont éclos,",
              "le jardin est en fête.",
              "L'amour est dans l'air et la musique est prête.",
            ]}
            image="img/3.png"
            footerText="Il ne manque plus que vous."
          />
        )}

        {guest.slug !== "general" && <TablePlan guest={guest} />}

        <Consignes />

        <ThemeVestimentaire />

        <RSVPSection guest={guest} />

        <Countdown />

        <Footer />
      </div>
      <ScrollIndicator show={showSite} />
    </main>
  );
}
