import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils/cn";

type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "dark";
  className?: string;
  arrow?: boolean;
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className,
  arrow = true,
}: ButtonLinkProps) {
  const styles = {
    primary:
      "bg-[var(--hp-forest)] !text-white shadow-[0_10px_28px_rgba(22,75,51,0.22)] hover:bg-[var(--hp-forest-deep)] hover:!text-white hover:shadow-[0_14px_34px_rgba(22,75,51,0.28)]",
    secondary:
      "border border-black/10 bg-white/80 text-[var(--hp-ink)] hover:bg-white",
    dark:
      "bg-[var(--hp-ink)] !text-white shadow-[0_10px_28px_rgba(16,39,28,0.18)] hover:bg-black hover:!text-white hover:shadow-[0_14px_34px_rgba(16,39,28,0.24)]",
  };

  return (
    <Link
      href={href}
      className={cn(
        "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-sm font-bold leading-none no-underline transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0",
        styles[variant],
        className
      )}
    >
      {children}
      {arrow ? <ArrowUpRight className="h-4 w-4 shrink-0 text-current" /> : null}
    </Link>
  );
}

