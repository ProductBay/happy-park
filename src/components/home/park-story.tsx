import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { MediaFrame } from "@/components/shared/media-frame";

const moments = [
  {
    title: "Play",
    eyebrow: "Explore",
    src: "/images/happy-park/experiences/play.png",
    href: "/attractions",
    className: "lg:col-span-2 lg:row-span-2",
  },
  {
    title: "Celebrate",
    eyebrow: "Birthday parties",
    src: "/images/happy-park/experiences/celebrate.png",
    href: "/parties",
    className: "",
  },
  {
    title: "Eat",
    eyebrow: "Happy-Park Kitchen",
    src: "/images/happy-park/experiences/eat.png",
    href: "/food",
    className: "",
  },
  {
    title: "Shop",
    eyebrow: "Natural products",
    src: "/images/happy-park/experiences/shop.png",
    href: "/shop",
    className: "",
  },
  {
    title: "Together",
    eyebrow: "Family days",
    src: "/images/happy-park/experiences/family.png",
    href: "/visit",
    className: "",
  },
];

export function ParkStory() {
  return (
    <section className="hp-section bg-white">
      <div className="hp-container">
        <div className="max-w-4xl">
          <span className="hp-eyebrow">
            The Happy-Park experience
          </span>

          <h2 className="hp-heading mt-6 text-5xl font-black sm:text-6xl lg:text-7xl">
            A whole day of happy,
            <br />
            all in one place.
          </h2>

          <p className="hp-copy mt-6 max-w-2xl text-lg">
            Come to play. Stay for pizza. Celebrate something special.
            Discover something new. Happy-Park brings family experiences
            together differently.
          </p>
        </div>

        <div className="mt-14 grid auto-rows-[280px] gap-4 md:grid-cols-2 lg:grid-cols-4">
          {moments.map((moment) => (
            <Link
              key={moment.title}
              href={moment.href}
              className={`group relative overflow-hidden rounded-[32px] ${moment.className}`}
            >
              <MediaFrame
                src={moment.src}
                alt={`Happy-Park ${moment.title}`}
                className="absolute inset-0 h-full w-full"
                imageClassName="group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent" />

              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6 text-white">
                <div>
                  <div className="text-[11px] font-black uppercase tracking-[0.18em] text-white/60">
                    {moment.eyebrow}
                  </div>

                  <div className="mt-2 text-3xl font-black tracking-[-0.04em]">
                    {moment.title}
                  </div>
                </div>

                <div className="grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-white/10 backdrop-blur-lg transition group-hover:rotate-45 group-hover:bg-white group-hover:text-[var(--hp-ink)]">
                  <ArrowUpRight className="h-5 w-5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}


