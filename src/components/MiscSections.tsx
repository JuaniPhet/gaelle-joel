"use client";

import { Guest } from "@/types";
import Section from "./Section";

export function TablePlan({ guest }: { guest: Guest }) {
  const hasVH = guest.groupes.includes("vh");
  const hasDiner = guest.groupes.includes("diner");

  return (
    <Section className="text-center py-24">
      <div className="inline-block p-12 bg-white/60 backdrop-blur-sm rounded-[60px] shadow-lg border border-peach/10 space-y-8">
        <div className="space-y-4">
          <p className="text-peach font-delphia text-4xl tracking-widest">
            Votre Place
          </p>
          <div className="inline-flex items-center gap-4">
            <div className="w-20 h-[2px] bg-royal-blue/30" />
            <span className="text-peach text-2xl inline-block">♥</span>
            <div className="w-20 h-[2px] bg-royal-blue/30" />
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-1 divide-y divide-peach/10">
          {hasVH && (guest.tableVH || guest.table) && (
            <div className="pt-4 first:pt-0">
              <p className="text-sm text-royal-blue/50 uppercase tracking-widest mb-1 font-bold">
                Vin d'Honneur
              </p>
              <h3 className="text-2xl md:text-3xl font-serif font-bold text-royal-blue">
                Table : {guest.tableVH || guest.table}
              </h3>
            </div>
          )}

          {hasDiner && (guest.tableDiner || guest.table) && (
            <div className="pt-8 first:pt-0">
              <p className="text-sm text-royal-blue/50 uppercase tracking-widest mb-1 font-bold">
                Gala Nuptial
              </p>
              <h3 className="text-2xl md:text-3xl font-serif font-bold text-royal-blue">
                Table : {guest.tableDiner || guest.table}
              </h3>
            </div>
          )}

          {!hasVH && !hasDiner && guest.table && (
            <div className="pt-4">
              <h3 className="text-3xl md:text-4xl font-serif text-royal-blue">
                Votre table : {guest.table}
              </h3>
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}

export function ThemeVestimentaire() {
  return (
    <Section className="text-center py-24 bg-royal-blue/5 rounded-[50px] max-w-none w-full">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="space-y-2">
          <h3 className="text-5xl md:text-6xl font-delphia text-royal-blue">
            Thème Vestimentaire
          </h3>
          <p className="text-royal-blue/80 uppercase tracking-[0.1em] text-sm md:text-lg font-bold">
            Du mur au jardin
          </p>
        </div>

        <div className="flex flex-wrap md:flex-nowrap justify-center items-center gap-8 md:gap-12 px-4">
          <div className="flex flex-col items-center gap-3 w-[140px] md:w-auto">
            <div className="w-40 h-40 rounded-full bg-royal-blue shadow-xl transform hover:scale-110 transition-transform duration-300" />
            <span className="text-xs uppercase tracking-widest text-royal-blue/60 font-bold">
              Bleu Royal
            </span>
          </div>
          <div className="flex flex-col items-center gap-3 w-[140px] md:w-auto">
            <div className="w-40 h-40 rounded-full bg-royal-blue/80 shadow-xl transform hover:scale-110 transition-transform duration-300" />
            <span className="text-xs uppercase tracking-widest text-royal-blue/60 font-bold">
              Bleu Cassé
            </span>
          </div>
          <div className="flex flex-col items-center gap-3 w-[140px] md:w-auto">
            <div className="w-40 h-40 rounded-full bg-sky-blue shadow-xl transform hover:scale-110 transition-transform duration-300" />
            <span className="text-xs uppercase tracking-widest text-royal-blue/60 font-bold">
              Bleu Ciel
            </span>
          </div>
          <div className="flex flex-col items-center gap-3 w-[140px] md:w-auto">
            <div className="w-40 h-40 rounded-full bg-peach shadow-xl transform hover:scale-110 transition-transform duration-300" />
            <span className="text-xs uppercase tracking-widest text-royal-blue/60 font-bold">
              Saumon
            </span>
          </div>
          <div className="flex flex-col items-center gap-3 w-[140px] md:w-auto">
            <div className="w-40 h-40 rounded-full bg-peach-light shadow-xl transform hover:scale-110 transition-transform duration-300" />
            <span className="text-xs uppercase tracking-widest text-royal-blue/60 font-bold">
              Saumon Clair
            </span>
          </div>
          <div className="flex flex-col items-center gap-3 w-[140px] md:w-auto">
            <div className="w-40 h-40 rounded-full bg-white shadow-xl transform hover:scale-110 transition-transform duration-300" />
            <span className="text-xs uppercase tracking-widest text-royal-blue/60 font-bold">
              Blanc
            </span>
          </div>
        </div>

        <p className="text-xl md:text-2xl font-serif text-royal-blue/80 px-8 max-w-2xl mx-auto leading-relaxed">
          Nous serions ravis que vos tenues s'inspirent de nos couleurs afin de
          créer une harmonie visuelle lors de cette journée spéciale.
        </p>
      </div>
    </Section>
  );
}

export function Consignes() {
  return (
    <Section className="py-24 text-center">
      <div className="max-w-2xl mx-auto p-12 md:p-20 bg-peach shadow-[0_20px_50px_rgba(255,176,128,0.4)] rounded-[80px] space-y-10 relative overflow-hidden group">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-2 bg-royal-blue/20" />
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-black/5 rounded-full blur-3xl" />

        <div className="space-y-4 relative z-10">
          <p className="text-royal-blue font-delphia text-5xl md:text-6xl drop-shadow-md">
            Consignes Spéciales
          </p>
          <div className="flex items-center justify-center gap-6">
            <div className="w-16 h-[2px] bg-white/40" />
            <span className="text-royal-blue text-3xl animate-pulse">♥</span>
            <div className="w-16 h-[2px] bg-white/40" />
          </div>
        </div>

        <div className="space-y-4 font-serif text-3xl md:text-4xl text-white font-bold relative z-10">
          <div className="flex items-center justify-center gap-4">
            <p>Pas de jet de riz</p>
          </div>
          <div className="flex items-center justify-center gap-4">
            <p>Pas de farotage</p>
          </div>
        </div>

        <div className="pt-6 relative z-10">
          <p className="text-royal-blue font-sans text-xl md:text-2xl tracking-widest font-bold">
            Nous vous remercions de votre compréhension
          </p>
        </div>
      </div>
    </Section>
  );
}
