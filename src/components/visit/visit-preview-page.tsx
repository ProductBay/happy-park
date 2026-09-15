import Link from "next/link";
import {
  ArrowRight,
  Baby,
  CalendarDays,
  Clock3,
  Heart,
  IceCreamBowl,
  MapPin,
  PawPrint,
  Pizza,
  Popcorn,
  Shirt,
  Sparkles,
  Star,
  Ticket,
  Users,
  Waves,
  Zap,
} from "lucide-react";

const dayJourney = [
  {
    number: "01",
    title: "Choose your day",
    copy: "Start by selecting your preferred Happy-Park visit date and who is coming.",
    icon: CalendarDays,
  },
  {
    number: "02",
    title: "Arrive ready for fun",
    copy: "Bring the family, get settled and start exploring the Happy-Park experience.",
    icon: Ticket,
  },
  {
    number: "03",
    title: "Play & explore",
    copy: "Jump, slide, swing, ride and discover the animals and nature around the park.",
    icon: Zap,
  },
  {
    number: "04",
    title: "Take a tasty break",
    copy: "Recharge with pizza and other Happy-Park food and treats before heading back to the fun.",
    icon: Pizza,
  },
];

const experienceCards = [
  {
    title: "Jump, slide & swing",
    copy: "Active Happy-Park favourites for kids ready to move.",
    icon: Zap,
    tone: "from-orange-400 to-yellow-300",
  },
  {
    title: "Riding toys",
    copy: "A fun little adventure for Happy-Park&apos;s young riders.",
    icon: Baby,
    tone: "from-sky-400 to-cyan-200",
  },
  {
    title: "Animals & nature",
    copy: "Meet the animals, see the birds and enjoy a quieter moment by the koi pond.",
    icon: PawPrint,
    tone: "from-emerald-400 to-lime-200",
  },
  {
    title: "Food & treats",
    copy: "Pizza, hot dogs, hamburgers and classic park treats are part of the Happy-Park day.",
    icon: Pizza,
    tone: "from-pink-400 to-orange-300",
  },
];

const foodHighlights = [
  { label: "Pizza", icon: Pizza },
  { label: "Popcorn", icon: Popcorn },
  { label: "Ice Cream", icon: IceCreamBowl },
  { label: "Park Treats", icon: Heart },
];

export function VisitPreviewPage() {
  return (
    <main className="overflow-hidden bg-[#fbfaf7] text-slate-950">
      <section className="relative overflow-hidden bg-slate-950 px-5 pb-20 pt-28 text-white sm:px-8 lg:px-12 lg:pb-28 lg:pt-36">
        <div className="absolute left-[-8rem] top-20 h-80 w-80 rounded-full bg-orange-500/20 blur-3xl" />
        <div className="absolute bottom-[-10rem] right-[-5rem] h-96 w-96 rounded-full bg-emerald-400/10 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.08fr_0.92fr]">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] backdrop-blur">
              <MapPin className="h-4 w-4 text-orange-400" />
              Plan Your Happy-Park Day
            </div>

            <h1 className="mt-7 max-w-4xl text-5xl font-black leading-[0.94] tracking-[-0.055em] sm:text-6xl lg:text-7xl">
              Come ready
              <span className="block text-orange-400">
                to make memories.
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-8 text-white/65 sm:text-lg">
              Everything you need to start planning a family day at
              Happy-Park — from play and animals to pizza, treats and
              celebrations.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="/book/visit"
                className="inline-flex min-h-12 items-center gap-2 rounded-full bg-orange-500 px-6 text-sm font-black text-white transition hover:bg-orange-600"
              >
                Book a visit
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/attractions"
                className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/15 bg-white/10 px-6 text-sm font-black backdrop-blur"
              >
                Explore attractions
              </Link>
            </div>
          </div>

          <div className="relative mx-auto min-h-[470px] w-full max-w-[520px]">
            <div className="absolute left-[4%] top-[4%] h-[86%] w-[86%] rotate-[-5deg] rounded-[3rem] bg-orange-500" />
            <div className="absolute right-[1%] top-[12%] h-[82%] w-[82%] rotate-[5deg] rounded-[3rem] bg-yellow-300" />

            <div className="absolute inset-[8%] overflow-hidden rounded-[3rem] bg-white p-7 text-slate-950 shadow-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-orange-600">
                    Your Happy Day
                  </p>
                  <p className="mt-1 text-2xl font-black">
                    Family Adventure
                  </p>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100 text-orange-600">
                  <Sparkles className="h-6 w-6" />
                </div>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-3">
                <ExperienceTile
                  icon={<Zap className="h-7 w-7" />}
                  title="Play"
                  copy="Jump & explore"
                />
                <ExperienceTile
                  icon={<PawPrint className="h-7 w-7" />}
                  title="Discover"
                  copy="Animals & nature"
                />
                <ExperienceTile
                  icon={<Pizza className="h-7 w-7" />}
                  title="Eat"
                  copy="Food & treats"
                />
                <ExperienceTile
                  icon={<Heart className="h-7 w-7" />}
                  title="Remember"
                  copy="Family moments"
                />
              </div>

              <div className="mt-6 rounded-[1.5rem] bg-slate-950 p-5 text-white">
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-orange-400" />
                  <div>
                    <p className="text-xs text-white/50">Happy-Park</p>
                    <p className="font-black">
                      Southfield, St Elizabeth
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-orange-600">
              Your day at Happy-Park
            </p>

            <h2 className="mt-3 text-4xl font-black tracking-[-0.04em] sm:text-5xl">
              Easy to plan. Hard to forget.
            </h2>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-500">
              Start with your visit, then make the day your own with
              play, food, animals and plenty of family time.
            </p>
          </div>

          <div className="mt-12 grid gap-4 lg:grid-cols-4">
            {dayJourney.map((item) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.number}
                  className="relative rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-slate-300">
                      {item.number}
                    </span>

                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>

                  <h3 className="mt-8 text-xl font-black">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-500">
                    {item.copy}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-orange-600">
                What&apos;s waiting
              </p>

              <h2 className="mt-3 text-4xl font-black tracking-[-0.04em] sm:text-5xl">
                Find your kind of happy.
              </h2>
            </div>

            <Link
              href="/attractions"
              className="inline-flex items-center gap-2 text-sm font-black text-orange-600"
            >
              See all attractions
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {experienceCards.map((item) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.title}
                  className="group grid overflow-hidden rounded-[2rem] border border-slate-200 bg-[#fbfaf7] sm:grid-cols-[180px_1fr]"
                >
                  <div
                    className={`flex min-h-44 items-center justify-center bg-gradient-to-br ${item.tone}`}
                  >
                    <div className="flex h-24 w-24 items-center justify-center rounded-[2rem] bg-white/90 shadow-xl transition group-hover:rotate-3 group-hover:scale-105">
                      <Icon className="h-12 w-12" />
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-2xl font-black">
                      {item.title}
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-slate-500">
                      {item.copy}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[2.5rem] bg-orange-500 p-8 text-white sm:p-10 lg:p-12">
            <Pizza className="h-10 w-10 text-yellow-200" />

            <p className="mt-8 text-xs font-black uppercase tracking-[0.2em] text-yellow-200">
              When little adventurers get hungry
            </p>

            <h2 className="mt-4 text-4xl font-black tracking-[-0.04em]">
              Take a Happy break.
            </h2>

            <p className="mt-5 max-w-xl text-sm leading-7 text-white/80">
              Happy-Park serves pizza, hot dogs, hamburgers,
              popcorn, snow cones, cotton candy, ice cream and more.
            </p>

            <Link
              href="/food"
              className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-full bg-slate-950 px-6 text-sm font-black text-white"
            >
              Explore food
              <ArrowRight className="h-4 w-4" />
            </Link>

            <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {foodHighlights.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.label}
                    className="rounded-2xl bg-white/10 p-4 backdrop-blur"
                  >
                    <Icon className="h-5 w-5 text-yellow-200" />
                    <p className="mt-3 text-xs font-black">
                      {item.label}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rounded-[2.5rem] bg-emerald-950 p-8 text-white sm:p-10 lg:p-12">
            <Waves className="h-10 w-10 text-emerald-300" />

            <p className="mt-8 text-xs font-black uppercase tracking-[0.2em] text-emerald-300">
              Slow things down
            </p>

            <h2 className="mt-4 text-4xl font-black tracking-[-0.04em]">
              Meet. Discover. Explore.
            </h2>

            <p className="mt-5 text-sm leading-7 text-white/70">
              Between the action, families can enjoy Happy-Park&apos;s
              petting animals, common fowls, guinea chicks and koi
              pond.
            </p>

            <Link
              href="/attractions"
              className="mt-8 inline-flex items-center gap-2 text-sm font-black text-emerald-300"
            >
              Explore the park
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-slate-950 px-5 py-20 text-white sm:px-8 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-5 md:grid-cols-3">
            <VisitTip
              icon={<Shirt className="h-6 w-6" />}
              title="Come ready to play"
              copy="Comfortable clothing and footwear make an active Happy-Park day even better."
            />

            <VisitTip
              icon={<Users className="h-6 w-6" />}
              title="Plan for the family"
              copy="Choose your visit date and guest count before arriving using our online visit experience."
            />

            <VisitTip
              icon={<Clock3 className="h-6 w-6" />}
              title="Check before you go"
              copy="Special experiences such as Movie Night may operate on selected dates."
            />
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-7xl rounded-[2.75rem] bg-gradient-to-br from-yellow-300 via-orange-400 to-orange-500 p-8 sm:p-12 lg:p-16">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto]">
            <div>
              <div className="flex gap-2">
                <Star className="h-5 w-5 fill-slate-950" />
                <Heart className="h-5 w-5 fill-slate-950" />
                <Sparkles className="h-5 w-5" />
              </div>

              <h2 className="mt-5 max-w-3xl text-4xl font-black tracking-[-0.04em] sm:text-5xl">
                Your next Happy-Park memory starts here.
              </h2>

              <p className="mt-5 max-w-2xl text-sm font-medium leading-7 text-slate-800">
                Choose your day, tell us who&apos;s coming and start
                building the family adventure.
              </p>
            </div>

            <Link
              href="/book/visit"
              className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-slate-950 px-7 text-sm font-black text-white shadow-xl"
            >
              Book your visit
              <CalendarDays className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function ExperienceTile({
  icon,
  title,
  copy,
}: {
  icon: React.ReactNode;
  title: string;
  copy: string;
}) {
  return (
    <div className="rounded-2xl bg-[#fbfaf7] p-4">
      <div className="text-orange-500">{icon}</div>
      <p className="mt-4 font-black">{title}</p>
      <p className="mt-1 text-[11px] text-slate-500">{copy}</p>
    </div>
  );
}

function VisitTip({
  icon,
  title,
  copy,
}: {
  icon: React.ReactNode;
  title: string;
  copy: string;
}) {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-orange-400">
        {icon}
      </div>

      <h3 className="mt-5 text-xl font-black">{title}</h3>

      <p className="mt-3 text-sm leading-6 text-white/55">
        {copy}
      </p>
    </div>
  );
}


