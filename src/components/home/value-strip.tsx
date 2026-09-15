import {
  CakeSlice,
  MapPinned,
  Pizza,
  Sparkles,
  Truck,
} from "lucide-react";

const items = [
  { label: "Family fun", icon: Sparkles },
  { label: "Birthday parties", icon: CakeSlice },
  { label: "Pizza & food", icon: Pizza },
  { label: "Southfield", icon: MapPinned },
  { label: "SLYDE delivery", icon: Truck },
];

export function ValueStrip() {
  return (
    <section className="border-y border-black/[0.06] bg-white">
      <div className="hp-container overflow-hidden">
        <div className="grid grid-cols-2 divide-x divide-y divide-black/[0.06] sm:grid-cols-3 lg:grid-cols-5 lg:divide-y-0">
          {items.map(({ label, icon: Icon }) => (
            <div
              key={label}
              className="flex min-h-24 items-center justify-center gap-3 px-4 text-center"
            >
              <Icon className="h-4 w-4 shrink-0 text-[var(--hp-forest)]" />

              <span className="text-xs font-black uppercase tracking-[0.12em] text-[var(--hp-ink-soft)]">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
