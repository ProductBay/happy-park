import { Leaf, Pizza } from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";
import { MediaFrame } from "@/components/shared/media-frame";

export function CommerceFeature() {
  return (
    <section className="hp-section bg-white">
      <div className="hp-container">
        <div className="grid gap-5 lg:grid-cols-2">

          <article className="overflow-hidden rounded-[36px] bg-[#f4cd83]">
            <MediaFrame
              src="/images/happy-park/experiences/eat.png"
              alt="Happy-Park pizza and food"
              className="h-[360px] sm:h-[440px]"
            />

            <div className="p-8 sm:p-10">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.17em]">
                <Pizza className="h-4 w-4" />
                Happy-Park Kitchen
              </div>

              <h2 className="hp-heading mt-5 text-5xl font-black sm:text-6xl">
                Play hard.
                <br />
                Eat happy.
              </h2>

              <p className="mt-5 max-w-lg leading-7 text-[var(--hp-ink-soft)]">
                Fresh pizza, family favourites, drinks and sides for park
                days, celebrations, pickup and delivery.
              </p>

              <div className="mt-7">
                <ButtonLink href="/food" variant="dark">
                  Explore the menu
                </ButtonLink>
              </div>
            </div>
          </article>

          <article className="overflow-hidden rounded-[36px] bg-[#cee8d5]">
            <MediaFrame
              src="/images/happy-park/experiences/shop.png"
              alt="Happy-Park natural and herbal products"
              className="h-[360px] sm:h-[440px]"
            />

            <div className="p-8 sm:p-10">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.17em] text-[var(--hp-forest)]">
                <Leaf className="h-4 w-4" />
                Happy-Park Natural Shop
              </div>

              <h2 className="hp-heading mt-5 text-5xl font-black sm:text-6xl">
                Natural choices.
                <br />
                Simple shopping.
              </h2>

              <p className="mt-5 max-w-lg leading-7 text-[var(--hp-ink-soft)]">
                Browse herbal and natural products with transparent product
                information, online ordering and local delivery.
              </p>

              <div className="mt-7">
                <ButtonLink href="/shop">
                  Shop products
                </ButtonLink>
              </div>
            </div>
          </article>

        </div>
      </div>
    </section>
  );
}


