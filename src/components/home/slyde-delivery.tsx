import {
  CheckCircle2,
  MapPinned,
  PackageCheck,
  Truck,
} from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";

export function SlydeDelivery() {
  const steps = [
    { title: "Order", icon: PackageCheck },
    { title: "Dispatch", icon: Truck },
    { title: "Track", icon: MapPinned },
    { title: "Delivered", icon: CheckCircle2 },
  ];

  return (
    <section className="hp-section bg-[var(--hp-forest)] text-white">
      <div className="hp-container">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div>
            <div className="inline-flex rounded-full border border-white/15 bg-white/[0.08] px-3 py-2 text-xs font-black uppercase tracking-[0.18em] text-white/70">
              Delivery powered by SLYDE
            </div>

            <h2 className="hp-heading mt-6 text-5xl font-black sm:text-6xl lg:text-7xl">
              Happy delivered.
            </h2>

            <p className="mt-6 max-w-xl text-base leading-8 text-white/65 sm:text-lg">
              Order eligible food and shop products from Happy-Park and follow
              your delivery from dispatch to your door.
            </p>

            <div className="mt-8">
              <ButtonLink href="/track" variant="secondary">
                Track a delivery
              </ButtonLink>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {steps.map(({ title, icon: Icon }, index) => (
              <div
                key={title}
                className="rounded-[26px] border border-white/10 bg-white/[0.07] p-5"
              >
                <div className="text-xs font-bold text-white/35">
                  0{index + 1}
                </div>

                <Icon className="mt-12 h-6 w-6 text-[var(--hp-lime)]" />

                <div className="mt-4 font-bold">
                  {title}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
