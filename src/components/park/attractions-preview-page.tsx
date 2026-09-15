import Link from "next/link";
import {
  ArrowRight,
  Baby,
  Bird,
  CakeSlice,
  Clock3,
  Heart,
  MapPin,
  PawPrint,
  PartyPopper,
  Pizza,
  ShieldCheck,
  Sparkles,
  Waves,
  Star,
  Zap,
} from "lucide-react";

import {
  attractionsPreview,
  type AttractionPreview,
} from "@/lib/park/attractions-preview";

const iconMap = {
  trampoline: Zap,
  slide: Sparkles,
  swing: Baby,
  ride: Star,
  animals: PawPrint,
  birds: Bird,
  pond: Waves,
  movie: PartyPopper,
};

export function AttractionsPreviewPage() {
  return (
    <main className="bg-[#fbfaf7] text-slate-950">
      <section className="relative overflow-hidden bg-slate-950 px-5 pb-20 pt-28 text-white sm:px-8 lg:px-12 lg:pb-28 lg:pt-36">
        <div className="absolute -left-20 top-20 h-72 w-72 rounded-full bg-orange-500/20 blur-3xl" />
        <div className="absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-yellow-300/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] backdrop-blur">
              <Sparkles className="h-4 w-4 text-yellow-300" />
              Discover Happy-Park
            </div>

            <h1 className="mt-7 max-w-4xl text-5xl font-black leading-[0.95] tracking-[-0.05em] sm:text-6xl lg:text-8xl">
              Big smiles.
              <span className="block text-orange-400">
                Bigger adventures.
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-7 text-white/65 sm:text-lg">
              Play, explore, celebrate and make a full day of it.
              Happy-Park brings family fun, food and memorable
              experiences together in Southfield, St Elizabeth.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="/book/visit"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-orange-500 px-6 text-sm font-black text-white transition hover:bg-orange-600"
              >
                Plan your visit
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/book/party"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 text-sm font-black backdrop-blur transition hover:bg-white/15"
              >
                Celebrate a birthday
                <CakeSlice className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="mt-14 grid gap-3 sm:grid-cols-3">
            <HeroFact
              icon={<MapPin className="h-5 w-5" />}
              label="Southfield"
              value="St Elizabeth"
            />

            <HeroFact
              icon={<Heart className="h-5 w-5" />}
              label="Made for"
              value="Family Days"
            />

            <HeroFact
              icon={<Pizza className="h-5 w-5" />}
              label="Play + Eat"
              value="One Happy Place"
            />
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-orange-600">
                Explore the park
              </p>

              <h2 className="mt-3 max-w-3xl text-4xl font-black tracking-[-0.04em] sm:text-5xl">
                Find their kind of happy.
              </h2>
            </div>

            <p className="max-w-lg text-sm leading-7 text-slate-500">
              From high-energy play to family time, celebrations
              and a pizza break, build a Happy-Park day around
              what your family loves.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {attractionsPreview.map((attraction, index) => (
              <AttractionCard
                key={attraction.id}
                attraction={attraction}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 pb-20 sm:px-8 lg:px-12 lg:pb-28">
        <div className="mx-auto grid max-w-7xl overflow-hidden rounded-[2.5rem] bg-orange-500 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="p-8 text-white sm:p-10 lg:p-14">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-yellow-200">
              One day. Lots of happy.
            </p>

            <h2 className="mt-4 text-4xl font-black tracking-[-0.04em] sm:text-5xl">
              Make a day of it.
            </h2>

            <p className="mt-5 max-w-xl text-sm leading-7 text-white/80">
              Arrive ready to play, take a pizza break, explore
              something new and finish with another round of fun.
              Happy-Park is designed around the whole family day.
            </p>

            <Link
              href="/book/visit"
              className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-full bg-slate-950 px-6 text-sm font-black text-white"
            >
              Start planning
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="relative min-h-[380px] overflow-hidden bg-gradient-to-br from-yellow-200 via-orange-200 to-orange-300">
            <div className="absolute left-[12%] top-[14%] flex h-36 w-36 rotate-[-8deg] items-center justify-center rounded-[2rem] bg-white shadow-2xl">
              <PartyPopper className="h-16 w-16 text-orange-500" />
            </div>

            <div className="absolute right-[10%] top-[24%] flex h-44 w-44 rotate-[8deg] items-center justify-center rounded-full bg-slate-950 text-white shadow-2xl">
              <Pizza className="h-20 w-20 text-yellow-300" />
            </div>

            <div className="absolute bottom-[10%] left-[28%] rounded-[2rem] bg-white px-7 py-6 shadow-2xl">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-orange-600">
                Happy-Park
              </p>
              <p className="mt-2 text-2xl font-black">
                Play. Eat.
                <br />
                Celebrate.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-20 sm:px-8 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-5 md:grid-cols-3">
            <InfoCard
              icon={<ShieldCheck className="h-6 w-6" />}
              title="Plan with confidence"
              copy="Helpful age, admission and visit guidance keeps the family day easier to plan."
            />

            <InfoCard
              icon={<Clock3 className="h-6 w-6" />}
              title="Build your day"
              copy="Choose your visit date and guests before arriving so more of the day is spent enjoying Happy-Park."
            />

            <InfoCard
              icon={<Star className="h-6 w-6" />}
              title="More than play"
              copy="Add food, celebrations and memorable family moments to make the visit your own."
            />
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-7xl rounded-[2.5rem] bg-slate-950 px-7 py-12 text-center text-white sm:px-10 lg:py-16">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-orange-400">
            Ready for a Happy day?
          </p>

          <h2 className="mx-auto mt-4 max-w-3xl text-4xl font-black tracking-[-0.04em] sm:text-5xl">
            Turn “what should we do today?” into a day they remember.
          </h2>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/book/visit"
              className="inline-flex min-h-12 items-center gap-2 rounded-full bg-orange-500 px-6 text-sm font-black"
            >
              Plan your visit
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="/food"
              className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/15 bg-white/10 px-6 text-sm font-black"
            >
              Explore the food
              <Pizza className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function AttractionCard({
  attraction,
  index,
}: {
  attraction: AttractionPreview;
  index: number;
}) {
  const Icon = iconMap[attraction.icon];

  return (
    <article
      className={[
        "group overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl",
        attraction.featured ? "md:col-span-2 xl:col-span-1" : "",
      ].join(" ")}
    >
      <div
        className={[
          "relative flex h-56 items-center justify-center overflow-hidden",
          index % 3 === 0
            ? "bg-gradient-to-br from-orange-400 to-yellow-300"
            : index % 3 === 1
              ? "bg-gradient-to-br from-sky-400 to-cyan-200"
              : "bg-gradient-to-br from-emerald-400 to-lime-200",
        ].join(" ")}
      >
        <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/20" />
        <div className="absolute -bottom-12 -left-8 h-40 w-40 rounded-full bg-white/15" />

        <div className="relative flex h-28 w-28 items-center justify-center rounded-[2rem] bg-white/90 shadow-2xl transition duration-300 group-hover:rotate-3 group-hover:scale-105">
          <Icon className="h-14 w-14 text-slate-950" />
        </div>

        {attraction.featured ? (
          <div className="absolute left-5 top-5 rounded-full bg-slate-950 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.14em] text-white">
            Family favourite
          </div>
        ) : null}
      </div>

      <div className="p-6">
        <p className="text-[10px] font-black uppercase tracking-[0.18em] text-orange-600">
          {attraction.eyebrow}
        </p>

        <h3 className="mt-2 text-2xl font-black tracking-tight">
          {attraction.name}
        </h3>

        <p className="mt-3 text-sm leading-6 text-slate-500">
          {attraction.description}
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-600">
            {attraction.experience}
          </span>

          <span className="rounded-full bg-orange-50 px-3 py-1.5 text-xs font-bold text-orange-700">
            {attraction.ageGuide}
          </span>
        </div>
      </div>
    </article>
  );
}

function HeroFact({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-orange-300">
        {icon}
      </div>

      <div>
        <p className="text-xs text-white/45">{label}</p>
        <p className="font-black">{value}</p>
      </div>
    </div>
  );
}

function InfoCard({
  icon,
  title,
  copy,
}: {
  icon: React.ReactNode;
  title: string;
  copy: string;
}) {
  return (
    <div className="rounded-[2rem] border border-slate-200 bg-[#fbfaf7] p-6">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100 text-orange-600">
        {icon}
      </div>

      <h3 className="mt-5 text-xl font-black">{title}</h3>

      <p className="mt-3 text-sm leading-6 text-slate-500">
        {copy}
      </p>
    </div>
  );
}


