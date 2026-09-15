"use client";

import { motion } from "framer-motion";
import {
  ChefHat,
  Sparkles,
  Star,
} from "lucide-react";

type InteractivePizzaPreviewProps = {
  toppings: string[];
  sizeId: string;
  cheeseId: string;
};

type ToppingDecoration = {
  id: string;
  type:
    | "pepperoni"
    | "chicken"
    | "beef"
    | "ham"
    | "pineapple"
    | "onion"
    | "sweet-pepper"
    | "mushroom"
    | "jalapeno"
    | "bacon"
    | "jerk-chicken"
    | "three-cheese";
  x: number;
  y: number;
  rotate?: number;
};

const toppingPositions: ToppingDecoration[] = [
  { id: "a", type: "pepperoni", x: 31, y: 26 },
  { id: "b", type: "pepperoni", x: 58, y: 25 },
  { id: "c", type: "pepperoni", x: 67, y: 48 },
  { id: "d", type: "pepperoni", x: 38, y: 55 },
  { id: "e", type: "pepperoni", x: 52, y: 70 },

  { id: "f", type: "chicken", x: 42, y: 31, rotate: 18 },
  { id: "g", type: "chicken", x: 66, y: 61, rotate: -15 },
  { id: "h", type: "chicken", x: 28, y: 63, rotate: 30 },

  { id: "i", type: "beef", x: 49, y: 46 },
  { id: "j", type: "beef", x: 72, y: 34 },
  { id: "k", type: "beef", x: 34, y: 73 },

  { id: "l", type: "ham", x: 25, y: 42, rotate: 20 },
  { id: "m", type: "ham", x: 58, y: 58, rotate: -18 },
  { id: "n", type: "ham", x: 47, y: 21, rotate: 12 },

  { id: "o", type: "pineapple", x: 37, y: 38, rotate: 22 },
  { id: "p", type: "pineapple", x: 62, y: 40, rotate: -14 },
  { id: "q", type: "pineapple", x: 45, y: 66, rotate: 8 },

  { id: "r", type: "onion", x: 50, y: 32, rotate: 35 },
  { id: "s", type: "onion", x: 29, y: 51, rotate: -20 },
  { id: "t", type: "onion", x: 66, y: 71, rotate: 10 },

  { id: "u", type: "sweet-pepper", x: 56, y: 43, rotate: 42 },
  { id: "v", type: "sweet-pepper", x: 36, y: 61, rotate: -35 },
  { id: "w", type: "sweet-pepper", x: 69, y: 28, rotate: 12 },

  { id: "x", type: "mushroom", x: 43, y: 48, rotate: 15 },
  { id: "y", type: "mushroom", x: 60, y: 68, rotate: -10 },
  { id: "z", type: "mushroom", x: 27, y: 30, rotate: 20 },

  { id: "aa", type: "jalapeno", x: 69, y: 54 },
  { id: "ab", type: "jalapeno", x: 40, y: 24 },
  { id: "ac", type: "jalapeno", x: 30, y: 70 },

  { id: "ad", type: "bacon", x: 52, y: 24, rotate: 40 },
  { id: "ae", type: "bacon", x: 72, y: 68, rotate: -28 },
  { id: "af", type: "bacon", x: 26, y: 57, rotate: 18 },

  { id: "ag", type: "jerk-chicken", x: 56, y: 54, rotate: -20 },
  { id: "ah", type: "jerk-chicken", x: 33, y: 35, rotate: 25 },
  { id: "ai", type: "jerk-chicken", x: 45, y: 74, rotate: -8 },

  { id: "aj", type: "three-cheese", x: 48, y: 39 },
  { id: "ak", type: "three-cheese", x: 63, y: 32 },
  { id: "al", type: "three-cheese", x: 34, y: 49 },
];

function Topping({
  item,
}: {
  item: ToppingDecoration;
}) {
  if (item.type === "pepperoni") {
    return (
      <div className="relative h-6 w-6 rounded-full border-2 border-red-700/30 bg-red-500 shadow-sm">
        <div className="absolute left-1 top-1 h-1 w-1 rounded-full bg-red-800/50" />
        <div className="absolute bottom-1 right-1 h-1 w-1 rounded-full bg-red-800/50" />
      </div>
    );
  }

  if (
    item.type === "chicken" ||
    item.type === "jerk-chicken"
  ) {
    return (
      <div
        className={[
          "h-5 w-8 rounded-[45%_55%_50%_45%] shadow-sm",
          item.type === "jerk-chicken"
            ? "bg-amber-900"
            : "bg-amber-500",
        ].join(" ")}
      />
    );
  }

  if (
    item.type === "beef" ||
    item.type === "ham"
  ) {
    return (
      <div
        className={[
          "h-5 w-6 rounded-lg shadow-sm",
          item.type === "ham"
            ? "bg-pink-500"
            : "bg-amber-950",
        ].join(" ")}
      />
    );
  }

  if (item.type === "pineapple") {
    return (
      <div className="h-5 w-5 rounded-md bg-yellow-300 shadow-sm" />
    );
  }

  if (item.type === "onion") {
    return (
      <div className="h-7 w-7 rounded-full border-[3px] border-purple-400" />
    );
  }

  if (item.type === "sweet-pepper") {
    return (
      <div className="h-2.5 w-9 rounded-full bg-emerald-600 shadow-sm" />
    );
  }

  if (item.type === "mushroom") {
    return (
      <div className="relative h-7 w-7">
        <div className="absolute left-0 top-0 h-4 w-7 rounded-t-full bg-stone-200" />
        <div className="absolute left-[10px] top-3 h-4 w-2 rounded-b bg-stone-300" />
      </div>
    );
  }

  if (item.type === "jalapeno") {
    return (
      <div className="h-6 w-6 rounded-full border-[5px] border-green-700 bg-green-300" />
    );
  }

  if (item.type === "bacon") {
    return (
      <div className="h-2.5 w-10 rounded-full bg-red-700 shadow-sm" />
    );
  }

  return (
    <div className="h-5 w-5 rounded-full bg-yellow-100 shadow-sm" />
  );
}

export function InteractivePizzaPreview({
  toppings,
  sizeId,
  cheeseId,
}: InteractivePizzaPreviewProps) {
  const selectedDecorations =
    toppingPositions.filter((item) =>
      toppings.includes(item.type),
    );

  const pizzaScale =
    sizeId === "small"
      ? 0.82
      : sizeId === "medium"
        ? 0.9
        : sizeId === "large"
          ? 0.96
          : 1;

  const cheeseClass =
    cheeseId === "loaded"
      ? "bg-yellow-300"
      : cheeseId === "extra"
        ? "bg-yellow-200"
        : "bg-amber-100";

  const power = Math.min(
    100,
    25 + toppings.length * 12,
  );

  const message =
    toppings.length === 0
      ? "Your pizza is waiting!"
      : toppings.length <= 2
        ? "Looking tasty!"
        : toppings.length <= 5
          ? "Pizza power rising!"
          : "WOW! Masterpiece mode!";

  return (
    <div className="relative flex h-full min-h-0 flex-col overflow-hidden bg-gradient-to-br from-orange-400 via-amber-300 to-yellow-200">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(255,255,255,0.35),transparent_25%),radial-gradient(circle_at_85%_20%,rgba(255,255,255,0.18),transparent_24%)]" />

      <div className="absolute bottom-0 left-0 right-0 h-[38%] bg-amber-900/15" />

      <div className="absolute left-5 top-5 z-40 rounded-2xl bg-white/90 px-4 py-3 shadow-lg backdrop-blur">
        <div className="flex items-center gap-2">
          <ChefHat className="h-5 w-5 text-orange-600" />

          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-orange-600">
              Junior Chef Mode
            </p>

            <p className="text-sm font-semibold text-slate-950">
              Build your masterpiece
            </p>
          </div>
        </div>
      </div>

      <div className="relative z-10 flex min-h-0 flex-1 items-center justify-center px-6 pb-28 pt-20">
        <motion.div
          animate={{
            scale: pizzaScale,
          }}
          transition={{
            type: "spring",
            stiffness: 160,
            damping: 18,
          }}
          className="relative aspect-square w-[min(58%,330px)] max-h-[48vh] max-w-[330px] rounded-full bg-amber-700 shadow-[0_25px_60px_rgba(92,45,0,0.30)]"
        >
          <div className="absolute inset-[4%] rounded-full bg-orange-300" />

          <div className="absolute inset-[9%] rounded-full bg-red-500/90 shadow-inner" />

          <motion.div
            layout
            className={[
              "absolute inset-[12%] rounded-full shadow-inner transition-colors duration-300",
              cheeseClass,
            ].join(" ")}
          />

          <div className="absolute inset-[12%] overflow-hidden rounded-full">
            {selectedDecorations.map((item, index) => (
              <motion.div
                key={`${item.id}-${item.type}`}
                initial={{
                  scale: 0,
                  rotate: -90,
                  opacity: 0,
                }}
                animate={{
                  scale: 1,
                  rotate: item.rotate ?? 0,
                  opacity: 1,
                }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 14,
                  delay: index * 0.025,
                }}
                className="absolute"
                style={{
                  left: `${item.x}%`,
                  top: `${item.y}%`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <Topping item={item} />
              </motion.div>
            ))}
          </div>

          <div className="absolute left-[23%] top-[-4%] rotate-[-5deg] rounded-lg bg-white px-3 py-1.5 text-xs font-black text-slate-950 shadow-lg">
            Your Pizza
          </div>
        </motion.div>
      </div>

      <div className="absolute inset-x-4 bottom-4 z-50">
        <motion.div
          key={message}
          initial={{
            opacity: 0,
            scale: 0.9,
            y: 8,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
          }}
          className="mx-auto mb-2 w-fit rounded-full bg-slate-950 px-4 py-2 text-white shadow-xl"
        >
          <div className="flex items-center gap-2">
            <Sparkles className="h-3.5 w-3.5 text-amber-300" />

            <span className="text-xs font-bold">
              {message}
            </span>

            <Sparkles className="h-3.5 w-3.5 text-amber-300" />
          </div>
        </motion.div>

        <div className="rounded-2xl bg-slate-950/92 px-4 py-3 text-white shadow-xl backdrop-blur">
          <div className="flex items-center gap-3">
            <Star className="h-5 w-5 shrink-0 fill-amber-400 text-amber-400" />

            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-black uppercase tracking-[0.18em] text-white/55">
                  Pizza Power
                </span>

                <span className="text-xs font-black">
                  {power}%
                </span>
              </div>

              <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/15">
                <motion.div
                  animate={{
                    width: `${power}%`,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 140,
                    damping: 18,
                  }}
                  className="h-full rounded-full bg-gradient-to-r from-orange-500 via-amber-400 to-yellow-300"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
