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
      aria-label="Start guided tour"
      title="Start guided tour"
      className="fixed bottom-20 left-4 z-[150] grid h-12 w-12 place-items-center rounded-full border border-white/10 bg-slate-950 text-white shadow-2xl transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-orange-400 sm:bottom-24 sm:left-6 sm:h-14 sm:w-14"
    >
      <Compass className="h-5 w-5 text-orange-400" />
    </button>
  );
}

