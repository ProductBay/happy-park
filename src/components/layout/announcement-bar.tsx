import { Sparkles } from "lucide-react";

export function AnnouncementBar() {
  return (
    <div className="relative z-[60] bg-[var(--hp-forest-deep)] text-white">
      <div className="hp-container flex min-h-9 items-center justify-center gap-2 py-2 text-center text-[11px] font-bold uppercase tracking-[0.16em] text-white/75 sm:text-xs">
        <Sparkles className="h-3.5 w-3.5 text-[var(--hp-lime)]" />
        Family fun · Parties · Pizza · Natural products · Local delivery
      </div>
    </div>
  );
}
