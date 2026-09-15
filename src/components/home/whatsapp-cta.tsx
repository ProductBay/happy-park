import { MessageCircle } from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";

export function WhatsappCta() {
  return (
    <section className="pb-20 pt-4 lg:pb-28">
      <div className="hp-container">
        <div className="relative overflow-hidden rounded-[40px] bg-[#dff0b9] p-8 sm:p-10 lg:p-14">
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/30" />

          <div className="relative z-10 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-[var(--hp-forest)]">
                <MessageCircle className="h-4 w-4" />
                Need help?
              </div>

              <h2 className="hp-heading mt-4 max-w-3xl text-4xl font-black sm:text-5xl lg:text-6xl">
                Talk to Happy-Park.
              </h2>

              <p className="hp-copy mt-5 max-w-2xl">
                Questions about visits, parties, food or products? Contact the
                Happy-Park team directly.
              </p>
            </div>

            <ButtonLink href="/contact" variant="dark">
              Contact us
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
