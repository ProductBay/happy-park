"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight, X } from "lucide-react";

import { getParkDestination, type ParkDestinationId } from "@/lib/park-gateway/destinations";
import { PARK_GATEWAY_OPEN_EVENT, PARK_GATEWAY_SESSION_KEY, shouldOpenParkGateway } from "@/lib/park-gateway/session";
import { ParkDestinationCard } from "./park-destination-card";
import { ParkWorld } from "./park-world";

export function ParkGateway() {
  const pathname = usePathname();
  const router = useRouter();
  const reduceMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState<ParkDestinationId>("park");
  const closeRef = useRef<HTMLButtonElement>(null);
  const restoreRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      let visited = false;
      try { visited = sessionStorage.getItem(PARK_GATEWAY_SESSION_KEY) === "yes"; } catch { /* storage may be unavailable */ }
      if (shouldOpenParkGateway(pathname, visited)) setOpen(true);
    }, 0);
    return () => window.clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    const handler = () => {
      restoreRef.current = document.activeElement as HTMLElement;
      setOpen(true);
    };
    window.addEventListener(PARK_GATEWAY_OPEN_EVENT, handler);
    return () => window.removeEventListener(PARK_GATEWAY_OPEN_EVENT, handler);
  }, []);

  const markVisited = useCallback(() => {
    try { sessionStorage.setItem(PARK_GATEWAY_SESSION_KEY, "yes"); } catch { /* storage may be unavailable */ }
  }, []);

  const closeGateway = useCallback(() => {
    markVisited();
    setOpen(false);
    requestAnimationFrame(() => restoreRef.current?.focus());
  }, [markVisited]);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") { closeGateway(); return; }
      if (event.key !== "Tab") return;
      const dialog = document.querySelector<HTMLElement>('[aria-labelledby="park-gateway-title"]');
      if (!dialog) return;
      const focusable = [...dialog.querySelectorAll<HTMLElement>('button:not([disabled]),a[href]')];
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    window.addEventListener("keydown", handleKey);
    return () => { document.body.style.overflow = previousOverflow; window.removeEventListener("keydown", handleKey); };
  }, [open, closeGateway]);

  function enter(href: string) {
    markVisited();
    setOpen(false);
    if (href === "/") { router.replace("/"); return; }
    router.push(href);
  }

  const active = getParkDestination(activeId)!;

  return <AnimatePresence>{open ? (
    <motion.div role="dialog" aria-modal="true" aria-labelledby="park-gateway-title" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduceMotion ? 0 : .35 }} className="fixed inset-0 z-[250] overflow-y-auto bg-[#0d3423] text-white">
      <div className="relative flex min-h-[100svh] flex-col px-4 pb-6 pt-4 sm:px-6">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(248,184,78,.25),transparent_38%),linear-gradient(180deg,#133f33_0%,#0d3423_100%)]" />
        <header className="relative z-20 mx-auto flex w-full max-w-7xl items-center justify-between gap-4">
          <Image src="/images/brand/happy-park-logo.png" alt="Happy-Park" width={190} height={104} priority className="h-auto w-[125px] rounded-2xl bg-white/90 p-2 sm:w-[155px]" />
          <div className="flex items-center gap-2">
            <button type="button" onClick={closeGateway} className="hidden min-h-11 rounded-full border border-white/15 bg-white/10 px-5 text-xs font-black sm:block">Skip intro</button>
            <button ref={closeRef} type="button" onClick={closeGateway} aria-label="Close park gateway" className="grid h-12 w-12 place-items-center rounded-full border border-white/15 bg-white/10"><X className="h-5 w-5" /></button>
          </div>
        </header>
        <motion.div initial={reduceMotion ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: reduceMotion ? 0 : .15, duration: .55 }} className="relative z-10 mx-auto mb-5 mt-5 max-w-3xl text-center">
          <p className="text-[10px] font-black uppercase tracking-[.28em] text-yellow-300">Fun · Food · Family · Experiences</p>
          <h1 id="park-gateway-title" className="mt-2 text-3xl font-black tracking-[-.05em] sm:text-5xl">Welcome to Happy-Park</h1>
          <p className="mt-2 text-sm text-white/65 sm:text-base">Where would you like to go today?</p>
        </motion.div>
        <motion.div initial={reduceMotion ? false : { opacity: 0, scale: .96, y: 16 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ delay: reduceMotion ? 0 : .25, duration: .7 }} className="relative z-10 mx-auto grid w-full max-w-[1450px] gap-5 xl:grid-cols-[minmax(0,1fr)_320px] xl:items-center">
          <ParkWorld activeId={activeId} onSelect={setActiveId} />
          <div className="hidden xl:block"><ParkDestinationCard destination={active} onEnter={enter} /></div>
        </motion.div>
        <div className="relative z-10 mx-auto mt-4 w-full max-w-[1050px] xl:hidden"><ParkDestinationCard mobile destination={active} onEnter={enter} /></div>
        <button type="button" onClick={() => enter("/")} className="relative z-20 mx-auto mt-4 inline-flex min-h-12 items-center gap-2 rounded-full bg-yellow-300 px-6 text-sm font-black text-[#123a29]">Enter Happy-Park<ArrowRight className="h-4 w-4" /></button>
      </div>
    </motion.div>
  ) : null}</AnimatePresence>;
}
