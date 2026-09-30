"use client";

import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { usePathname } from "next/navigation";
import { createHerWhatsappUrl } from "@/lib/her/whatsapp";

export function FloatingWhatsapp() {
  const pathname = usePathname();
  const isHer = pathname === "/her" || pathname.startsWith("/her/");

  return (
    <Link
      href={isHer ? createHerWhatsappUrl() : "/contact"}
      target={isHer ? "_blank" : undefined}
      rel={isHer ? "noreferrer" : undefined}
      aria-label={isHer ? "Chat with HER on WhatsApp" : "Contact Happy-Park"}
      title={isHer ? "Chat with HER on WhatsApp" : "Contact Happy-Park"}
      className={isHer ? "fixed bottom-5 left-4 z-40 grid h-12 w-12 place-items-center rounded-full border border-[#dfc48d]/25 bg-[#173d32] text-white shadow-[0_18px_45px_rgba(20,39,30,0.3)] transition hover:-translate-y-1 focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-[#dfc48d] sm:bottom-6 sm:left-6 sm:h-14 sm:w-14" : "fixed bottom-5 left-4 z-40 grid h-12 w-12 place-items-center rounded-full bg-[var(--hp-forest)] text-white shadow-[0_18px_45px_rgba(20,39,30,0.26)] transition hover:-translate-y-1 hover:bg-[var(--hp-forest-deep)] focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-orange-400 sm:bottom-6 sm:left-6 sm:h-14 sm:w-14"}
    >
      <MessageCircle className="h-5 w-5" />
    </Link>
  );
}



