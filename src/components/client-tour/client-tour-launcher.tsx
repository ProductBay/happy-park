"use client";

import { Compass } from "lucide-react";

import { useClientTour } from "./client-tour-provider";

export function ClientTourLauncher() {
  const { ready, active, startTour } = useClientTour();

  if (!ready || active) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={startTour}
      className="fixed bottom-5 right-5 z-[150] inline-flex min-h-12 items-center gap-2 rounded-full border border-white/10 bg-slate-950 px-5 text-xs font-black text-white shadow-2xl transition hover:-translate-y-0.5"
    >
      <Compass className="h-4 w-4 text-orange-400" />
      Guided Tour
    </button>
  );
}

