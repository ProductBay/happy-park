import {
  ArrowUpRight,
  CakeSlice,
  Leaf,
  Pizza,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { SectionHeader } from "@/components/shared/section-header";

const experiences = [
  {
    eyebrow: "Play",
    title: "Big smiles. Real family time.",
    description:
      "A playful family destination created for children to move, explore, laugh and make memories.",
    href: "/attractions",
    image: "/images/happy-park/experiences/play.png",
    icon: Sparkles,
    accent: "bg-[#a7d75b] text-[#10271c]",
  },
  {
    eyebrow: "Celebrate",
    title: "Birthday moments made easy.",
    description:
      "Choose your party experience, invite the crew and let Happy-Park help bring the celebration together.",
    href: "/parties",
    image: "/images/happy-park/experiences/celebrate.png",
    icon: CakeSlice,
    accent: "bg-[#ed3f3f] text-white",
  },
  {
    eyebrow: "Eat",
    title: "Pizza worth playing for.",
    description:
      "Fresh Happy-Park favourites for family lunch, celebrations, pickup and convenient delivery.",
    href: "/food",
    image: "/images/happy-park/experiences/eat.png",
    icon: Pizza,
    accent: "bg-[#ffd633] text-[#10271c]",
  },
  {
    eyebrow: "Shop",
    title: "Natural products, close to home.",
    description:
      "Browse Happy-Park's selection of herbal and natural products online and order with ease.",
    href: "/shop",
    image: "/images/happy-park/experiences/shop.png",
    icon: Leaf,
    accent: "bg-[#2588e8] text-white",
  },
];

export function ExperienceGrid() {
  return (
    <section className="hp-section bg-[#f7f8f4]">
      <div className="hp-container">
        <SectionHeader
          eyebrow="One happy place"
          title="More than a park."
          description="Happy-Park brings entertainment, celebrations, food and shopping together in one connected family experience."
        />

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {experiences.map(
            ({
              eyebrow,
              title,
              description,
              href,
              image,
              icon: Icon,
              accent,
            }) => (
              <Link
                key={title}
                href={href}
                className="group relative min-h-[440px] overflow-hidden rounded-[34px] bg-[#10271c] shadow-[0_20px_60px_rgba(16,39,28,0.12)]"
              >
                <Image
                  src={image}
                  alt={`Happy-Park ${eyebrow} experience`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition duration-700 ease-out group-hover:scale-[1.04]"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#071a11]/95 via-[#10271c]/30 to-black/5" />

                <div className="absolute inset-0 flex flex-col justify-between p-7 sm:p-9">
                  <div className="flex items-start justify-between">
                    <div
                      className={`grid h-13 w-13 place-items-center rounded-2xl shadow-lg ${accent}`}
                    >
                      <Icon className="h-6 w-6" />
                    </div>

                    <div className="grid h-11 w-11 place-items-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-xl transition duration-300 group-hover:rotate-45 group-hover:bg-white group-hover:text-[#10271c]">
                      <ArrowUpRight className="h-5 w-5" />
                    </div>
                  </div>

                  <div>
                    <div className="text-xs font-black uppercase tracking-[0.17em] text-[#c9f27c]">
                      {eyebrow}
                    </div>

                    <h3 className="mt-3 max-w-xl text-3xl font-black tracking-[-0.045em] text-white sm:text-4xl">
                      {title}
                    </h3>

                    <p className="mt-4 max-w-xl leading-7 text-white/72">
                      {description}
                    </p>
                  </div>
                </div>
              </Link>
            ),
          )}
        </div>
      </div>
    </section>
  );
}

