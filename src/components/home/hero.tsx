import {
  ArrowDown,
  MapPin,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import { ButtonLink } from "@/components/ui/button-link";

export function Hero() {
  return (
    <section className="relative min-h-[92svh] overflow-hidden bg-[#10271c] lg:min-h-screen">
      <Image
        src="/images/happy-park/hero/hero-family-park.png"
        alt="Family enjoying a day at Happy-Park"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[68%_center] transition-transform duration-[1800ms] ease-out"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-[#0b2117]/95 via-[#10271c]/70 via-48% to-[#10271c]/5" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#081a12]/80 via-transparent to-[#0b2117]/25" />

      <div className="absolute left-[8%] top-[18%] h-3 w-3 rounded-full bg-[#ffd633] shadow-[0_0_35px_rgba(255,214,51,0.7)]" />
      <div className="absolute right-[8%] top-[24%] h-3 w-3 rounded-full bg-[#2588e8] shadow-[0_0_35px_rgba(37,136,232,0.65)]" />
      <div className="absolute right-[13%] top-[15%] h-2.5 w-2.5 rounded-full bg-[#ed3f3f] shadow-[0_0_30px_rgba(237,63,63,0.6)]" />

      <div className="hp-container relative z-10 flex min-h-[92svh] items-end pb-14 pt-36 sm:pb-20 lg:min-h-screen lg:items-center lg:pb-0">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-white shadow-lg backdrop-blur-xl">
            <Sparkles className="h-3.5 w-3.5 text-[var(--hp-lime)]" />
            Southfield&apos;s family destination
          </div>

          <h1 className="mt-7 text-[clamp(4rem,11vw,9rem)] font-black leading-[0.82] tracking-[-0.07em] text-white drop-shadow-[0_8px_35px_rgba(0,0,0,0.25)]">
            Play.
            <br />
            Eat. Shop.
            <br />
            <span className="text-[var(--hp-lime)]">
              Enjoy.
            </span>
          </h1>

          <p className="mt-8 max-w-2xl text-base font-medium leading-8 text-white/80 sm:text-xl">
            Family fun, unforgettable celebrations, delicious food and
            convenient shopping — together in one Happy-Park experience.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink
              href="/book/visit"
              className="bg-[var(--hp-lime)] !text-[var(--hp-ink)] shadow-xl hover:bg-white"
            >
              Plan your visit
            </ButtonLink>

            <ButtonLink
              href="/attractions"
              variant="secondary"
              className="border-white/20 bg-white/10 text-white backdrop-blur-xl hover:bg-white hover:text-[var(--hp-ink)]"
            >
              Explore Happy-Park
            </ButtonLink>
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-5 text-sm font-semibold text-white/65">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-[var(--hp-lime)]" />
              Southfield, St. Elizabeth
            </div>

            <div className="hidden h-1 w-1 rounded-full bg-white/35 sm:block" />

            <div>Jamaica</div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 right-8 hidden items-center gap-3 text-xs font-black uppercase tracking-[0.16em] text-white/60 lg:flex">
        Scroll to explore
        <span className="grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-white/5 backdrop-blur-md">
          <ArrowDown className="h-4 w-4" />
        </span>
      </div>
    </section>
  );
}

