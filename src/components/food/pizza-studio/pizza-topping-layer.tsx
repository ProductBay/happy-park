import { motion } from "framer-motion";

import { getToppingPlacements } from "@/lib/food/pizza-studio-visual-model";

const pieceCount: Record<string, number> = { "sweet-corn": 8, cheese: 8, "vegan-cheese": 8, arugula: 5, moringa: 5, "moringa-blossom": 5 };

export function PizzaToppingLayer({ toppingIds }: { toppingIds: string[] }) {
  return <>{toppingIds.map((id, toppingIndex) => getToppingPlacements(id, toppingIndex, pieceCount[id] ?? 6).map((placement, pieceIndex) => <motion.span
    key={`${id}-${pieceIndex}`}
    initial={{ opacity: 0, scale: 0.25, y: -12 }}
    animate={{ opacity: 1, scale: placement.scale, y: 0 }}
    exit={{ opacity: 0, scale: 0.2 }}
    transition={{ type: "spring", stiffness: 280, damping: 22, delay: pieceIndex * 0.018 }}
    className="absolute z-20 grid h-[12%] w-[12%] place-items-center"
    style={{ left: `${placement.x}%`, top: `${placement.y}%`, translate: "-50% -50%", rotate: `${placement.rotate}deg` }}
    aria-hidden="true"
  ><ToppingPiece id={id}/></motion.span>))}</>;
}

function ToppingPiece({ id }: { id: string }) {
  if (id === "pepperoni") return <span className="h-full w-full rounded-full border-2 border-red-900/30 bg-red-600 shadow-sm before:absolute before:left-1/4 before:top-1/4 before:h-1 before:w-1 before:rounded-full before:bg-red-900/50"/>;
  if (id === "smoked-turkey-sausage") return <span className="h-full w-full rounded-full border-2 border-amber-950/30 bg-amber-800 shadow-sm"/>;
  if (id === "olives") return <span className="h-[72%] w-[72%] rounded-full border-[4px] border-slate-800 bg-transparent shadow-sm"/>;
  if (id === "pineapple") return <span className="h-[70%] w-full rounded-[35%] bg-yellow-300 shadow-sm [clip-path:polygon(50%_0,100%_35%,82%_100%,18%_100%,0_35%)]"/>;
  if (id === "sweet-corn") return <span className="h-[58%] w-[40%] rounded-full bg-yellow-400 shadow-sm"/>;
  if (["arugula", "moringa"].includes(id)) return <span className={`h-full w-[58%] rounded-[100%_0_100%_0] ${id === "moringa" ? "bg-green-700" : "bg-emerald-600"} shadow-sm`}/>;
  if (id === "moringa-blossom") return <span className="relative h-full w-full before:absolute before:inset-[18%] before:rotate-45 before:rounded-[70%_20%] before:bg-lime-100 after:absolute after:inset-[18%] after:-rotate-45 after:rounded-[70%_20%] after:bg-white"/>;
  if (id === "anchovies") return <span className="h-[28%] w-full rotate-12 rounded-full bg-gradient-to-r from-slate-500 via-slate-200 to-slate-600 shadow-sm"/>;
  if (id === "shrimp") return <span className="h-full w-full rounded-full border-[5px] border-coral-400 border-r-transparent bg-transparent" style={{ borderColor: "#fb8b65 transparent #fb8b65 #fb8b65" }}/>;
  if (id === "tuna") return <span className="h-[68%] w-full rounded-[55%_45%_60%_40%] bg-rose-200 shadow-sm"/>;
  if (id === "ackee") return <span className="h-[72%] w-full rounded-[70%_30%_70%_35%] bg-amber-400 shadow-sm"/>;
  if (id === "vegan-cheese") return <span className="h-[40%] w-full rounded-full bg-yellow-100/90 shadow-sm"/>;
  return <span className="h-[45%] w-full rounded-full bg-amber-200/90 shadow-sm"/>;
}
