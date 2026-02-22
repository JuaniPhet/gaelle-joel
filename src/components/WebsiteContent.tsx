"use client";

import { useState } from "react";
import { Guest } from "@/types";
import Envelope from "./Envelope";
import Section from "./Section";
import Hero from "./Hero";
import EventSection from "./EventSection";
import RSVPSection from "./RSVPSection";
import Countdown from "./Countdown";
import { TablePlan, ThemeVestimentaire, Consignes } from "./MiscSections";

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
            ? "opacity-100 transition-opacity duration-1000"
            : "opacity-0 invisible"
        }
      >
        <Hero guest={guest} />

        <Section className="text-center italic font-serif text-2xl lg:text-3xl text-royal-blue/80 py-32">
          "Les fleurs fleurissent, les coeurs s'aiment, et la vie trouve son
          plus beau sens entre les deux. Nous serons heureux de vous compter
          parmi nos convives le 25 Avril 2026."
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
      </div>
    </main>
  );
}
