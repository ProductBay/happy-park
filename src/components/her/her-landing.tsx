import { ArrowRight, Clock3, Heart, Leaf, MessageCircle, ScanLine, Sparkles, Waves } from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/shared/reveal";
import { herServices, herSignatureExperiences } from "@/lib/her/demo-data";
import { HerAction } from "./her-actions";

const intents = [
  { title: "HAIR", copy: "Beautiful, healthy hair starts with understanding what your hair needs.", icon: Waves, hint: "hair" },
  { title: "SCALP", copy: "Advanced care for scalp health, thinning, breakage and hair-loss concerns.", icon: ScanLine, hint: "scalp" },
  { title: "WELLNESS", copy: "Take time to relax, restore and recharge.", icon: Sparkles, hint: "wellness" },
  { title: "I'M NOT SURE", copy: "Start with a consultation and let HER help you choose.", icon: MessageCircle, hint: "unsure" },
] as const;

export function HerLanding() {
  const advanced = herServices.filter((item) => item.category === "Advanced Hair & Scalp");
  const wellness = herServices.filter((item) => item.category === "Wellness");
  return <div className="her-surface text-[#173d32]">
    <section className="relative flex min-h-[88svh] items-end overflow-hidden bg-[#13382f] pb-16 pt-40 text-white sm:pb-24 lg:min-h-[92svh]">
      <div className="her-hero-glow" aria-hidden="true" /><div className="her-botanical her-botanical-right" aria-hidden="true" />
      <div className="hp-container relative z-10 grid gap-12 lg:grid-cols-[1fr_.7fr] lg:items-end">
        <Reveal><p className="text-xs font-black uppercase tracking-[.25em] text-[#e3ca96]">HER · Salon &amp; Wellness · At Happy-Park</p><h1 className="mt-7 max-w-4xl font-serif text-5xl leading-[.9] tracking-[-.055em] sm:text-7xl lg:text-[6.7rem]">Every texture.<br />Every culture.<br /><em className="font-normal text-[#e3ca96]">Every HER.</em></h1><p className="mt-7 max-w-2xl text-base leading-8 text-white/65 sm:text-lg">Advanced hair and scalp care, natural hair expertise and wellness experiences in Southfield, St. Elizabeth.</p><div className="mt-9 flex flex-wrap gap-3"><HerAction href="/her/book" tone="gold">Book your HER experience</HerAction><HerAction href="/her/services" tone="light">Explore services</HerAction><HerAction href="#" tone="light" whatsapp>WhatsApp HER</HerAction></div></Reveal>
        <Reveal delay={.15} className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1"><Link href="/her/account" className="flex items-center gap-4 rounded-2xl border border-[#e3ca96]/30 bg-[#e3ca96]/10 p-4 transition hover:bg-[#e3ca96]/15"><Heart className="h-5 w-5 text-[#e3ca96]"/><span className="text-sm font-bold">MY HER · Appointments &amp; history</span><ArrowRight className="ml-auto h-4 w-4"/></Link>{[["Online booking available", ArrowRight], ["Consultations available", Heart], ["Open daily · 8AM–8PM", Clock3]].map(([label, Icon]) => { const I = Icon as typeof ArrowRight; return <div key={label as string} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[.06] p-4 backdrop-blur"><I className="h-5 w-5 text-[#e3ca96]"/><span className="text-sm font-bold">{label as string}</span></div> })}</Reveal>
      </div>
    </section>

    <section className="py-20 sm:py-28"><div className="hp-container"><Reveal><p className="her-kicker">The HER Journey</p><h2 className="mt-5 font-serif text-4xl tracking-[-.045em] sm:text-6xl">What brings you to HER?</h2></Reveal><div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">{intents.map(({title,copy,icon:Icon,hint}, index) => <Reveal key={title} delay={index*.06}><Link href={`/her/book?intent=${hint}`} className="group flex min-h-64 flex-col rounded-[2rem] border border-[#173d32]/10 bg-white/75 p-6 shadow-[0_18px_60px_rgba(23,61,50,.07)] transition hover:-translate-y-1 hover:border-[#b79353]/40"><Icon className="h-7 w-7 text-[#a47d43]"/><h3 className="mt-auto text-xl font-black tracking-[.04em]">{title}</h3><p className="mt-3 text-sm leading-6 text-[#607067]">{copy}</p><ArrowRight className="mt-5 h-5 w-5 transition group-hover:translate-x-1"/></Link></Reveal>)}</div></div></section>

    <section className="bg-[#f4ecdf] py-20 sm:py-28"><div className="hp-container grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-center"><Reveal><p className="her-kicker">Texture inclusivity</p><h2 className="mt-5 font-serif text-4xl tracking-[-.045em] sm:text-6xl">Every texture belongs here.</h2><p className="mt-6 max-w-xl leading-8 text-[#5b6b63]">HER is designed around the person in our chair — not a single hair type.</p></Reveal><div className="grid grid-cols-2 gap-3 sm:grid-cols-3">{["Straight","Wavy","Curly","Coily","Transitioning","Children's Hair"].map((texture) => <div key={texture} className="rounded-full border border-[#173d32]/10 bg-white/70 px-5 py-4 text-center text-sm font-black">{texture}</div>)}</div></div></section>

    <section className="py-20 sm:py-28"><div className="hp-container"><Reveal className="max-w-3xl"><p className="her-kicker">Signature experiences</p><h2 className="mt-5 font-serif text-4xl tracking-[-.045em] sm:text-6xl">More than an appointment.</h2></Reveal><div className="mt-12 grid gap-5 lg:grid-cols-2">{herSignatureExperiences.map((item, index) => <Reveal key={item.id} delay={index*.05} className="rounded-[2rem] border border-[#173d32]/10 bg-white/75 p-7 shadow-[0_20px_70px_rgba(23,61,50,.07)] sm:p-9"><div className="flex items-start justify-between gap-4"><div><p className="text-xs font-black uppercase tracking-[.18em] text-[#a47d43]">Signature</p><h3 className="mt-3 font-serif text-3xl">{item.name}</h3></div><span className="shrink-0 rounded-full bg-[#173d32] px-4 py-2 text-sm font-black text-white">{item.price}</span></div><p className="mt-5 leading-7 text-[#64736b]">{item.description}</p><ul className="mt-6 grid gap-2 text-sm text-[#43584e] sm:grid-cols-2">{item.includes?.map((part) => <li key={part} className="flex gap-2"><span className="text-[#b18b4d]">◆</span>{part}</li>)}</ul></Reveal>)}</div><p className="mt-6 text-sm leading-6 text-[#69776f]">Mom &amp; Me can complement a family day at Happy-Park. Children remain with their responsible guardian; this preview does not represent a childcare service.</p></div></section>

    <ServicePreview title="Advanced hair & scalp" eyebrow="Care, support & consultation" items={advanced} dark />
    <ServicePreview title="Wellness, at your pace" eyebrow="Restore your moment" items={wellness} />

    <section className="bg-[#173d32] py-20 text-center text-white sm:py-28"><div className="hp-container"><Leaf className="mx-auto h-8 w-8 text-[#dfc48d]"/><h2 className="mx-auto mt-6 max-w-3xl font-serif text-5xl tracking-[-.05em] sm:text-7xl">Your HER time is waiting.</h2><p className="mt-5 text-white/60">Online appointments &amp; consultations available.</p><div className="mt-8 flex flex-wrap justify-center gap-3"><HerAction href="/her/book" tone="gold">Book online</HerAction><HerAction href="#" tone="light" whatsapp>WhatsApp HER</HerAction></div></div></section>
  </div>;
}

function ServicePreview({ title, eyebrow, items, dark = false }: { title: string; eyebrow: string; items: typeof herServices; dark?: boolean }) {
  return <section className={dark ? "bg-[#173d32] py-20 text-white sm:py-28" : "py-20 sm:py-28"}><div className="hp-container"><div className="grid gap-10 lg:grid-cols-[.62fr_1fr]"><div><p className={dark ? "text-xs font-black uppercase tracking-[.2em] text-[#dfc48d]" : "her-kicker"}>{eyebrow}</p><h2 className="mt-5 font-serif text-4xl tracking-[-.04em] sm:text-6xl">{title}</h2>{dark ? <p className="mt-7 text-sm leading-7 text-white/55">Advanced hair/scalp services are selected according to individual needs. Some concerns may require consultation or referral to an appropriate healthcare professional.</p> : null}</div><div className="grid gap-px overflow-hidden rounded-[2rem] border border-current/10 bg-current/10 sm:grid-cols-2">{items.map((item) => <div key={item.id} className={dark ? "bg-[#1c473b] p-5" : "bg-[#fffdf8] p-5"}><p className="font-bold">{item.name}</p><p className={dark ? "mt-2 text-sm font-black text-[#dfc48d]" : "mt-2 text-sm font-black text-[#9b733b]"}>{item.price}</p></div>)}</div></div></div></section>;
}
