"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  ChefHat,
  Sparkles,
  Star,
} from "lucide-react";

import { FoodItemIllustration } from "@/components/food/food-item-illustration";

type MealTablePreviewProps = {
  toppings: string[];
  extras: string[];
  sizeId: string;
  cheeseId: string;
  totalMinor: number;
};

const toppingLayout = [
  { left: 28, top: 29 },
  { left: 51, top: 25 },
  { left: 67, top: 39 },
  { left: 38, top: 49 },
  { left: 58, top: 56 },
  { left: 27, top: 66 },
  { left: 67, top: 68 },
  { left: 48, top: 73 },
];

function money(minor: number) {
  return new Intl.NumberFormat("en-JM", {
    style: "currency",
    currency: "JMD",
    maximumFractionDigits: 0,
  }).format(minor / 100);
}

function IllustratedTopping({
  id,
}: {
  id: string;
}) {
  if (id === "pepperoni") {
    return (
      <div className="h-7 w-7 rounded-full border-2 border-red-700/30 bg-red-500 shadow">
        <div className="ml-1 mt-1 h-1 w-1 rounded-full bg-red-800/50" />
      </div>
    );
  }

  if (id === "pineapple") {
    return (
      <div className="h-6 w-6 rotate-12 rounded-md bg-yellow-300 shadow" />
    );
  }

  if (id === "onion") {
    return (
      <div className="h-7 w-7 rounded-full border-[4px] border-purple-400" />
    );
  }

  if (id === "sweet-pepper") {
    return (
      <div className="h-3 w-9 rotate-12 rounded-full bg-green-600 shadow" />
    );
  }

  if (id === "mushroom") {
    return (
      <div className="relative h-8 w-8">
        <div className="absolute left-0 top-0 h-5 w-8 rounded-t-full bg-stone-200 shadow" />
        <div className="absolute left-3 top-4 h-4 w-2 rounded-b bg-stone-300" />
      </div>
    );
  }

  if (id === "jalapeno") {
    return (
      <div className="h-7 w-7 rounded-full border-[5px] border-green-700 bg-green-300 shadow" />
    );
  }

  if (id === "bacon") {
    return (
      <div className="h-3 w-10 rotate-12 rounded-full bg-red-700 shadow" />
    );
  }

  if (id === "chicken") {
    return (
      <div className="h-6 w-8 rotate-12 rounded-[45%] bg-amber-500 shadow" />
    );
  }

  if (id === "jerk-chicken") {
    return (
      <div className="h-6 w-8 rotate-[-12deg] rounded-[45%] bg-amber-900 shadow" />
    );
  }

  if (id === "beef") {
    return (
      <div className="h-6 w-7 rounded-lg bg-amber-950 shadow" />
    );
  }

  if (id === "ham") {
    return (
      <div className="h-6 w-8 rotate-12 rounded-md bg-pink-500 shadow" />
    );
  }

  return (
    <div className="h-5 w-5 rounded-full bg-yellow-100 shadow" />
  );
}

export function MealTablePreview({
  toppings,
  extras,
  sizeId,
  cheeseId,
  totalMinor,
}: MealTablePreviewProps) {
  const pizzaScale =
    sizeId === "small"
      ? 0.78
      : sizeId === "medium"
        ? 0.86
        : sizeId === "large"
          ? 0.94
          : 1;

  const sides = extras.filter((item) =>
    [
      "garlic-bread",
      "happy-fries",
      "chicken-bites",
      "fruit-cup",
    ].includes(item),
  );

  const drinks = extras.filter((item) =>
    [
      "fruit-punch",
      "water",
      "soda",
      "juice",
    ].includes(item),
  );

  const power = Math.min(
    100,
    30 +
      toppings.length * 8 +
      sides.length * 8 +
      drinks.length * 10,
  );

  const status =
    sides.length > 0 && drinks.length > 0
      ? "Your Happy Meal is ready!"
      : extras.length > 0
        ? "Looking tasty!"
        : "Complete your Happy Meal!";

  return (
    <div className="relative h-full min-h-0 overflow-hidden bg-gradient-to-br from-orange-400 via-amber-300 to-yellow-200">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(255,255,255,0.45),transparent_25%),radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.2),transparent_24%)]" />

      <div className="absolute left-[7%] top-[18%] h-28 w-20 rounded-t-full bg-green-600/50 blur-[1px]" />

      <div className="absolute right-[8%] top-[8%] h-20 w-20 rounded-full bg-orange-600/15" />

      <div className="absolute inset-x-0 bottom-0 h-[56%] bg-gradient-to-b from-amber-700/25 to-amber-950/35" />

      <div className="absolute bottom-0 left-0 right-0 h-[44%] opacity-30">
        <div className="absolute inset-x-0 top-4 h-1 bg-amber-950/30" />
        <div className="absolute inset-x-0 top-20 h-1 bg-amber-950/20" />
      </div>

      <div className="absolute left-5 top-5 z-40 rounded-2xl bg-white/90 px-4 py-3 shadow-xl backdrop-blur">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
            <ChefHat className="h-5 w-5" />
          </div>

          <div>
            <p className="text-[9px] font-black uppercase tracking-[0.2em] text-orange-600">
              Junior Chef Mode
            </p>

            <p className="text-sm font-bold text-slate-950">
              Complete your Happy meal!
            </p>
          </div>
        </div>
      </div>

      <motion.div
        animate={{
          scale: pizzaScale,
        }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 18,
        }}
        className="absolute bottom-[20%] left-[2%] z-10 aspect-square w-[50%] origin-bottom xl:w-[53%]"
      >
        <div className="absolute inset-0 rounded-full bg-amber-800 shadow-[0_30px_70px_rgba(80,35,0,0.4)]" />

        <div className="absolute inset-[4%] rounded-full bg-orange-300" />

        <div className="absolute inset-[9%] rounded-full bg-red-500" />

        <div
          className={[
            "absolute inset-[12%] rounded-full shadow-inner",
            cheeseId === "loaded"
              ? "bg-yellow-300"
              : cheeseId === "extra"
                ? "bg-yellow-200"
                : "bg-amber-100",
          ].join(" ")}
        />

        <div className="absolute inset-[12%] overflow-hidden rounded-full">
          <AnimatePresence>
            {toppings.flatMap((topping, toppingIndex) =>
              [0, 1, 2].map((instance) => {
                const position =
                  toppingLayout[
                    (toppingIndex * 2 + instance) %
                      toppingLayout.length
                  ];

                return (
                  <motion.div
                    key={`${topping}-${instance}`}
                    initial={{
                      opacity: 0,
                      scale: 0,
                      y: -35,
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 250,
                      damping: 16,
                      delay: instance * 0.035,
                    }}
                    className="absolute"
                    style={{
                      left: `${position.left}%`,
                      top: `${position.top}%`,
                    }}
                  >
                    <IllustratedTopping id={topping} />
                  </motion.div>
                );
              }),
            )}
          </AnimatePresence>
        </div>

        <div className="absolute left-[25%] top-0 z-30 -rotate-6 rounded-lg bg-white px-3 py-1.5 text-xs font-black text-slate-950 shadow-lg">
          Your Pizza
        </div>
      </motion.div>

      <AnimatePresence>
        {sides.map((item, index) => {
          const sideSlots = [
            { right: "5%", bottom: "29%" },
            { right: "20%", bottom: "18%" },
            { right: "6%", bottom: "12%" },
            { right: "22%", bottom: "34%" },
          ];

          const slot = sideSlots[index] ?? sideSlots[0];

          return (
            <motion.div
              key={item}
              initial={{
                opacity: 0,
                scale: 0.5,
                y: -30,
              }}
              animate={{
                opacity: 1,
                scale: 0.88,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.5,
              }}
              transition={{
                type: "spring",
                stiffness: 190,
                damping: 16,
              }}
              className="absolute z-20"
              style={slot}
            >
              <FoodItemIllustration
                id={item}
                className="drop-shadow-xl"
              />
            </motion.div>
          );
        })}
      </AnimatePresence>

      <AnimatePresence>
        {drinks.map((item, index) => {
          const drinkSlots = [
            { right: "5%", top: "16%" },
            { right: "18%", top: "12%" },
            { right: "5%", top: "35%" },
            { right: "18%", top: "31%" },
          ];

          const slot = drinkSlots[index] ?? drinkSlots[0];

          return (
            <motion.div
              key={item}
              initial={{
                opacity: 0,
                scale: 0.5,
                x: 30,
              }}
              animate={{
                opacity: 1,
                scale: 0.82,
                x: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.5,
              }}
              transition={{
                type: "spring",
                stiffness: 190,
                damping: 16,
              }}
              className="absolute z-30"
              style={slot}
            >
              <FoodItemIllustration
                id={item}
                className="drop-shadow-xl"
              />
            </motion.div>
          );
        })}
      </AnimatePresence>

      <motion.div
        key={status}
        initial={{
          opacity: 0,
          y: 10,
          scale: 0.9,
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        className="absolute bottom-[20%] left-[18%] z-40 rounded-full bg-slate-950 px-4 py-2.5 text-white shadow-xl"
      >
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-amber-300" />

          <span className="text-sm font-bold">
            {status}
          </span>

          <Sparkles className="h-4 w-4 text-amber-300" />
        </div>
      </motion.div>

      <div className="absolute bottom-3 left-4 right-4 z-40 flex items-center gap-3">
        <div className="flex flex-1 items-center gap-3 rounded-2xl bg-slate-950/90 px-4 py-3 text-white shadow-xl backdrop-blur">
          <Star className="h-5 w-5 fill-amber-400 text-amber-400" />

          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-[0.18em] text-white/60">
                Pizza Power
              </span>

              <span className="text-sm font-black">
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

        {sides.length > 0 && drinks.length > 0 && (
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.8,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            className="hidden rounded-2xl bg-white/95 p-4 shadow-xl sm:block"
          >
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-400 text-white">
                <Check className="h-4 w-4" />
              </div>

              <div>
                <p className="text-xs font-black text-slate-950">
                  Your Happy Meal
                </p>

                <p className="text-[10px] text-slate-500">
                  Pizza + side + drink
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      <div className="absolute right-4 top-4 z-40 rounded-full bg-white/90 px-3 py-1.5 text-xs font-black text-orange-600 shadow-lg lg:hidden">
        {money(totalMinor)}
      </div>
    </div>
  );
}








