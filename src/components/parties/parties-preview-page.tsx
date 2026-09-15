import Link from "next/link";
import {
  ArrowRight,
  CakeSlice,
  CalendarDays,
  Check,
  Gift,
  Heart,
  IceCreamBowl,
  PartyPopper,
  Pizza,
  Popcorn,
  Sparkles,
  Star,
  WandSparkles,
} from "lucide-react";

const partyHighlights = [
  {
    title: "Play first",
    copy: "Let the kids jump, slide, swing, ride and explore before the celebration continues.",
    icon: Sparkles,
  },
  {
    title: "Party food",
    copy: "Build the celebration around Happy-Park favourites including pizza and classic park treats.",
    icon: Pizza,
  },
  {
    title: "Make it theirs",
    copy: "Choose the party experience, guest count and available extras inside the Happy-Park Party Builder.",
    icon: Gift,
  },
];

const partyJourney = [
  ["01", "Choose the experience", "Start with the Happy-Park celebration that fits your day."],
  ["02", "Pick your date", "Select the preferred celebration date and available time."],
  ["03", "Add your guests", "Tell us how many little Happy-Park guests are coming."],
  ["04", "Make it delicious", "Build out the food and available party extras."],
  ["05", "Review your party", "See the celebration together before confirming."],
];

const foodMoments = [
  { label: "Pizza", icon: Pizza },
  { label: "Popcorn", icon: Popcorn },
  { label: "Ice Cream", icon: IceCreamBowl },
  { label: "Party Treats", icon: CakeSlice },
];

export function PartiesPreviewPage() {
  return (
    <main className="overflow-hidden bg-[#fffaf4] text-slate-950">
      <section className="relative px-5 pb-20 pt-28 sm:px-8 lg:px-12 lg:pb-28 lg:pt-36">
        <div className="absolute left-[-8rem] top-20 h-80 w-80 rounded-full bg-pink-200/50 blur-3xl" />
        <div className="absolute right-[-8rem] top-0 h-96 w-96 rounded-full bg-orange-200/60 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white/80 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-orange-700 shadow-sm backdrop-blur">
              <PartyPopper className="h-4 w-4" />
              Happy-Park Celebrations
            </div>

            <h1 className="mt-7 max-w-4xl text-5xl font-black leading-[0.94] tracking-[-0.055em] sm:text-6xl lg:text-7xl">
              Their birthday.
              <span className="block text-orange-500">
                Their Happy-Park.
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
              Turn their special day into play, laughter, food and
              memories — all brought together in one Happy-Park
              celebration.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="/book/party"
                className="inline-flex min-h-12 items-center gap-2 rounded-full bg-slate-950 px-6 text-sm font-black text-white transition hover:bg-orange-500"
              >
                Build a birthday
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/attractions"
                className="inline-flex min-h-12 items-center gap-2 rounded-full border border-slate-200 bg-white px-6 text-sm font-black shadow-sm"
              >
                Explore Happy-Park
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-sm font-bold text-slate-500">
              <span className="flex items-center gap-2">
                <Check className="h-4 w-4 text-emerald-500" />
                Play
              </span>
              <span className="flex items-center gap-2">
                <Check className="h-4 w-4 text-emerald-500" />
                Food
              </span>
              <span className="flex items-center gap-2">
                <Check className="h-4 w-4 text-emerald-500" />
                Celebration
              </span>
            </div>
          </div>

          <div className="relative mx-auto h-[500px] w-full max-w-[520px]">
            <div className="absolute left-[5%] top-[7%] h-[82%] w-[82%] rotate-[-6deg] rounded-[3rem] bg-orange-400" />
            <div className="absolute right-[2%] top-[15%] h-[78%] w-[78%] rotate-[5deg] rounded-[3rem] bg-yellow-300" />

            <div className="absolute inset-[8%] flex flex-col justify-between overflow-hidden rounded-[3rem] border border-white/70 bg-white/90 p-7 shadow-2xl backdrop-blur">
              <div className="flex items-center justify-between">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 text-orange-600">
                  <CakeSlice className="h-7 w-7" />
                </div>

                <span className="rounded-full bg-slate-950 px-4 py-2 text-xs font-black text-white">
                  HAPPY BIRTHDAY!
                </span>
              </div>

              <div className="text-center">
                <div className="mx-auto flex h-40 w-40 items-center justify-center rounded-full bg-gradient-to-br from-pink-100 via-yellow-100 to-orange-100">
                  <PartyPopper className="h-20 w-20 text-orange-500" />
                </div>

                <p className="mt-5 text-xs font-black uppercase tracking-[0.2em] text-orange-500">
                  Made for happy memories
                </p>

                <p className="mt-2 text-3xl font-black tracking-tight">
                  Play. Eat.
                  <br />
                  Celebrate.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <MiniMoment icon={<Sparkles className="h-4 w-4" />} label="Play" />
                <MiniMoment icon={<Pizza className="h-4 w-4" />} label="Eat" />
                <MiniMoment icon={<Gift className="h-4 w-4" />} label="Celebrate" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-orange-600">
              The Happy-Park way
            </p>
            <h2 className="mt-3 text-4xl font-black tracking-[-0.04em] sm:text-5xl">
              More than cake and candles.
            </h2>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-500">
              A Happy-Park birthday brings the whole experience together:
              active play, favourite foods and a day centred around the
              birthday child.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {partyHighlights.map((item) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.title}
                  className="rounded-[2rem] border border-slate-200 bg-[#fffaf4] p-7"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 text-orange-600">
                    <Icon className="h-7 w-7" />
                  </div>

                  <h3 className="mt-6 text-2xl font-black">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-500">
                    {item.copy}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-start gap-14 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="lg:sticky lg:top-28">
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-950 text-yellow-300">
                <WandSparkles className="h-7 w-7" />
              </div>

              <h2 className="mt-6 text-4xl font-black tracking-[-0.04em] sm:text-5xl">
                Build the big day.
              </h2>

              <p className="mt-5 max-w-lg text-sm leading-7 text-slate-500">
                Our interactive Party Builder makes planning the
                celebration feel simple — from the first choice through
                the final review.
              </p>

              <Link
                href="/book/party"
                className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-full bg-orange-500 px-6 text-sm font-black text-white"
              >
                Open Party Builder
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="space-y-3">
              {partyJourney.map(([number, title, copy]) => (
                <div
                  key={number}
                  className="flex gap-5 rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-950 text-sm font-black text-white">
                    {number}
                  </div>

                  <div>
                    <h3 className="text-lg font-black">{title}</h3>
                    <p className="mt-1 text-sm leading-6 text-slate-500">
                      {copy}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-950 px-5 py-20 text-white sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-yellow-300">
                Party fuel
              </p>

              <h2 className="mt-4 text-4xl font-black tracking-[-0.04em] sm:text-5xl">
                Happy kids get hungry.
              </h2>

              <p className="mt-5 max-w-xl text-sm leading-7 text-white/60">
                Happy-Park has family favourites ready for the celebration,
                including pizza and classic park treats.
              </p>

              <Link
                href="/food"
                className="mt-8 inline-flex items-center gap-2 text-sm font-black text-orange-400"
              >
                Explore Happy-Park food
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {foodMoments.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.label}
                    className="rounded-[2rem] border border-white/10 bg-white/5 p-6"
                  >
                    <Icon className="h-8 w-8 text-yellow-300" />
                    <p className="mt-5 text-lg font-black">{item.label}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2.75rem] bg-gradient-to-br from-orange-500 to-pink-500 p-8 text-white sm:p-12 lg:p-16">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto]">
            <div>
              <div className="flex items-center gap-2 text-yellow-200">
                <Heart className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
                <Sparkles className="h-5 w-5" />
              </div>

              <h2 className="mt-5 max-w-3xl text-4xl font-black tracking-[-0.04em] sm:text-5xl">
                Give them a birthday with a little more happy.
              </h2>

              <p className="mt-5 max-w-2xl text-sm leading-7 text-white/80">
                Start building the celebration and see the Happy-Park
                birthday experience come together.
              </p>
            </div>

            <Link
              href="/book/party"
              className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-white px-7 text-sm font-black text-slate-950 shadow-xl"
            >
              Start planning
              <CalendarDays className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function MiniMoment({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-1 rounded-xl bg-slate-50 px-2 py-3 text-slate-700">
      {icon}
      <span className="text-[10px] font-black uppercase tracking-wide">
        {label}
      </span>
    </div>
  );
}
