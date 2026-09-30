import { Droplets, Leaf, MessageCircle, Sparkles } from "lucide-react";
import { Reveal } from "@/components/shared/reveal";
import { HerAction } from "./her-actions";

const pillars = [
  ["Advanced Hair & Scalp", Droplets], ["Natural Hair", Leaf], ["Wellness", Sparkles], ["Consultations", MessageCircle],
] as const;

export function HerHomeDiscovery() {
  return (
    <section className="her-surface relative overflow-hidden py-20 sm:py-24 lg:py-28">
      <div className="her-botanical her-botanical-left" aria-hidden="true" />
      <div className="hp-container relative z-10">
        <Reveal className="grid overflow-hidden rounded-[2.5rem] border border-[#b89a61]/20 bg-[#fffdf7]/80 shadow-[0_34px_100px_rgba(23,61,50,.12)] backdrop-blur-xl lg:grid-cols-[1.05fr_.95fr]">
          <div className="p-7 sm:p-10 lg:p-14">
            <p className="her-kicker">Introducing HER Salon &amp; Wellness at Happy-Park</p>
            <h2 className="mt-6 font-serif text-4xl leading-[.96] tracking-[-.045em] text-[#173d32] sm:text-6xl">A day for them.<br /><em className="font-normal text-[#9d7740]">A moment for you.</em></h2>
            <p className="mt-6 max-w-2xl leading-8 text-[#53665e]">Advanced hair care, natural hair, scalp care and wellness — designed for every texture, every culture and every HER.</p>
            <div className="mt-8 flex flex-wrap gap-3"><HerAction href="/her">Explore HER</HerAction><HerAction href="/her/book" tone="gold">Book online</HerAction><HerAction href="#" tone="light" whatsapp>WhatsApp HER</HerAction></div>
          </div>
          <div className="relative flex min-h-[340px] flex-col justify-end overflow-hidden bg-[#173d32] p-7 text-white sm:p-10 lg:p-12">
            <div className="absolute -right-12 -top-12 h-72 w-72 rounded-full border border-[#dec58f]/20" /><div className="absolute right-12 top-12 h-48 w-48 rounded-full bg-[#d7b7aa]/15 blur-2xl" />
            <div className="relative grid grid-cols-2 gap-3">{pillars.map(([label, Icon]) => <div key={label} className="rounded-2xl border border-white/10 bg-white/[.06] p-4"><Icon className="h-5 w-5 text-[#dec58f]" /><p className="mt-3 text-sm font-bold">{label}</p></div>)}</div>
            <p className="relative mt-7 text-xs font-bold uppercase tracking-[.14em] text-white/60">Online appointments &amp; consultations available</p>
            <p className="relative mt-2 text-sm text-white/80">Open Daily · 8AM–8PM · Southfield, St. Elizabeth</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
