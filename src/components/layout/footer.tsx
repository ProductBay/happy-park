import Link from "next/link";
import { ArrowRight, ArrowUpRight, HelpCircle, MapPin, MessageCircle, Sparkles } from "lucide-react";

const explore = [
  ["Attractions", "/attractions"],
  ["Food & pizza", "/food"],
  ["Birthday parties", "/parties"],
  ["HER salon & wellness", "/her"],
  ["Shop", "/shop"],
] as const;

const plan = [
  ["Plan your visit", "/visit"],
  ["Book a visit", "/book/visit"],
  ["Plan a party", "/book/party"],
  ["Schools", "/schools"],
  ["Frequently asked questions", "/faq"],
] as const;

function FooterLinks({ title, links }: { title: string; links: readonly (readonly [string, string])[] }) {
  return (
    <nav aria-label={title}>
      <h2 className="text-xs font-bold uppercase tracking-[.18em] text-[#f5cc71]">{title}</h2>
      <div className="mt-5 flex flex-col items-start gap-2">
        {links.map(([label, href]) => (
          <Link key={href} href={href} className="group inline-flex w-fit items-center gap-2 rounded-sm py-1 text-sm text-white/70 transition-colors hover:text-white focus-visible:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#e8c66e]">
            {label}
            <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5 -translate-x-1 translate-y-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 motion-reduce:transition-none" />
          </Link>
        ))}
      </div>
    </nav>
  );
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#102c22] text-white">
      <div aria-hidden="true" className="pointer-events-none absolute -right-32 -top-56 h-[32rem] w-[32rem] rounded-full border-[5rem] border-white/[.035]" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-64 -left-40 h-[32rem] w-[32rem] rounded-full border-[5rem] border-[#f5cc71]/[.04]" />
      <div className="hp-container relative py-12 sm:py-16 lg:py-20">
        <div className="grid gap-5 rounded-[2rem] border border-white/15 bg-white/[.055] p-6 shadow-[0_24px_70px_rgba(3,25,15,.18)] sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-12 lg:p-10">
          <div>
            <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[.2em] text-[#f5cc71]"><Sparkles className="h-4 w-4" /> Your day starts here</div>
            <h2 className="mt-3 max-w-xl text-3xl font-black leading-tight tracking-[-.045em] sm:text-4xl">Make room for a little more happy.</h2>
            <p className="mt-3 max-w-xl text-sm leading-7 text-white/70 sm:text-base">Explore the park, find the right experience, and plan a day everyone can look forward to.</p>
          </div>
          <Link href="/visit" className="group inline-flex min-h-12 w-fit items-center justify-center gap-3 rounded-full bg-[#f5cc71] px-6 py-3 text-sm font-extrabold text-[#102c22] shadow-[0_10px_30px_rgba(245,204,113,.15)] transition-[transform,background-color] hover:-translate-y-0.5 hover:bg-[#ffda88] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f5cc71] motion-reduce:transition-none">
            Plan your visit <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-1 motion-reduce:transition-none" />
          </Link>
        </div>

        <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.1fr] lg:gap-12 lg:py-16">
          <div className="max-w-sm">
            <Link href="/" className="inline-block rounded-sm text-3xl font-black tracking-[-.055em] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#e8c66e]">Happy-Park<span className="text-[#f5cc71]">.</span></Link>
            <p className="mt-4 text-sm leading-7 text-white/65">A place to play, celebrate, eat and discover together in Southfield, St. Elizabeth.</p>
            <div className="mt-6 inline-flex items-start gap-2.5 rounded-2xl border border-white/10 bg-white/[.04] px-4 py-3 text-sm text-white/75"><MapPin aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-[#f5cc71]" /><span>Southfield, St. Elizabeth, Jamaica</span></div>
          </div>
          <FooterLinks title="Explore" links={explore} />
          <FooterLinks title="Plan" links={plan} />
          <div>
            <h2 className="text-xs font-bold uppercase tracking-[.18em] text-[#f5cc71]">Here to help</h2>
            <p className="mt-5 text-sm leading-7 text-white/65">Questions before you visit? We’re happy to help you plan.</p>
            <Link href="/contact" className="group mt-5 inline-flex min-h-11 items-center gap-2 rounded-full border border-white/25 px-4 py-2 text-sm font-bold transition-colors hover:border-white/60 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#e8c66e]">Contact our team <ArrowUpRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none" /></Link>
            <Link href="/faq" className="mt-6 flex w-fit items-center gap-2 text-xs text-white/60 transition-colors hover:text-white focus-visible:text-white"><HelpCircle aria-hidden="true" className="h-4 w-4" /> Find helpful answers</Link>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-white/15 pt-6 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Happy-Park. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2"><Link href="/about" className="hover:text-white focus-visible:text-white">About us</Link><Link href="/faq" className="hover:text-white focus-visible:text-white">FAQs</Link><span>Southfield, Jamaica</span></div>
        </div>
        <div className="mt-6 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>Digital experience designed and developed by <span className="font-semibold text-white/80">A&apos;Dash Technologies Group</span></p>
          <a href="https://wa.me/18765947320" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp A'Dash Technologies Group at 876-594-7320" className="inline-flex w-fit items-center gap-2 rounded-full border border-white/20 px-4 py-2.5 font-semibold text-white/85 transition-colors hover:border-[#f5cc71]/60 hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f5cc71]">
            <MessageCircle aria-hidden="true" className="h-4 w-4 text-[#f5cc71]" /> WhatsApp A&apos;Dash · 876-594-7320 <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
