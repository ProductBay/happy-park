import Link from "next/link";
import {
  ArrowUpRight,
  Camera,
  MapPin,
  MessageCircle,
} from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[var(--hp-ink)] text-white">
      <div className="hp-container py-14 lg:py-20">
        <div className="grid gap-12 border-b border-white/10 pb-12 lg:grid-cols-[1.4fr_0.6fr_0.6fr]">
          <div>
            <div className="text-4xl font-black tracking-[-0.055em] sm:text-5xl">
              Happy-Park
            </div>

            <p className="mt-5 max-w-lg text-base leading-8 text-white/65">
              Play, celebrate, eat, shop and enjoy — all in one family
              destination in Southfield, St. Elizabeth.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/visit"
                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-[var(--hp-ink)]"
              >
                Plan your visit
                <ArrowUpRight className="h-4 w-4" />
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-bold"
              >
                Contact us
              </Link>
            </div>
          </div>

          <div>
            <div className="text-sm font-bold uppercase tracking-[0.16em] text-white/45">
              Explore
            </div>

            <div className="mt-5 grid gap-3 text-sm text-white/75">
              <Link href="/attractions">Attractions</Link>
              <Link href="/parties">Birthday parties</Link>
              <Link href="/food">Food & pizza</Link>
              <Link href="/schools">School partners</Link>
              <Link href="/shop">Natural shop</Link>
              <Link href="/track">Track delivery</Link>
            </div>
          </div>

          <div>
            <div className="text-sm font-bold uppercase tracking-[0.16em] text-white/45">
              Connect
            </div>

            <div className="mt-5 grid gap-4 text-sm text-white/75">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                <span>Southfield, St. Elizabeth, Jamaica</span>
              </div>

              <div className="flex items-center gap-3">
                <MessageCircle className="h-4 w-4" />
                <span>WhatsApp</span>
              </div>

              <div className="flex items-center gap-3">
                <Camera className="h-4 w-4" />
                <span>Instagram</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-7 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Happy-Park. All rights reserved.
          </p>

          <p>
            Digital experience by A&apos;Dash Technologies Group
          </p>
        </div>
      </div>
    </footer>
  );
}

