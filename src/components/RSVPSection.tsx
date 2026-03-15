"use client";

import { useRef, useState } from "react";
import { Guest } from "@/types";
import Section from "./Section";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { toPng } from "html-to-image";
import { Download } from "lucide-react";

export default function RSVPSection({ guest }: { guest: Guest }) {
  const [formData, setFormData] = useState({
    presence: "oui",
    message: "",
  });
  const [showTicket, setShowTicket] = useState(false);
  const ticketRef = useRef<HTMLDivElement>(null);

  const downloadTicket = async () => {
    if (ticketRef.current === null) return;
    try {
      const dataUrl = await toPng(ticketRef.current, {
        cacheBust: true,
        backgroundColor: "#ffffff",
        pixelRatio: 2, // Higher quality
        style: {
          margin: "0",
          display: "block",
        },
      });
      const link = document.createElement("a");
      link.download = `ticket-${guest.prenom}-${guest.nom}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Erreur lors du téléchargement du billet :", err);
    }
  };

  const handleWhatsApp = () => {
    const isPresent = formData.presence === "oui";
    const status = isPresent
      ? "Confirme ma présence"
      : "Ne pourra malheureusement pas être présent(e)";
    const guestFull = `${guest.prenom} ${guest.nom}`;

    let messageContent = `*RÉPONSE INVITATION MARIAGE GAËLLE & JOËL*\n\n`;
    messageContent += `*Invité(e):* ${guestFull}\n`;
    messageContent += `*Statut:* ${status}\n`;

    if (formData.message.trim()) {
      messageContent += `\n*Note personnelle:*\n"${formData.message.trim()}"\n`;
    }

    messageContent += `\n---\n_Envoyé depuis le site de Gaëlle & Joël_`;

    const encodedText = encodeURIComponent(messageContent);
    const phoneNumber = guest.contactSms || "237696049817";

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
    <Section id="rsvp" className="bg-peach-light/20 rounded-[50px] my-20 py-20">
      <div className="max-w-2xl mx-auto text-center space-y-12">
        <div className="space-y-4">
          <h2 className="text-5xl md:text-6xl font-delphia text-royal-blue">
            Confirmez votre présence
          </h2>
          <p className="text-royal-blue font-serif text-xl">
            <span className="text-3xl font-bold italic">
              {guest.prenom} {guest.nom},
            </span>{" "}
            <br />
            Nous avons hâte de célébrer avec vous !
          </p>
        </div>

        <div className="space-y-6 text-left bg-white/40 backdrop-blur-md p-8 md:p-12 rounded-[30px] shadow-sm border border-peach/10">
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest font-bold text-royal-blue/80">
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
            <label className="text-xs uppercase tracking-widest font-bold text-royal-blue/80">
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
              onClick={handleWhatsApp}
              className="flex-1 py-4 bg-royal-blue text-white rounded-xl font-bold hover:bg-royal-blue/90 transition-all active:scale-95"
            >
              Réserver sur WhatsApp
            </button>
            <button
              onClick={() => setShowTicket(true)}
              className="flex-1 py-4 border-2 border-royal-blue text-royal-blue rounded-xl font-bold hover:bg-royal-blue/5 transition-all active:scale-95"
            >
              Générer mon Billet
            </button>
          </div>
        </div>

        {showTicket && (
          <div className="space-y-6">
            <motion.div
              ref={ticketRef}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="mt-12 max-w-sm mx-auto p-4 bg-white rounded-[40px] shadow-2xl overflow-hidden relative"
            >
              {/* Artistic Border/Frame */}
              <div className="border-4 border-peach/20 rounded-[32px] p-8 flex flex-col items-center bg-[radial-gradient(circle_at_top_right,#fff5f0_0%,#ffffff_60%)]">
                {/* Couple Header */}
                <div className="space-y-1 mb-8">
                  <h4 className="font-delphia text-3xl text-royal-blue leading-tight">
                    Gaëlle & Joël
                  </h4>
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-8 h-[1px] bg-peach/30" />
                    <span className="text-peach text-sm uppercase tracking-widest font-bold">
                      25.04.2026
                    </span>
                    <div className="w-8 h-[1px] bg-peach/30" />
                  </div>
                </div>

                {/* Guest Information */}
                <div className="space-y-6 w-full py-8 border-y border-peach/10">
                  <div className="space-y-1">
                    <p className="text-[10px] uppercase font-bold text-royal-blue/40 tracking-[0.3em]">
                      Invité(e)
                    </p>
                    <p className="font-serif text-2xl text-royal-blue font-bold">
                      {guest.slug === "general" ? "Invité(e)" : `${guest.prenom} ${guest.nom}`}
                    </p>
                  </div>

                  {/* Tables Details */}
                  {guest.slug !== "general" && (
                    <div className="grid grid-cols-1 gap-4">
                      {guest.groupes.includes("vh") && (
                        <div className="bg-royal-blue/5 p-3 rounded-2xl border border-royal-blue/5">
                          <p className="text-[9px] uppercase font-bold text-royal-blue/60 tracking-wider">
                            Vin d'Honneur
                          </p>
                          <p className="text-royal-blue font-semibold">
                            Table : {guest.tableVH || guest.table || "N/A"}
                          </p>
                        </div>
                      )}
                      {guest.groupes.includes("diner") && (
                        <div className="bg-peach/5 p-3 rounded-2xl border border-peach/10">
                          <p className="text-[9px] uppercase font-bold text-peach/80 tracking-wider">
                            Gala Nuptial
                          </p>
                          <p className="text-royal-blue font-semibold">
                            Table : {guest.tableDiner || guest.table || "N/A"}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="pt-8 flex flex-col items-center gap-4">
                  <p className="text-[10px] uppercase tracking-[0.5em] text-royal-blue/30 font-bold">
                    G & J • 2026
                  </p>
                </div>

                {/* Background Decorations */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-peach/5 rounded-full blur-3xl -z-10" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-royal-blue/5 rounded-full blur-3xl -z-10" />
              </div>
            </motion.div>

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={downloadTicket}
              className="inline-flex items-center gap-3 px-8 py-4 bg-royal-blue text-white rounded-2xl font-bold shadow-xl hover:bg-royal-blue/90 transition-all active:scale-95 group"
            >
              <Download className="w-5 h-5 group-hover:translate-y-0.5 transition-transform" />
              <span>Télécharger mon billet</span>
            </motion.button>
          </div>
        )}
      </div>
    </Section>
  );
}
