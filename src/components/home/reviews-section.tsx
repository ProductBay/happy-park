import { Star } from "lucide-react";
import { SectionHeader } from "@/components/shared/section-header";

const reviews = [
  {
    quote:
      "A fun family destination with something for the children and a relaxing atmosphere for parents.",
    name: "Happy-Park Guest",
  },
  {
    quote:
      "Perfect for family days and birthday celebrations. The kids always enjoy themselves.",
    name: "Happy-Park Guest",
  },
  {
    quote:
      "A great Southfield spot for play, food and family time all in one place.",
    name: "Happy-Park Guest",
  },
];

export function ReviewsSection() {
  return (
    <section className="hp-section bg-[var(--hp-cream)]">
      <div className="hp-container">
        <SectionHeader
          eyebrow="Happy moments"
          title="Made for families."
          description="Happy-Park is being built around the moments families remember — play, birthdays, food and time together."
          align="center"
        />

        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {reviews.map((review) => (
            <article
              key={review.quote}
              className="rounded-[30px] border border-black/[0.06] bg-white p-7 shadow-[0_20px_60px_rgba(20,39,30,0.05)]"
            >
              <div className="flex gap-1 text-[var(--hp-sun)]">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    className="h-4 w-4 fill-current"
                  />
                ))}
              </div>

              <blockquote className="mt-7 text-xl font-bold leading-8 tracking-[-0.025em]">
                “{review.quote}”
              </blockquote>

              <div className="mt-8 text-sm font-black text-[var(--hp-forest)]">
                {review.name}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
