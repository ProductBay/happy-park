"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, CakeSlice, Compass, Heart, MessageCircle, Pizza, ShoppingBag, Sparkles, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { useClientTour } from "@/components/client-tour/client-tour-provider";
import { createHerWhatsappUrl } from "@/lib/her/whatsapp";

const shortcuts = [
  { label: "Build a pizza", detail: "Make it your way", href: "/food#pizza-studio", icon: Pizza, tone: "bg-orange-100 text-orange-700", glow: "from-orange-100/80", invitation: "What will your pizza look like?" },
  { label: "Plan a party", detail: "Let the fun begin", href: "/book/party", icon: CakeSlice, tone: "bg-pink-100 text-pink-700", glow: "from-pink-100/80", invitation: "Make a day worth celebrating!" },
  { label: "Book HER", detail: "A little time for you", href: "/her/book", icon: Heart, tone: "bg-emerald-100 text-emerald-800", glow: "from-emerald-100/80", invitation: "Find your feel-good moment." },
  { label: "Shop", detail: "Find a little treasure", href: "/shop", icon: ShoppingBag, tone: "bg-amber-100 text-amber-800", glow: "from-amber-100/80", invitation: "See what catches your eye!" },
] as const;

export function HappyTools() {
  const pathname = usePathname();
  const { ready, active, startTour } = useClientTour();
  const reduceMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [hoveredTool, setHoveredTool] = useState<string | null>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const previousPath = useRef(pathname);
  const isHer = pathname === "/her" || pathname.startsWith("/her/");
  const contactHref = isHer ? createHerWhatsappUrl() : "/contact";

  useEffect(() => {
    if (previousPath.current !== pathname) {
      previousPath.current = pathname;
      const timer = window.setTimeout(() => setOpen(false), 0);
      return () => window.clearTimeout(timer);
    }
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        requestAnimationFrame(() => triggerRef.current?.focus());
      }
    };
    const handlePointer = (event: PointerEvent) => {
      if (panelRef.current?.contains(event.target as Node) || triggerRef.current?.contains(event.target as Node)) return;
      setOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    window.addEventListener("pointerdown", handlePointer);
    return () => {
      window.removeEventListener("keydown", handleKey);
      window.removeEventListener("pointerdown", handlePointer);
    };
  }, [open]);

  function launchTour() {
    setOpen(false);
    startTour();
  }

  return (
    <div className="fixed right-3 top-1/2 z-[150] -translate-y-1/2 sm:right-5" aria-label="Happy Tools">
      <AnimatePresence>
        {open && (
          <motion.div
            ref={panelRef}
            id="happy-tools-panel"
            initial={reduceMotion ? false : { opacity: 0, x: 36, scale: .93, rotate: 2 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={reduceMotion ? { opacity: 0, transition: { duration: 0 } } : { opacity: 0, x: 24, scale: .96, rotate: 1 }}
            transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 340, damping: 28 }}
            className="absolute right-0 top-1/2 flex max-h-[min(75svh,620px)] w-[min(19rem,calc(100vw-1.5rem))] -translate-y-1/2 flex-col overflow-hidden rounded-[1.6rem] border border-white/70 bg-[#fffdf8]/95 text-[#14271e] shadow-[0_24px_80px_rgba(14,47,31,.24)] backdrop-blur-xl"
          >
            <div className="relative flex items-center justify-between overflow-hidden border-b border-[#164b33]/10 bg-[#eaf2e6] px-4 py-3">
              <div aria-hidden="true" className="pointer-events-none absolute -right-4 -top-10 h-28 w-28 rounded-full border-[16px] border-white/30" />
              <div className="relative flex items-center gap-2"><Sparkles className="h-4 w-4 text-[#b07828]" /><div><p className="text-sm font-black">Happy Tools</p><p className="text-[11px] text-[#52635a]">Pick your next adventure</p></div></div>
              <button type="button" onClick={() => { setOpen(false); requestAnimationFrame(() => triggerRef.current?.focus()); }} aria-label="Close Happy Tools" className="grid h-10 w-10 place-items-center rounded-full text-[#52635a] hover:bg-white focus-visible:outline focus-visible:outline-2"><X className="h-4 w-4" /></button>
            </div>
            <nav aria-label="Happy Tools shortcuts" className="space-y-1 overflow-y-auto p-2">
              {shortcuts.map(({ label, detail, href, icon: Icon, tone, glow }, index) => (
                <motion.div key={href} initial={reduceMotion ? false : { opacity: 0, x: 36, rotate: 2 }} animate={{ opacity: 1, x: 0, rotate: 0 }} transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 380, damping: 28, delay: .055 * index }}>
                  <Link href={href} onMouseEnter={() => setHoveredTool(href)} onMouseLeave={() => setHoveredTool(null)} onFocus={() => setHoveredTool(href)} onBlur={() => setHoveredTool(null)} onClick={() => setOpen(false)} className="group relative flex min-h-14 items-center gap-3 overflow-hidden rounded-2xl px-2.5 py-2 outline-none transition-[transform,box-shadow] duration-300 hover:-translate-x-1 hover:shadow-[0_8px_24px_rgba(22,75,51,.09)] focus-visible:-translate-x-1 focus-visible:ring-2 focus-visible:ring-[#164b33] motion-reduce:transition-none">
                    <span aria-hidden="true" className={`absolute inset-0 bg-gradient-to-r ${glow} via-white/70 to-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none`} />
                    <span className={`relative grid h-11 w-11 shrink-0 place-items-center rounded-xl transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110 group-focus-visible:-rotate-6 group-focus-visible:scale-110 motion-reduce:transition-none ${tone}`}><Icon className="h-5 w-5" /></span>
                    <span className="relative min-w-0"><span className="block text-sm font-black">{label}</span><span className="block text-[11px] text-[#6a776f]">{detail}</span></span>
                    <ArrowUpRight aria-hidden="true" className="relative ml-auto h-4 w-4 shrink-0 -translate-x-1 translate-y-1 text-[#164b33] opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 motion-reduce:transition-none" />
                  </Link>
                </motion.div>
              ))}
              <div className="min-h-8 px-3 py-1 text-center text-xs font-semibold text-[#52635a]" aria-hidden="true">{shortcuts.find((tool) => tool.href === hoveredTool)?.invitation ?? "Where shall we go today?"}</div>
              <div className="my-2 border-t border-[#164b33]/10" />
              {ready && !active && <button type="button" onClick={launchTour} className="flex min-h-12 w-full items-center gap-3 rounded-2xl px-2.5 text-left hover:bg-[#eff4eb] focus-visible:bg-[#eff4eb]"><span className="grid h-10 w-11 place-items-center text-[#164b33]"><Compass className="h-5 w-5" /></span><span className="text-sm font-bold">Guided tour</span></button>}
              <Link href={contactHref} target={isHer ? "_blank" : undefined} rel={isHer ? "noreferrer" : undefined} onClick={() => setOpen(false)} className="flex min-h-12 items-center gap-3 rounded-2xl px-2.5 hover:bg-[#eff4eb] focus-visible:bg-[#eff4eb]"><span className="grid h-10 w-11 place-items-center text-[#164b33]"><MessageCircle className="h-5 w-5" /></span><span className="text-sm font-bold">{isHer ? "WhatsApp HER" : "Contact us"}</span></Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
      <button ref={triggerRef} type="button" aria-label="Open Happy Tools" aria-expanded={open} aria-controls="happy-tools-panel" onClick={() => setOpen(true)} className={`group relative flex min-h-14 items-center gap-2 overflow-hidden rounded-l-2xl rounded-r-xl border border-white/60 bg-[#164b33]/75 px-3 text-white opacity-70 shadow-[0_14px_38px_rgba(14,47,31,.22)] backdrop-blur-md transition-[transform,background-color,opacity] duration-300 hover:-translate-x-2 hover:bg-[#164b33]/95 hover:opacity-100 focus-visible:-translate-x-2 focus-visible:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f8c966] motion-reduce:transition-none sm:px-4 ${open ? "pointer-events-none invisible" : ""}`}><span aria-hidden="true" className="absolute -left-8 top-0 h-full w-8 skew-x-[-25deg] bg-white/20 transition-transform duration-700 group-hover:translate-x-52 group-focus-visible:translate-x-52 motion-reduce:transition-none" /><span className="relative grid h-8 w-8 place-items-center rounded-full bg-[#f8c966]/20 transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110 group-focus-visible:-rotate-12 group-focus-visible:scale-110 motion-reduce:transition-none"><Sparkles className="h-5 w-5 text-[#f8c966]" /></span><span className="relative hidden text-xs font-black tracking-wide sm:inline">Happy Tools</span><span aria-hidden="true" className="relative ml-1 hidden h-1.5 w-1.5 rounded-full bg-[#f8c966] transition-transform duration-300 group-hover:scale-150 sm:block motion-reduce:transition-none" /></button>
    </div>
  );
}
