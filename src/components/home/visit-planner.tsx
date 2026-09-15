import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  TicketCheck,
} from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";

const steps = [
  {
    title: "Choose your day",
    description: "Select your preferred Happy-Park visit date.",
    icon: CalendarDays,
  },
  {
    title: "Choose your guests",
    description: "Add adults, children and available visit options.",
    icon: TicketCheck,
  },
  {
    title: "Confirm your visit",
    description: "Complete your booking and receive confirmation.",
    icon: CheckCircle2,
  },
];

export function VisitPlanner() {
  return (
    <section className="hp-section bg-[var(--hp-ink)] text-white">
      <div className="hp-container">
        <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-2 text-xs font-black uppercase tracking-[0.18em] text-white/60">
              <Clock3 className="h-3.5 w-3.5" />
              Plan ahead
            </div>

            <h2 className="hp-heading mt-6 text-5xl font-black sm:text-6xl lg:text-7xl">
              Your Happy-Park day.
              <br />
              Planned in minutes.
            </h2>

            <p className="mt-6 max-w-xl text-base leading-8 text-white/60 sm:text-lg">
              Soon you&apos;ll be able to choose your visit date, guests,
              packages and extras online before arriving.
            </p>

            <div className="mt-8">
              <ButtonLink href="/book/visit" variant="secondary">
                Plan your visit
              </ButtonLink>
            </div>
          </div>

          <div className="grid gap-4">
            {steps.map(({ title, description, icon: Icon }, index) => (
              <div
                key={title}
                className="flex items-start gap-5 rounded-[28px] border border-white/10 bg-white/[0.06] p-6 sm:p-7"
              >
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white/10">
                  <Icon className="h-5 w-5 text-[var(--hp-lime)]" />
                </div>

                <div>
                  <div className="text-xs font-black uppercase tracking-[0.18em] text-white/35">
                    Step {index + 1}
                  </div>

                  <div className="mt-2 text-xl font-black">{title}</div>

                  <p className="mt-2 text-sm leading-6 text-white/55">
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

