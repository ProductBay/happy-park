import { CakeSlice, CalendarDays, Users } from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";

export function PartyFeature() {
  return (
    <section className="hp-section bg-[#f8d8cd]">
      <div className="hp-container">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="hp-eyebrow">
              <CakeSlice className="h-3.5 w-3.5" />
              Happy-Park Parties
            </span>

            <h2 className="hp-heading mt-5 text-5xl font-black sm:text-6xl lg:text-7xl">
              Their big day.
              <br />
              Made happier.
            </h2>

            <p className="hp-copy mt-6 max-w-xl text-lg">
              Plan an unforgettable Happy-Park birthday with play, food,
              celebration extras and a booking experience designed to make
              things easier for parents.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/book/party">
                Book a party
              </ButtonLink>

              <ButtonLink href="/parties" variant="secondary">
                View party options
              </ButtonLink>
            </div>
          </div>

          <div className="rounded-[36px] bg-[var(--hp-ink)] p-6 text-white shadow-[0_35px_90px_rgba(20,39,30,0.18)] sm:p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[26px] bg-white/[0.08] p-6">
                <CalendarDays className="h-6 w-6 text-[var(--hp-lime)]" />
                <div className="mt-12 text-2xl font-black">
                  Pick your date
                </div>
                <p className="mt-2 text-sm leading-6 text-white/55">
                  Choose an available day and party time.
                </p>
              </div>

              <div className="rounded-[26px] bg-white/[0.08] p-6">
                <Users className="h-6 w-6 text-[var(--hp-sun)]" />
                <div className="mt-12 text-2xl font-black">
                  Build your party
                </div>
                <p className="mt-2 text-sm leading-6 text-white/55">
                  Guests, food and celebration extras in one flow.
                </p>
              </div>

              <div className="rounded-[26px] bg-white/[0.08] p-6 sm:col-span-2">
                <div className="text-xs font-bold uppercase tracking-[0.17em] text-white/40">
                  Coming together
                </div>

                <div className="mt-4 text-3xl font-black tracking-[-0.04em]">
                  One booking. One celebration. Less stress.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
