import Link from "next/link";
import {
  ArrowRight,
  Bike,
  Candy,
  Check,
  ChefHat,
  Clock3,
  Hamburger,
  IceCreamBowl,
  MapPin,
  Pizza,
  Popcorn,
  ShoppingBag,
  Sparkles,
  Star,
} from "lucide-react";

import { PizzaStudio } from "@/components/food/pizza-studio";

const menuHighlights = [
  {
    name: "Happy-Park Pizza",
    description:
      "Build it your way with our interactive Pizza Studio — choose your size, crust, cheese, toppings, sides and drinks.",
    icon: Pizza,
    label: "Build Your Own",
    href: "#pizza-studio",
    featured: true,
    tone: "from-orange-500 via-orange-400 to-yellow-300",
  },
  {
    name: "Hot Dogs",
    description:
      "A classic park-day favourite for hungry little adventurers and grown-ups too.",
    icon: ChefHat,
    label: "Park Favourite",
    href: "#more-favourites",
    tone: "from-red-400 to-orange-300",
  },
  {
    name: "Hamburgers",
    description:
      "A satisfying Happy-Park favourite when all that playing works up a serious appetite.",
    icon: Hamburger,
    label: "Big Appetite",
    href: "#more-favourites",
    tone: "from-amber-500 to-yellow-300",
  },
];

const sweetTreats = [
  {
    name: "Popcorn",
    copy: "Crunchy, classic and made for Happy-Park moments.",
    icon: Popcorn,
  },
  {
    name: "Snow Cones",
    copy: "A cool, colourful treat after all that playing.",
    icon: Sparkles,
  },
  {
    name: "Cotton Candy",
    copy: "Fluffy, sweet and unmistakably fun.",
    icon: Candy,
  },
  {
    name: "Ice Cream",
    copy: "Finish the adventure with a cold Happy-Park favourite.",
    icon: IceCreamBowl,
  },
];

export function FoodStorefrontPreview() {
  return (
    <main className="overflow-hidden bg-[#faf9f6] text-slate-950">
      <section className="relative overflow-hidden bg-slate-950 px-5 pb-20 pt-28 text-white sm:px-8 lg:px-12 lg:pb-28 lg:pt-36">
        <div className="absolute -left-24 top-16 h-80 w-80 rounded-full bg-orange-500/20 blur-3xl" />
        <div className="absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-yellow-300/10 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] backdrop-blur">
              <ChefHat className="h-4 w-4 text-yellow-300" />
              Happy-Park Food
            </div>

            <h1 className="mt-7 max-w-4xl text-5xl font-black leading-[0.94] tracking-[-0.055em] sm:text-6xl lg:text-7xl">
              Play hard.
              <span className="block text-orange-400">
                Eat happy.
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-8 text-white/65 sm:text-lg">
              From build-your-own pizza and burgers to popcorn,
              snow cones, cotton candy and ice cream — Happy-Park
              has something waiting when adventure makes you hungry.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="#pizza-studio"
                className="inline-flex min-h-12 items-center gap-2 rounded-full bg-orange-500 px-6 text-sm font-black text-white transition hover:bg-orange-600"
              >
                Build a pizza
                <Pizza className="h-4 w-4" />
              </Link>

              <Link
                href="/food/order/preview"
                className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/15 bg-white/10 px-6 text-sm font-black backdrop-blur"
              >
                See order tracking
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-xs font-bold text-white/55">
              <span className="flex items-center gap-2">
                <Check className="h-4 w-4 text-emerald-400" />
                Pizza Studio
              </span>
              <span className="flex items-center gap-2">
                <Check className="h-4 w-4 text-emerald-400" />
                Park favourites
              </span>
              <span className="flex items-center gap-2">
                <Check className="h-4 w-4 text-emerald-400" />
                Sweet treats
              </span>
            </div>
          </div>

          <div className="relative mx-auto h-[470px] w-full max-w-[520px]">
            <div className="absolute left-[5%] top-[8%] h-[80%] w-[80%] rotate-[-6deg] rounded-[3rem] bg-orange-500" />
            <div className="absolute right-[2%] top-[15%] h-[78%] w-[78%] rotate-[5deg] rounded-[3rem] bg-yellow-300" />

            <div className="absolute inset-[9%] flex flex-col justify-between rounded-[3rem] bg-white p-7 text-slate-950 shadow-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-orange-600">
                    Today&apos;s Happy Pick
                  </p>
                  <p className="mt-1 text-2xl font-black">
                    Pizza + Play
                  </p>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100">
                  <Pizza className="h-7 w-7 text-orange-600" />
                </div>
              </div>

              <div className="mx-auto flex h-48 w-48 items-center justify-center rounded-full bg-gradient-to-br from-yellow-200 via-orange-200 to-orange-400 shadow-xl">
                <div className="flex h-36 w-36 items-center justify-center rounded-full border-[12px] border-orange-300 bg-yellow-200">
                  <Pizza className="h-20 w-20 text-orange-600" />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <FoodMini label="Build" value="Your Pizza" />
                <FoodMini label="Add" value="Treats" />
                <FoodMini label="Enjoy" value="Happy!" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-orange-600">
                Happy-Park favourites
              </p>

              <h2 className="mt-3 max-w-3xl text-4xl font-black tracking-[-0.04em] sm:text-5xl">
                Fuel the next adventure.
              </h2>
            </div>

            <p className="max-w-lg text-sm leading-7 text-slate-500">
              Take a break from the action and enjoy some of the
              food favourites available at Happy-Park.
            </p>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {menuHighlights.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={[
                    "group overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl",
                    item.featured ? "lg:row-span-1" : "",
                  ].join(" ")}
                >
                  <div
                    className={`relative flex h-56 items-center justify-center overflow-hidden bg-gradient-to-br ${item.tone}`}
                  >
                    <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-white/20" />
                    <div className="absolute -bottom-12 -left-8 h-40 w-40 rounded-full bg-white/15" />

                    <div className="flex h-28 w-28 items-center justify-center rounded-[2rem] bg-white/90 shadow-2xl transition duration-300 group-hover:rotate-3 group-hover:scale-105">
                      <Icon className="h-14 w-14 text-slate-950" />
                    </div>

                    <span className="absolute left-5 top-5 rounded-full bg-slate-950 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.14em] text-white">
                      {item.label}
                    </span>
                  </div>

                  <div className="p-6">
                    <h3 className="text-2xl font-black">
                      {item.name}
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-slate-500">
                      {item.description}
                    </p>

                    <span className="mt-6 inline-flex items-center gap-2 text-sm font-black text-orange-600">
                      Explore
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section
        id="pizza-studio"
        className="scroll-mt-32 border-y border-slate-200 bg-white sm:scroll-mt-28"
      >
        <div className="mx-auto max-w-7xl px-5 pt-20 text-center sm:px-8 lg:px-12">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full bg-orange-100 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-orange-700">
            <Sparkles className="h-4 w-4" />
            Signature Experience
          </div>

          <h2 className="mx-auto mt-5 max-w-3xl text-4xl font-black tracking-[-0.04em] sm:text-5xl">
            Welcome to the Pizza Studio.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-500">
            Let the family have some fun building a Happy-Park
            pizza exactly the way they want it.
          </p>
        </div>

        <PizzaStudio />
      </section>

      <section
        id="more-favourites"
        className="px-5 py-20 sm:px-8 lg:px-12 lg:py-28"
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid items-end gap-8 lg:grid-cols-2">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-pink-600">
                Something sweet
              </p>

              <h2 className="mt-3 text-4xl font-black tracking-[-0.04em] sm:text-5xl">
                The happy ending.
              </h2>
            </div>

            <p className="max-w-xl text-sm leading-7 text-slate-500 lg:justify-self-end">
              Cool down, treat yourself or grab something for
              Movie Night with Happy-Park&apos;s classic sweet favourites.
            </p>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {sweetTreats.map((item, index) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.name}
                  className={[
                    "rounded-[2rem] p-6",
                    index === 0
                      ? "bg-yellow-200"
                      : index === 1
                        ? "bg-sky-200"
                        : index === 2
                          ? "bg-pink-200"
                          : "bg-orange-200",
                  ].join(" ")}
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/75 shadow-sm">
                    <Icon className="h-7 w-7" />
                  </div>

                  <h3 className="mt-8 text-2xl font-black">
                    {item.name}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {item.copy}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-slate-950 px-5 py-20 text-white sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-5 lg:grid-cols-2">
            <div className="rounded-[2.5rem] border border-white/10 bg-white/5 p-8 sm:p-10">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500 text-white">
                <ShoppingBag className="h-7 w-7" />
              </div>

              <p className="mt-8 text-xs font-black uppercase tracking-[0.2em] text-orange-400">
                Enjoy it at Happy-Park
              </p>

              <h2 className="mt-4 text-3xl font-black">
                Order. Pick up. Keep playing.
              </h2>

              <p className="mt-4 max-w-xl text-sm leading-7 text-white/60">
                The Happy-Park ordering experience is designed to
                make getting food simple so families can spend more
                time enjoying the park.
              </p>

              <div className="mt-7 flex items-center gap-3 text-sm font-bold text-white/70">
                <MapPin className="h-5 w-5 text-orange-400" />
                Happy-Park, Southfield, St Elizabeth
              </div>
            </div>

            <div className="rounded-[2.5rem] bg-gradient-to-br from-orange-500 to-orange-600 p-8 sm:p-10">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-white">
                <Bike className="h-7 w-7" />
              </div>

              <p className="mt-8 text-xs font-black uppercase tracking-[0.2em] text-yellow-200">
                Powered by SLYDE
              </p>

              <h2 className="mt-4 text-3xl font-black text-white">
                Happy can come to you.
              </h2>

              <p className="mt-4 max-w-xl text-sm leading-7 text-white/75">
                Happy-Park&apos;s digital ordering experience is designed
                to support delivery through SLYDE, with order progress
                and delivery tracking in one connected journey.
              </p>

              <Link
                href="/food/order/preview"
                className="mt-7 inline-flex min-h-12 items-center gap-2 rounded-full bg-slate-950 px-6 text-sm font-black text-white"
              >
                Preview order tracking
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-7xl rounded-[2.75rem] bg-yellow-300 p-8 sm:p-12 lg:p-16">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto]">
            <div>
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 fill-slate-950" />
                <Clock3 className="h-5 w-5" />
                <Pizza className="h-5 w-5" />
              </div>

              <h2 className="mt-5 max-w-3xl text-4xl font-black tracking-[-0.04em] sm:text-5xl">
                From kitchen to happy.
              </h2>

              <p className="mt-5 max-w-2xl text-sm font-medium leading-7 text-slate-700">
                See how customers can follow their Happy-Park order
                from confirmation through preparation, oven,
                packaging, pickup and delivery.
              </p>
            </div>

            <Link
              href="/food/order/preview"
              className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-slate-950 px-7 text-sm font-black text-white shadow-xl"
            >
              Watch an order
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function FoodMini({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl bg-slate-50 px-2 py-3 text-center">
      <p className="text-[9px] font-black uppercase tracking-wider text-slate-400">
        {label}
      </p>
      <p className="mt-1 text-xs font-black">{value}</p>
    </div>
  );
}
