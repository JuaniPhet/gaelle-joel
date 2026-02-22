"use client";

import Section from "./Section";

export function TablePlan({ table }: { table: string }) {
  return (
    <Section className="text-center py-24">
      <div className="inline-block p-12 bg-white rounded-[60px] shadow-lg border border-peach/10 space-y-4">
        <p className="text-peach uppercase font-sans font-bold text-xs tracking-widest">
          Votre Place d'Honneur
        </p>
        <h3 className="text-3xl md:text-4xl font-serif text-royal-blue">
          Votre table : {table}
        </h3>
        <div className="w-20 h-[2px] bg-peach/30 mx-auto" />
      </div>
    </Section>
  );
}

export function ThemeVestimentaire() {
  return (
    <Section className="text-center py-20 bg-royal-blue/5 rounded-t-[100px]">
      <div className="max-w-lg mx-auto space-y-8">
        <div className="space-y-2">
          <h3 className="text-3xl font-serif text-royal-blue">
            Thème Vestimentaire
          </h3>
          <p className="text-royal-blue/60 uppercase tracking-widest text-xs font-bold">
            Du mur au jardin
          </p>
        </div>

        <div className="flex justify-center items-center gap-4">
          <div
            className="w-12 h-12 rounded-full bg-royal-blue shadow-lg"
            title="Bleu Royal"
          />
          <div
            className="w-12 h-12 rounded-full bg-peach shadow-lg"
            title="Saumon"
          />
          <div
            className="w-12 h-12 rounded-full bg-white border border-peach shadow-lg"
            title="Blanc"
          />
          <div
            className="w-12 h-12 rounded-full bg-peach-light shadow-lg"
            title="Saumon Clair"
          />
        </div>

        <p className="text-sm font-sans text-royal-blue/80 px-8">
          Nous serions ravis de vous voir arborer nos couleurs thématiques pour
          créer une harmonie visuelle lors de cette journée spéciale.
        </p>
      </div>
    </Section>
  );
}

export function Consignes() {
  return (
    <Section className="py-20 text-center">
      <div className="max-w-md mx-auto p-10 border border-royal-blue/10 rounded-3xl space-y-6">
        <p className="text-peach uppercase font-bold text-xs tracking-[0.3em]">
          Consignes Spéciales
        </p>
        <div className="space-y-1 font-serif text-xl md:text-2xl text-royal-blue/80 opacity-70">
          <p className="line-through decoration-peach/50">Pas de jet de riz</p>
          <p className="line-through decoration-peach/50">Pas de farotage</p>
        </div>
        <p className="text-[10px] text-royal-blue/40 italic">
          Nous vous remercions de votre compréhension.
        </p>
      </div>
    </Section>
  );
}
