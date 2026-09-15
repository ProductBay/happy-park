import Link from "next/link";
import {
  ArrowUpRight,
  Baby,
  CakeSlice,
  Gamepad2,
  Sparkles,
} from "lucide-react";
import { SectionHeader } from "@/components/shared/section-header";

const attractions = [
  {
    title: "Play Zones",
    description:
      "Safe, energetic spaces designed for children to explore, move and enjoy themselves.",
    icon: Gamepad2,
    tone: "from-[#dff0b9] to-[#eef8d8]",
  },
  {
    title: "Little Adventurers",
    description:
      "Fun experiences created for younger children and family time together.",
    icon: Baby,
    tone: "from-[#ccecf1] to-[#e9f7f9]",
  },
  {
    title: "Birthday Moments",
    description:
      "Celebrate birthdays with play, food and memorable Happy-Park experiences.",
    icon: CakeSlice,
    tone: "from-[#f8d6ca] to-[#fcebe5]",
  },
  {
    title: "Family Fun",
    description:
      "A destination built for parents, children and families to enjoy together.",
    icon: Sparkles,
    tone: "from-[#f7e1af] to-[#fff4d8]",
  },
];

export function AttractionsShowcase() {
  return (
    <section className="hp-section bg-white">
      <div className="hp-container">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader
            eyebrow="Explore Happy-Park"
            title="Every visit has something to smile about."
            description="Discover fun spaces, family moments and celebration experiences designed to make every Happy-Park visit memorable."
          />

          <Link
            href="/attractions"
            className="inline-flex items-center gap-2 text-sm font-black text-[var(--hp-forest)]"
          >
            View all attractions
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {attractions.map(({ title, description, icon: Icon, tone }) => (
            <Link
              key={title}
              href="/attractions"
              className={`group min-h-[340px] rounded-[32px] border border-black/[0.06] bg-gradient-to-br ${tone} p-7 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_30px_80px_rgba(20,39,30,0.12)]`}
            >
              <div className="flex h-full flex-col justify-between">
                <div className="flex items-start justify-between">
                  <div className="grid h-14 w-14 place-items-center rounded-2xl bg-white/70">
                    <Icon className="h-7 w-7 text-[var(--hp-forest)]" />
                  </div>

                  <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:rotate-45" />
                </div>

                <div>
                  <h3 className="text-2xl font-black tracking-[-0.04em]">
                    {title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-[var(--hp-ink-soft)]">
                    {description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
