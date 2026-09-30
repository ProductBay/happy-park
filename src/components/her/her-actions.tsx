import Link from "next/link";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { createHerWhatsappUrl } from "@/lib/her/whatsapp";

export function HerAction({ href, children, tone = "dark", whatsapp = false, className }: { href: string; children: React.ReactNode; tone?: "dark" | "light" | "gold"; whatsapp?: boolean; className?: string }) {
  const styles = { dark: "bg-[#163d32] text-white hover:bg-[#0c2d25]", light: "border border-[#173d32]/15 bg-white/75 text-[#173d32] hover:bg-white", gold: "bg-[#c6a15b] text-[#18261f] hover:bg-[#d5b674]" };
  return (
    <Link href={whatsapp ? createHerWhatsappUrl() : href} target={whatsapp ? "_blank" : undefined} rel={whatsapp ? "noreferrer" : undefined} className={cn("inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-xs font-black uppercase tracking-[0.12em] transition hover:-translate-y-0.5", styles[tone], className)}>
      {whatsapp ? <MessageCircle className="h-4 w-4" /> : null}{children}<ArrowUpRight className="h-4 w-4" />
    </Link>
  );
}
