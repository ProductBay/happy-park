import { Clock3, MapPin } from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";

export function VisitCta() {
  return (
    <section className="hp-section">
      <div className="hp-container">
        <div className="overflow-hidden rounded-[40px] bg-[var(--hp-cream)] p-7 sm:p-10 lg:p-14">
          <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div>
              <span className="hp-eyebrow">
                <MapPin className="h-3.5 w-3.5" />
                Southfield, St. Elizabeth
              </span>

              <h2 className="hp-heading mt-5 max-w-3xl text-5xl font-black sm:text-6xl lg:text-7xl">
                Your next happy day starts here.
              </h2>

              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink href="/visit">
                  Plan your visit
                </ButtonLink>

                <ButtonLink href="/contact" variant="secondary">
                  Contact Happy-Park
                </ButtonLink>
              </div>
            </div>

            <div className="rounded-[28px] bg-white p-6 shadow-[0_20px_60px_rgba(20,39,30,0.06)]">
              <div className="flex items-start gap-4 border-b border-black/[0.07] pb-5">
                <MapPin className="mt-0.5 h-5 w-5 text-[var(--hp-forest)]" />
                <div>
                  <div className="font-black">Happy-Park</div>
                  <p className="mt-1 text-sm leading-6 text-[var(--hp-ink-soft)]">
                    Southfield, St. Elizabeth, Jamaica
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 pt-5">
                <Clock3 className="mt-0.5 h-5 w-5 text-[var(--hp-forest)]" />
                <div>
                  <div className="font-black">Opening hours</div>
                  <p className="mt-1 text-sm leading-6 text-[var(--hp-ink-soft)]">
                    Official operating hours will appear here.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
