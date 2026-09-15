"use client";

import Link from "next/link";
import { MessageCircle } from "lucide-react";

export function FloatingWhatsapp() {
  return (
    <Link
      href="/contact"
      aria-label="Contact Happy-Park"
      className="fixed bottom-20 right-4 z-40 flex h-14 items-center gap-3 rounded-full bg-[var(--hp-forest)] px-4 text-sm font-black text-white shadow-[0_18px_45px_rgba(20,39,30,0.26)] transition hover:-translate-y-1 hover:bg-[var(--hp-forest-deep)] sm:bottom-32 sm:right-6 lg:bottom-36"
    >
      <MessageCircle className="h-5 w-5" />
      <span className="hidden sm:inline">Chat with us</span>
    </Link>
  );
}



