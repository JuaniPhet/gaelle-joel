"use client";

import { useState } from "react";
import { Guest } from "@/types";
import Section from "./Section";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";

export default function RSVPSection({ guest }: { guest: Guest }) {
  const [formData, setFormData] = useState({
    presence: "oui",
    nombre: 1,
    message: "",
  });
  const [showTicket, setShowTicket] = useState(false);

  const handleWhatsApp = () => {
    const isPresent = formData.presence === "oui";
    const status = isPresent
      ? "Confirme ma présence ✅"
      : "Ne pourra malheureusement pas être présent(e) ❌";
    const guestFull = `${guest.prenom} ${guest.nom}`;

    let messageContent = `✨ *RÉPONSE INVITATION MARIAGE GAËLLE & JOËL* ✨\n\n`;
    messageContent += `*Invité(e):* ${guestFull}\n`;
    messageContent += `*Statut:* ${status}\n`;

    if (isPresent) {
      messageContent += `*Nombre de personnes:* ${formData.nombre}\n`;
    }

    if (formData.message.trim()) {
      messageContent += `\n*Note personnelle:*\n"${formData.message.trim()}"\n`;
    }

    messageContent += `\n---\n_Envoyé depuis le site de Gaëlle & Joël_`;

    const encodedText = encodeURIComponent(messageContent);
    const phoneNumber = guest.contactSms || "237695098342";

    window.open(`https://wa.me/${phoneNumber}?text=${encodedText}`, "_blank");

    if (isPresent) {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#2b50aa", "#ffb080", "#ffffff"],
      });
    }
  };

  return (
    <Section id="rsvp" className="bg-peach-light/20 rounded-[50px] mb-20 py-20">
      <div className="max-w-2xl mx-auto text-center space-y-12">
        <div className="space-y-4">
          <h2 className="text-4xl md:text-5xl font-delphia text-royal-blue">
            Confirmez votre présence {guest.prenom}
          </h2>
          <p className="text-royal-blue/70">
            Nous avons hâte de célébrer avec vous !
          </p>
        </div>

        <div className="space-y-6 text-left bg-white/40 backdrop-blur-md p-8 md:p-12 rounded-[30px] shadow-sm border border-peach/10">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest font-bold text-royal-blue/50">
                Présence
              </label>
              <select
                value={formData.presence}
                onChange={(e) =>
                  setFormData({ ...formData, presence: e.target.value as any })
                }
                className="w-full p-4 rounded-xl border border-peach/20 focus:ring-2 focus:ring-peach bg-transparent outline-none"
              >
                <option value="oui">Oui je serai là</option>
                <option value="non">Non désolé(e)</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest font-bold text-royal-blue/50">
                Nombre de places
              </label>
              <select
                value={formData.nombre}
                onChange={(e) =>
                  setFormData({ ...formData, nombre: parseInt(e.target.value) })
                }
                className="w-full p-4 rounded-xl border border-peach/20 focus:ring-2 focus:ring-peach bg-transparent outline-none"
              >
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest font-bold text-royal-blue/50">
              Un petit mot pour nous ?
            </label>
            <textarea
              rows={4}
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              placeholder="Votre message ici..."
              className="w-full p-4 rounded-xl border border-peach/20 focus:ring-2 focus:ring-peach bg-transparent outline-none resize-none"
            />
          </div>

          <div className="flex flex-col md:flex-row gap-4 pt-4">
            <button
              onClick={() => setShowTicket(true)}
              className="flex-1 py-4 bg-royal-blue text-white rounded-xl font-bold hover:bg-royal-blue/90 transition-all active:scale-95"
            >
              Générer mon Billet
            </button>
            <button
              onClick={handleWhatsApp}
              className="flex-1 py-4 border-2 border-royal-blue text-royal-blue rounded-xl font-bold hover:bg-royal-blue/5 transition-all active:scale-95"
            >
              Réserver via WhatsApp
            </button>
          </div>
        </div>

        {showTicket && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="mt-12 p-8 bg-white border-2 border-dashed border-royal-blue/30 rounded-3xl relative overflow-hidden group shadow-xl"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-peach/10 -rotate-45 translate-x-12 -translate-y-12" />
            <div className="space-y-6">
              <div className="flex justify-between items-start border-b border-royal-blue/10 pb-4">
                <div className="text-left">
                  <p className="text-[10px] uppercase font-bold text-royal-blue/40 tracking-widest">
                    Invité
                  </p>
                  <p className="font-delphia text-3xl text-royal-blue">
                    {guest.prenom} {guest.nom}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] uppercase font-bold text-royal-blue/40 tracking-widest">
                    Table
                  </p>
                  <p className="font-serif text-xl text-royal-blue">
                    {guest.table}
                  </p>
                </div>
              </div>
              <div className="flex justify-between items-center text-left">
                <div>
                  <p className="text-[10px] uppercase font-bold text-royal-blue/40 tracking-widest">
                    Date
                  </p>
                  <p className="font-serif text-lg text-royal-blue">
                    25 Avril 2026
                  </p>
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-royal-blue/40 tracking-widest">
                    Places
                  </p>
                  <p className="font-serif text-lg text-royal-blue">
                    ADMIS x {formData.nombre}
                  </p>
                </div>
              </div>
              <div className="pt-4 opacity-30 text-[10px] uppercase tracking-[0.5em]">
                G & J 2026 OFFICIAL TICKET
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </Section>
  );
}
