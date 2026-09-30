import { CakeSlice, CalendarDays, Heart, Pizza, School, Trees } from "lucide-react";

import type { ParkDestination } from "@/lib/park-gateway/destinations";

const icons = { park: Trees, food: Pizza, parties: CakeSlice, schools: School, her: Heart, visit: CalendarDays };
const themes = {
  gate: "from-emerald-700 to-emerald-950 border-yellow-300/60",
  food: "from-orange-400 to-red-600 border-yellow-200/60",
  party: "from-pink-400 to-violet-700 border-pink-100/60",
  school: "from-sky-400 to-blue-700 border-yellow-200/60",
  wellness: "from-[#b8996a] to-[#315f50] border-[#f0dcc0]/60",
  visit: "from-cyan-400 to-emerald-700 border-white/60",
};

export function ParkDestinationButton({ destination, active, onSelect }: { destination:ParkDestination;active:boolean;onSelect:()=>void }) {
  const Icon=icons[destination.id];
  return <button type="button" onClick={onSelect} onFocus={onSelect} aria-pressed={active} aria-label={`Discover ${destination.name}`} className="group absolute z-20 -translate-x-1/2 -translate-y-1/2 focus-visible:outline-none" style={{left:`${destination.position.x}%`,top:`${destination.position.y}%`}}><span className={`relative block h-20 w-24 transition duration-300 group-hover:-translate-y-2 group-focus-visible:-translate-y-2 sm:h-24 sm:w-28 ${active?"-translate-y-2 scale-105":""}`}><span className={`absolute inset-x-2 bottom-0 h-14 rounded-[8px_8px_16px_16px] border bg-gradient-to-br shadow-[0_14px_25px_rgba(12,40,28,.28)] ${themes[destination.theme]}`}/><span className={`absolute left-1/2 top-1 h-12 w-20 -translate-x-1/2 rotate-[-2deg] rounded-t-[55%] border bg-gradient-to-br ${themes[destination.theme]}`}/><span className="absolute inset-0 grid place-items-center text-white"><Icon className="h-7 w-7 drop-shadow" aria-hidden="true"/></span>{destination.id==="food"?<span className="absolute right-3 top-1 h-7 w-2 animate-pulse rounded-full bg-white/25 blur-sm motion-reduce:animate-none"/>:null}</span><span className={`mt-1 block rounded-full bg-[#0d3423]/90 px-3 py-1.5 text-[9px] font-black uppercase tracking-[.08em] text-white shadow-lg sm:text-[10px] ${active?"ring-2 ring-yellow-300":""}`}>{destination.shortName}</span></button>;
}
