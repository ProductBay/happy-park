import { Cloud, Flag, Sparkles } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import { parkDestinations, type ParkDestinationId } from "@/lib/park-gateway/destinations";
import { ParkDestinationButton } from "./park-destination";

export function ParkWorld({ activeId, onSelect }: { activeId: ParkDestinationId; onSelect: (id: ParkDestinationId) => void }) {
  const reduceMotion = useReducedMotion();
  const ambient = reduceMotion ? undefined : { repeat: Infinity, ease: "easeInOut" as const };

  return (
    <div className="relative mx-auto aspect-[5/4] w-full overflow-hidden rounded-[2.5rem] border border-white/50 bg-gradient-to-b from-[#92d9df] via-[#dff1ce] to-[#7bbd64] shadow-[0_35px_100px_rgba(8,45,28,.28)] sm:aspect-[16/10] xl:aspect-[16/9]" aria-label="Interactive Happy-Park map">
      <motion.div aria-hidden="true" animate={reduceMotion ? undefined : { x: [-8, 13, -8] }} transition={{ ...ambient, duration: 20 }} className="absolute left-[8%] top-[8%] text-white/70"><Cloud className="h-10 w-16 fill-white/35" /></motion.div>
      <motion.div aria-hidden="true" animate={reduceMotion ? undefined : { x: [8, -10, 8] }} transition={{ ...ambient, duration: 24 }} className="absolute right-[22%] top-[7%] text-white/50"><Cloud className="h-7 w-12 fill-white/30" /></motion.div>
      <div className="absolute inset-x-0 bottom-0 h-[78%] rounded-t-[50%] bg-gradient-to-b from-[#79b960] to-[#337848]" />
      <div className="absolute inset-[12%] rounded-[45%] border-[18px] border-[#e6d6a6]/75 bg-[#70ab56] shadow-inner sm:border-[28px]" />
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" aria-hidden="true"><path d="M50 52 C52 38 50 28 50 18 M48 51 C36 45 29 40 22 38 M52 51 C65 45 72 39 78 35 M48 54 C37 64 31 69 28 75 M53 54 C63 63 69 68 72 73" fill="none" stroke="#f5e6bd" strokeWidth="4" strokeLinecap="round" /><ellipse cx="50" cy="54" rx="13" ry="8" fill="#71c5d1" opacity=".75" /><path d="M9 66 Q18 59 26 66 T43 66" fill="none" stroke="#143f2d" strokeWidth="3" strokeDasharray="2 2" /></svg>
      <div className="absolute bottom-[7%] left-[43%] h-8 w-20 rounded-[45%] border-4 border-[#13452e] bg-sky-300 shadow-lg"><motion.span animate={reduceMotion ? undefined : { y: [0, -5, 0] }} transition={{ ...ambient, duration: 2.8 }} className="absolute left-1/2 top-0 h-4 w-7 -translate-x-1/2 rounded-full bg-orange-400" /></div>
      <div className="absolute left-[8%] top-[48%] flex gap-2" aria-hidden="true">{[0, 1, 2].map((index) => <motion.span key={index} animate={reduceMotion ? undefined : { rotate: [-2, 3, -2] }} transition={{ ...ambient, duration: 5 + index }} className="block h-12 w-7 origin-bottom rounded-[70%_30%] bg-[#2d7a47]" />)}</div>
      <motion.div aria-hidden="true" animate={reduceMotion ? undefined : { y: [0, -5, 0], rotate: [-2, 2, -2] }} transition={{ ...ambient, duration: 5.5 }} className="absolute bottom-[19%] right-[15%] flex gap-1"><span className="h-5 w-4 rounded-full bg-[#f5a3bf] shadow-sm" /><span className="mt-1 h-4 w-3 rounded-full bg-[#f5d368] shadow-sm" /></motion.div>
      <motion.div aria-hidden="true" animate={reduceMotion ? undefined : { rotate: [-5, 5, -5] }} transition={{ ...ambient, duration: 4.5 }} className="absolute bottom-[12%] right-[10%] origin-bottom"><Flag className="h-9 w-9 text-yellow-300" /></motion.div>
      <Sparkles className="absolute right-[17%] top-[12%] h-6 w-6 text-yellow-200" aria-hidden="true" />
      {parkDestinations.map((destination) => <ParkDestinationButton key={destination.id} destination={destination} active={activeId === destination.id} onSelect={() => onSelect(destination.id)} />)}
    </div>
  );
}
