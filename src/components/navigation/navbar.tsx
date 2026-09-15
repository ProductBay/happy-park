"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, ShoppingBag, X } from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils/cn";
import { useHappyParkCart } from "@/lib/cart/cart-provider";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { itemCount, hydrated } = useHappyParkCart();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 z-50 px-3 transition-all duration-300 sm:px-5",
          scrolled ? "top-2" : "top-11"
        )}
      >
        <div className="hp-container">
          <div
            className={cn(
              "flex items-center justify-between border px-4 transition-all duration-300 sm:px-5",
              scrolled
                ? "h-[64px] rounded-[22px] border-white/70 bg-white/92 shadow-[0_16px_50px_rgba(20,39,30,0.12)] backdrop-blur-2xl"
                : "h-[72px] rounded-[24px] border-white/60 bg-white/82 shadow-[0_12px_45px_rgba(20,39,30,0.08)] backdrop-blur-xl"
            )}
          >
            <Link
              href="/"
              aria-label="Happy-Park home"
              className="flex shrink-0 items-center"
            >
              <Image
                src="/images/brand/happy-park-logo.png"
                alt="Happy-Park"
                width={220}
                height={120}
                priority
                className="h-auto w-[118px] object-contain sm:w-[138px] lg:w-[150px]"
              />
            </Link>

            <nav className="hidden items-center gap-1 lg:flex">
              {siteConfig.nav.map((item) => {
                const active =
                  pathname === item.href ||
                  (item.href !== "/" && pathname.startsWith(item.href));

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "rounded-full px-3.5 py-2 text-sm font-semibold transition",
                      active
                        ? "bg-[var(--hp-forest)] text-white"
                        : "text-[var(--hp-ink-soft)] hover:bg-black/[0.04] hover:text-[var(--hp-forest)]"
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-2">
              <Link
                href="/cart"
                aria-label="Shopping cart"
                className="relative hidden h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white transition hover:bg-black/[0.03] sm:flex"
              >
                <ShoppingBag className="h-[18px] w-[18px]" />

                {hydrated && itemCount > 0 ? (
                  <span className="absolute -right-1.5 -top-1.5 grid min-h-5 min-w-5 place-items-center rounded-full bg-[var(--hp-forest)] px-1 text-[10px] font-black leading-none !text-white shadow-md">
                    {itemCount > 99 ? "99+" : itemCount}
                  </span>
                ) : null}
              </Link>

              <Link
                href="/book/visit"
                className="hidden min-h-11 items-center justify-center rounded-full bg-[var(--hp-forest)] px-5 text-sm font-bold text-white shadow-lg shadow-green-950/15 transition hover:-translate-y-0.5 hover:bg-[var(--hp-forest-deep)] sm:flex"
              >
                Plan your visit
              </Link>

              <button
                type="button"
                aria-label="Open navigation"
                onClick={() => setOpen(true)}
                className="grid h-11 w-11 place-items-center rounded-full border border-black/10 bg-white lg:hidden"
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {open ? (
        <div className="fixed inset-0 z-[100] overflow-y-auto bg-[var(--hp-paper)] p-4 lg:hidden">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              aria-label="Happy-Park home"
              onClick={() => setOpen(false)}
              className="flex items-center"
            >
              <Image
                src="/images/brand/happy-park-logo.png"
                alt="Happy-Park"
                width={220}
                height={120}
                priority
                className="h-auto w-[145px] object-contain"
              />
            </Link>

            <button
              type="button"
              aria-label="Close navigation"
              onClick={() => setOpen(false)}
              className="grid h-11 w-11 place-items-center rounded-full border border-black/10 bg-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="mt-16 flex flex-col">
            {siteConfig.nav.map((item) => {
              const active =
                pathname === item.href ||
                (item.href !== "/" && pathname.startsWith(item.href));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "border-b border-black/[0.07] py-5 text-3xl font-black tracking-[-0.04em]",
                    active && "text-[var(--hp-forest)]"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-10 grid gap-3">
            <Link
              href="/book/visit"
              className="flex min-h-14 items-center justify-center rounded-full bg-[var(--hp-forest)] px-6 font-bold text-white"
            >
              Plan your visit
            </Link>

            <Link
              href="/cart"
              className="flex min-h-14 items-center justify-center rounded-full border border-black/10 bg-white px-6 font-bold"
            >
              {hydrated && itemCount > 0
                ? `View cart · ${itemCount} ${itemCount === 1 ? "item" : "items"}`
                : "View cart"}
            </Link>
          </div>
        </div>
      ) : null}
    </>
  );
}



