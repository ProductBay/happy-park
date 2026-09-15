"use client";

import { motion } from "framer-motion";
import {
  ChefHat,
  PartyPopper,
  Pizza,
  Ruler,
  Sparkles,
  Star,
  ThumbsUp,
  UtensilsCrossed,
} from "lucide-react";

type ParkyPizzaGuideProps = {
  step: number;
  toppingCount?: number;
  extraCount?: number;
};

const stepContent = [
  {
    eyebrow: "LET'S START!",
    message: "Pick your pizza size!",
    sub: "Big adventures start with a great pizza.",
    mode: "measure",
  },
  {
    eyebrow: "CRUST TIME!",
    message: "Build the perfect foundation!",
    sub: "Every great pizza starts here.",
    mode: "crust",
  },
  {
    eyebrow: "CHEESY MAGIC!",
    message: "Sauce it. Cheese it. Love it!",
    sub: "Now we're getting delicious.",
    mode: "chef",
  },
  {
    eyebrow: "MAKE IT YOURS!",
    message: "Load up your favourites!",
    sub: "This is where your masterpiece comes alive.",
    mode: "toppings",
  },
  {
    eyebrow: "HAPPY MEAL TIME!",
    message: "Complete your Happy Meal!",
    sub: "Add something tasty on the side.",
    mode: "meal",
  },
  {
    eyebrow: "YOU DID IT!",
    message: "Look at that masterpiece!",
    sub: "Parky gives this pizza two paws up.",
    mode: "celebrate",
  },
] as const;

export function ParkyPizzaGuide({
  step,
  toppingCount = 0,
  extraCount = 0,
}: ParkyPizzaGuideProps) {
  const content =
    stepContent[Math.min(Math.max(step, 0), stepContent.length - 1)];

  let message: string = content.message;
  let sub: string = content.sub;

  if (step === 3 && toppingCount >= 3) {
    message = "Whoa! Now THAT'S a pizza!";
    sub =
      toppingCount >= 6
        ? "Masterpiece mode activated!"
        : "Keep going, Junior Chef!";
  }

  if (step === 4 && extraCount >= 1) {
    message =
      extraCount >= 2
        ? "Your Happy Meal is coming together!"
        : "Tasty choice!";
    sub =
      extraCount >= 2
        ? "Pizza, sides and drinks — now we're talking!"
        : "Want to add something else?";
  }

  return (
    <div className="pointer-events-none absolute bottom-[15%] left-[1.5%] z-[45] w-[36%] max-w-[185px]">
      <motion.div
        key={step}
        initial={{
          opacity: 0,
          x: -30,
          scale: 0.92,
        }}
        animate={{
          opacity: 1,
          x: 0,
          scale: 1,
        }}
        transition={{
          type: "spring",
          stiffness: 170,
          damping: 17,
        }}
        className="relative"
      >
        <motion.div
          key={`spark-${step}`}
          initial={{
            opacity: 0,
            scale: 0.4,
            rotate: -20,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0.4, 1.25, 1.5],
            rotate: 20,
          }}
          transition={{
            duration: 0.8,
          }}
          className="absolute -right-2 -top-3 z-50"
        >
          <Sparkles className="h-7 w-7 text-yellow-400 drop-shadow" />
        </motion.div>

        <motion.div
          animate={{
            y: [0, -4, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative mx-auto h-32 w-28 xl:h-36 xl:w-32"
        >
          <div className="absolute left-1/2 top-0 z-20 h-12 w-24 -translate-x-1/2 rounded-[50%_50%_40%_40%] bg-white shadow-md">
            <div className="absolute -left-2 top-5 h-8 w-9 rounded-full bg-white" />
            <div className="absolute -right-2 top-5 h-8 w-9 rounded-full bg-white" />

            <div className="absolute inset-x-0 bottom-1 text-center text-[7px] font-black">
              <span className="text-red-500">Happy-</span>
              <span className="text-blue-600">Park</span>
            </div>
          </div>

          <div className="absolute left-1/2 top-8 h-24 w-24 -translate-x-1/2 rounded-full bg-[#8a451f] shadow-xl">
            <div className="absolute inset-[12px] rounded-full bg-gradient-to-b from-amber-300 to-orange-400" />

            <div className="absolute left-[26px] top-[34px] h-3 w-3 rounded-full bg-slate-950">
              <div className="ml-[2px] mt-[1px] h-1 w-1 rounded-full bg-white" />
            </div>

            <div className="absolute right-[26px] top-[34px] h-3 w-3 rounded-full bg-slate-950">
              <div className="ml-[2px] mt-[1px] h-1 w-1 rounded-full bg-white" />
            </div>

            <div className="absolute left-1/2 top-[48px] h-4 w-5 -translate-x-1/2 rounded-[50%] bg-amber-950" />

            <div className="absolute left-1/2 top-[61px] h-5 w-9 -translate-x-1/2 rounded-b-full bg-red-700">
              <div className="absolute bottom-0 left-1/2 h-2 w-5 -translate-x-1/2 rounded-full bg-red-400" />
            </div>

            <div className="absolute -left-2 top-7 h-6 w-6 rounded-full bg-amber-400" />
            <div className="absolute -right-2 top-7 h-6 w-6 rounded-full bg-amber-400" />
          </div>

          <div className="absolute bottom-0 left-1/2 h-16 w-20 -translate-x-1/2 rounded-t-[35%] bg-white shadow-lg">
            <div className="absolute inset-x-0 top-2 text-center text-lg font-black text-orange-500">
              H
            </div>

            <div className="absolute -left-3 top-2 h-10 w-5 rotate-[25deg] rounded-full bg-amber-400" />
            <div className="absolute -right-3 top-2 h-10 w-5 rotate-[-25deg] rounded-full bg-amber-400" />

            <div className="absolute left-1/2 top-0 h-4 w-12 -translate-x-1/2 rounded-b-full bg-red-500" />
          </div>

          <ParkyAction mode={content.mode} />
        </motion.div>

        {step === 5 ? (
          <motion.div
            initial={{
              opacity: 0,
              scale: 0,
              y: 10,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            transition={{
              type: "spring",
              delay: 0.2,
            }}
            className="absolute -right-5 top-4 z-50 rounded-full bg-green-500 px-3 py-1.5 text-[9px] font-black uppercase tracking-wide text-white shadow-lg"
          >
            Junior Chef Approved! ★
          </motion.div>
        ) : null}

        <motion.div
          key={`${step}-${message}`}
          initial={{
            opacity: 0,
            y: 8,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="relative -mt-1 rounded-2xl bg-white/95 px-3 py-2.5 text-center shadow-xl backdrop-blur"
        >
          <div className="absolute -top-2 left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 bg-white" />

          <p className="relative text-[8px] font-black uppercase tracking-[0.16em] text-orange-600">
            {content.eyebrow}
          </p>

          <p className="relative mt-0.5 text-xs font-black leading-4 text-slate-950">
            {message}
          </p>

          <p className="relative mt-1 hidden text-[9px] leading-3 text-slate-500 xl:block">
            {sub}
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}

function ParkyAction({
  mode,
}: {
  mode: (typeof stepContent)[number]["mode"];
}) {
  if (mode === "measure") {
    return (
      <motion.div
        initial={{ rotate: -15 }}
        animate={{ rotate: [-15, -5, -15] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute -right-5 bottom-4 flex h-9 w-9 items-center justify-center rounded-full bg-yellow-300 text-orange-700 shadow-lg"
      >
        <Ruler className="h-5 w-5" />
      </motion.div>
    );
  }

  if (mode === "crust") {
    return (
      <div className="absolute -right-5 bottom-5 flex h-10 w-10 items-center justify-center rounded-full bg-orange-500 text-white shadow-lg">
        <Pizza className="h-5 w-5" />
      </div>
    );
  }

  if (mode === "chef") {
    return (
      <motion.div
        animate={{ rotate: [-8, 8, -8] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute -right-5 bottom-5 flex h-10 w-10 items-center justify-center rounded-full bg-red-500 text-white shadow-lg"
      >
        <ChefHat className="h-5 w-5" />
      </motion.div>
    );
  }

  if (mode === "toppings") {
    return (
      <motion.div
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="absolute -right-5 bottom-5 flex h-10 w-10 items-center justify-center rounded-full bg-yellow-300 text-orange-700 shadow-lg"
      >
        <Star className="h-5 w-5 fill-current" />
      </motion.div>
    );
  }

  if (mode === "meal") {
    return (
      <div className="absolute -right-5 bottom-5 flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg">
        <UtensilsCrossed className="h-5 w-5" />
      </div>
    );
  }

  return (
    <motion.div
      animate={{
        rotate: [-10, 10, -10],
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration: 1.3,
        repeat: Infinity,
      }}
      className="absolute -right-6 bottom-5 flex h-11 w-11 items-center justify-center rounded-full bg-green-500 text-white shadow-lg"
    >
      <ThumbsUp className="h-6 w-6" />

      <PartyPopper className="absolute -right-4 -top-4 h-5 w-5 text-orange-500" />

      <Sparkles className="absolute -left-3 -top-3 h-4 w-4 text-yellow-500" />
    </motion.div>
  );
}





