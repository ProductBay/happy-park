import { AnimatePresence, motion } from "framer-motion";
import { CupSoda, GlassWater, IceCreamBowl, Popcorn, Sandwich, Utensils } from "lucide-react";

import { getMealVisualKind } from "@/lib/food/pizza-studio-visual-model";
import type { PizzaStudioExtra } from "@/lib/food/pizza-studio-catalogue";

export function MealCompanionTray({ extras }: { extras: PizzaStudioExtra[] }) {
  if (!extras.length) return <p className="mt-5 text-center text-xs text-white/45">Sides and drinks will join your meal here.</p>;
  return <div className="mt-5 flex gap-2 overflow-x-auto pb-2" aria-label="Selected meal companions"><AnimatePresence initial={false}>{extras.map((extra) => {
    const kind=getMealVisualKind(extra); const Icon=kind==="side"?(extra.id==="burger"||extra.id==="hot-dog"?Sandwich:Utensils):kind==="treat"?(extra.id==="popcorn"?Popcorn:IceCreamBowl):kind==="juice"?GlassWater:CupSoda;
    const tone=kind==="juice"?"from-amber-300 to-orange-500":kind==="soft-drink"?"from-sky-400 to-blue-700":kind==="water"?"from-cyan-100 to-sky-400":kind==="treat"?"from-pink-200 to-orange-300":"from-yellow-200 to-amber-500";
    return <motion.div key={extra.id} initial={{opacity:0,y:14,scale:.8}} animate={{opacity:1,y:0,scale:1}} exit={{opacity:0,y:10,scale:.8}} className="min-w-[96px] rounded-2xl border border-white/10 bg-white/[.07] p-3 text-center"><span className={`mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br ${tone} text-slate-900 shadow-lg`}><Icon className="h-6 w-6"/></span><p className="mt-2 text-[10px] font-bold leading-4 text-white/75">{extra.name}</p></motion.div>;
  })}</AnimatePresence></div>;
}
