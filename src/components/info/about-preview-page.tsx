import Link from "next/link";
import {
  ArrowRight,
  Baby,
  Heart,
  Leaf,
  MapPin,
  PawPrint,
  Pizza,
  Sparkles,
  Users,
} from "lucide-react";

export function AboutPreviewPage() {
  return (
    <main className="overflow-hidden bg-[#fffaf4] text-slate-950">
      <section className="relative overflow-hidden bg-slate-950 px-5 pb-24 pt-32 text-white sm:px-8 lg:px-12 lg:pb-32 lg:pt-40">
        <div className="absolute -left-24 top-20 h-80 w-80 rounded-full bg-orange-500/20 blur-3xl" />
        <div className="absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-yellow-300/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em]">
              <Heart className="h-4 w-4 text-orange-400" />
              Our Happy Place
            </div>

            <h1 className="mt-7 text-5xl font-black leading-[0.94] tracking-[-0.055em] sm:text-6xl lg:text-8xl">
              Built around
              <span className="block text-orange-400">
                happy memories.
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-8 text-white/65 sm:text-lg">
              Happy-Park brings play, animals, nature, food and
              family moments together in Southfield, St Elizabeth.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="/visit"
                className="inline-flex min-h-12 items-center gap-2 rounded-full bg-orange-500 px-6 text-sm font-black"
              >
                Plan your visit
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/attractions"
                className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/15 bg-white/10 px-6 text-sm font-black"
              >
                Explore the park
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-orange-600">
              What Happy-Park is about
            </p>

            <h2 className="mt-4 text-4xl font-black tracking-[-0.04em] sm:text-5xl">
              More ways for families to be together.
            </h2>

            <p className="mt-6 text-sm leading-8 text-slate-600">
              Happy-Park is a family destination where children can
              jump, slide, swing, ride and explore while families
              enjoy time together away from the everyday routine.
            </p>

            <p className="mt-4 text-sm leading-8 text-slate-600">
              The experience extends beyond play with animals,
              birds, a koi pond, Movie Night, food favourites and
              special celebrations.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <StoryTile
              icon={<Sparkles className="h-8 w-8" />}
              title="Play"
              copy="Trampolines, slides, swings and riding toys."
              className="bg-orange-200"
            />
            <StoryTile
              icon={<PawPrint className="h-8 w-8" />}
              title="Discover"
              copy="Animals, birds, guinea chicks and koi."
              className="bg-emerald-200"
            />
            <StoryTile
              icon={<Pizza className="h-8 w-8" />}
              title="Eat"
              copy="Pizza, burgers, hot dogs and park treats."
              className="bg-yellow-200"
            />
            <StoryTile
              icon={<Heart className="h-8 w-8" />}
              title="Celebrate"
              copy="Birthdays and memorable family moments."
              className="bg-pink-200"
            />
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-5 md:grid-cols-3">
            <ValueCard
              icon={<Users className="h-6 w-6" />}
              title="Family first"
              copy="Happy-Park is built around experiences families can enjoy together."
            />
            <ValueCard
              icon={<Baby className="h-6 w-6" />}
              title="Made for childhood"
              copy="Room to move, explore, discover and make the kind of memories children carry with them."
            />
            <ValueCard
              icon={<Leaf className="h-6 w-6" />}
              title="Play meets nature"
              copy="High-energy activities sit alongside animals and quieter nature experiences."
            />
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-7xl rounded-[2.75rem] bg-orange-500 p-8 text-white sm:p-12 lg:p-16">
          <MapPin className="h-8 w-8 text-yellow-200" />

          <p className="mt-7 text-xs font-black uppercase tracking-[0.2em] text-yellow-200">
            Our home
          </p>

          <h2 className="mt-4 text-4xl font-black tracking-[-0.04em] sm:text-5xl">
            Southfield, St Elizabeth.
          </h2>

          <p className="mt-5 max-w-2xl text-sm leading-7 text-white/80">
            Come spend a Happy-Park day with the family in
            Southfield and discover a destination made for play,
            food, exploration and together time.
          </p>

          <Link
            href="/visit"
            className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-full bg-slate-950 px-6 text-sm font-black"
          >
            Plan your Happy day
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}

function StoryTile({
  icon,
  title,
  copy,
  className,
}: {
  icon: React.ReactNode;
  title: string;
  copy: string;
  className: string;
}) {
  return (
    <div className={`rounded-[2rem] p-6 ${className}`}>
      {icon}
      <h3 className="mt-8 text-2xl font-black">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">
        {copy}
      </p>
    </div>
  );
}

function ValueCard({
  icon,
  title,
  copy,
}: {
  icon: React.ReactNode;
  title: string;
  copy: string;
}) {
  return (
    <div className="rounded-[2rem] border border-slate-200 bg-[#fffaf4] p-7">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100 text-orange-600">
        {icon}
      </div>

      <h3 className="mt-6 text-xl font-black">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-slate-500">
        {copy}
      </p>
    </div>
  );
}
