"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Clock3,
  Leaf,
  Minus,
  PackageCheck,
  Pizza,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Trash2,
  Truck,
} from "lucide-react";
import { useState } from "react";
import { useHappyParkCart, type HappyParkCartItem } from "@/lib/cart/cart-provider";

const formatJmd = (value: number) =>
  new Intl.NumberFormat("en-JM", {
    style: "currency",
    currency: "JMD",
    maximumFractionDigits: 0,
  }).format(value);

export function ShoppingCartPreview() {
  const {
    items,
    itemCount,
    subtotal,
    hydrated,
    incrementItem,
    decrementItem,
    removeItem,
  } = useHappyParkCart();

  const [fulfillment, setFulfillment] = useState<"pickup" | "delivery">(
    "pickup"
  );

  const kitchenItems = items.filter((item) => item.category === "kitchen");
  const shopItems = items.filter((item) => item.category === "shop");

  return (
    <main className="min-h-screen bg-[var(--hp-paper)] pb-24 pt-36 sm:pt-40">
      <div className="hp-container">
        <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Link
              href="/"
              className="mb-5 inline-flex items-center gap-2 text-sm font-bold text-[var(--hp-forest)] transition hover:gap-3"
            >
              <ArrowLeft className="h-4 w-4" />
              Continue exploring
            </Link>

            <div className="mb-4 flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-[var(--hp-forest)]">
              <ShoppingBag className="h-4 w-4" />
              Happy-Park Cart
            </div>

            <h1 className="hp-heading max-w-3xl text-5xl font-black sm:text-6xl lg:text-7xl">
              Everything happy.
              <br />
              <span className="text-[var(--hp-forest)]">One cart.</span>
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-[var(--hp-ink-soft)] sm:text-lg">
              Food, treats and eligible Happy-Park shop products come
              together in one simple checkout experience.
            </p>
          </div>

          <div className="inline-flex w-fit items-center gap-3 rounded-full border border-black/[0.07] bg-white px-5 py-3 shadow-sm">
            <ShoppingBag className="h-4 w-4 text-[var(--hp-forest)]" />
            <span className="text-sm font-black">
              {itemCount} {itemCount === 1 ? "item" : "items"}
            </span>
          </div>
        </div>

        {!hydrated ? (
          <section className="rounded-[32px] border border-black/[0.06] bg-white p-10 text-center shadow-sm">
            <div className="mx-auto h-8 w-8 animate-pulse rounded-full bg-[var(--hp-forest)]/15" />
            <p className="mt-4 text-sm font-bold text-[var(--hp-ink-soft)]">
              Loading your cart...
            </p>
          </section>
        ) : items.length > 0 ? (
          <div className="grid gap-8 xl:grid-cols-[1fr_390px] xl:items-start">
            <div className="space-y-6">
              {kitchenItems.length > 0 ? (
                <CartGroup
                  title="Happy-Park Kitchen"
                  subtitle="Fresh food prepared for your order."
                  icon={<Pizza className="h-5 w-5" />}
                  items={kitchenItems}
                  onIncrease={incrementItem}
                  onDecrease={decrementItem}
                  onRemove={removeItem}
                />
              ) : null}

              {shopItems.length > 0 ? (
                <CartGroup
                  title="Natural Shop"
                  subtitle="Natural and herbal shop products."
                  icon={<Leaf className="h-5 w-5" />}
                  items={shopItems}
                  onIncrease={incrementItem}
                  onDecrease={decrementItem}
                  onRemove={removeItem}
                />
              ) : null}

              <section className="rounded-[32px] border border-black/[0.06] bg-white p-6 shadow-[0_18px_60px_rgba(20,39,30,0.05)] sm:p-8">
                <div className="mb-6">
                  <div className="text-xs font-black uppercase tracking-[0.18em] text-[var(--hp-forest)]">
                    Fulfillment
                  </div>
                  <h2 className="mt-2 text-2xl font-black tracking-[-0.035em]">
                    How would you like your order?
                  </h2>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={() => setFulfillment("pickup")}
                    className={`relative rounded-[26px] border p-5 text-left transition-all ${
                      fulfillment === "pickup"
                        ? "border-[var(--hp-forest)] bg-[var(--hp-forest)] !text-white shadow-[0_12px_30px_rgba(22,75,51,0.18)]"
                        : "border-black/[0.08] bg-[var(--hp-paper)] text-[var(--hp-ink)] hover:border-black/15"
                    }`}
                  >
                    {fulfillment === "pickup" ? (
                      <span className="absolute right-4 top-4 grid h-7 w-7 place-items-center rounded-full bg-white text-[var(--hp-forest)]">
                        <Check className="h-4 w-4" />
                      </span>
                    ) : null}

                    <PackageCheck className="mb-5 h-6 w-6" />
                    <div className="font-black">Pickup at Happy-Park</div>
                    <div
                      className={`mt-2 text-sm leading-6 ${
                        fulfillment === "pickup"
                          ? "text-white/70"
                          : "text-[var(--hp-ink-soft)]"
                      }`}
                    >
                      We&apos;ll prepare your order for collection.
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFulfillment("delivery")}
                    className={`relative rounded-[26px] border p-5 text-left transition-all ${
                      fulfillment === "delivery"
                        ? "border-[var(--hp-forest)] bg-[var(--hp-forest)] !text-white shadow-[0_12px_30px_rgba(22,75,51,0.18)]"
                        : "border-black/[0.08] bg-[var(--hp-paper)] text-[var(--hp-ink)] hover:border-black/15"
                    }`}
                  >
                    {fulfillment === "delivery" ? (
                      <span className="absolute right-4 top-4 grid h-7 w-7 place-items-center rounded-full bg-white text-[var(--hp-forest)]">
                        <Check className="h-4 w-4" />
                      </span>
                    ) : null}

                    <Truck className="mb-5 h-6 w-6" />
                    <div className="font-black">SLYDE delivery</div>
                    <div
                      className={`mt-2 text-sm leading-6 ${
                        fulfillment === "delivery"
                          ? "text-white/70"
                          : "text-[var(--hp-ink-soft)]"
                      }`}
                    >
                      Delivery quote and availability confirmed at checkout.
                    </div>
                  </button>
                </div>
              </section>
            </div>

            <aside className="xl:sticky xl:top-28">
              <div className="overflow-hidden rounded-[34px] bg-[var(--hp-ink)] text-white shadow-[0_24px_70px_rgba(16,39,28,0.18)]">
                <div className="p-7 sm:p-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs font-black uppercase tracking-[0.18em] text-white/55">
                        Order summary
                      </div>
                      <h2 className="mt-2 text-2xl font-black">
                        Your Happy-Park order
                      </h2>
                    </div>

                    <Sparkles className="h-6 w-6 text-[#f4cd83]" />
                  </div>

                  <div className="mt-8 space-y-4 border-y border-white/10 py-6">
                    <SummaryRow label="Subtotal" value={formatJmd(subtotal)} />
                    <SummaryRow
                      label={
                        fulfillment === "delivery"
                          ? "SLYDE delivery"
                          : "Pickup"
                      }
                      value={
                        fulfillment === "delivery"
                          ? "Quoted next"
                          : "FREE"
                      }
                    />
                  </div>

                  <div className="flex items-end justify-between py-6">
                    <div>
                      <div className="text-sm text-white/55">
                        Estimated total
                      </div>
                      <div className="mt-1 text-xs text-white/40">
                        Before delivery quote
                      </div>
                    </div>

                    <div className="text-3xl font-black tracking-[-0.04em]">
                      {formatJmd(subtotal)}
                    </div>
                  </div>

                  <Link
                    href="/checkout"
                    className="flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-black !text-[var(--hp-ink)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#f4cd83]"
                  >
                    Continue to checkout
                    <ArrowRight className="h-4 w-4" />
                  </Link>

                  <div className="mt-5 flex items-center justify-center gap-2 text-xs font-bold text-white/50">
                    <ShieldCheck className="h-4 w-4" />
                    Secure checkout architecture
                  </div>
                </div>

                <div className="border-t border-white/10 bg-white/[0.04] px-7 py-5">
                  <div className="flex items-start gap-3">
                    <Clock3 className="mt-0.5 h-4 w-4 shrink-0 text-[#f4cd83]" />
                    <p className="text-xs leading-5 text-white/55">
                      Preparation and delivery times are confirmed as part of
                      the final order flow.
                    </p>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        ) : (
          <section className="mx-auto max-w-3xl rounded-[40px] border border-black/[0.06] bg-white px-6 py-16 text-center shadow-[0_20px_70px_rgba(20,39,30,0.06)] sm:px-12">
            <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-[var(--hp-paper)]">
              <ShoppingBag className="h-8 w-8 text-[var(--hp-forest)]" />
            </div>

            <h2 className="hp-heading mt-7 text-4xl font-black">
              Your cart is ready for something happy.
            </h2>

            <p className="mx-auto mt-4 max-w-xl leading-7 text-[var(--hp-ink-soft)]">
              Add fresh food from the Happy-Park Kitchen or browse the Natural
              Shop to start your order.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/food"
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-[var(--hp-forest)] px-6 text-sm font-black !text-white transition hover:-translate-y-0.5 hover:bg-[var(--hp-forest-deep)]"
              >
                Explore food
              </Link>

              <Link
                href="/shop"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-black/10 bg-white px-6 text-sm font-black text-[var(--hp-ink)] transition hover:bg-black/[0.03]"
              >
                Browse Natural Shop
              </Link>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

function CartGroup({
  title,
  subtitle,
  icon,
  items,
  onIncrease,
  onDecrease,
  onRemove,
}: {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  items: HappyParkCartItem[];
  onIncrease: (id: string) => void;
  onDecrease: (id: string) => void;
  onRemove: (id: string) => void;
}) {
  return (
    <section className="overflow-hidden rounded-[32px] border border-black/[0.06] bg-white shadow-[0_18px_60px_rgba(20,39,30,0.05)]">
      <div className="flex items-center gap-4 border-b border-black/[0.06] px-6 py-5 sm:px-8">
        <span className="grid h-11 w-11 place-items-center rounded-[16px] bg-[var(--hp-paper)] text-[var(--hp-forest)]">
          {icon}
        </span>

        <div>
          <h2 className="font-black tracking-[-0.02em]">{title}</h2>
          <p className="mt-0.5 text-xs text-[var(--hp-ink-soft)]">
            {subtitle}
          </p>
        </div>
      </div>

      <div className="divide-y divide-black/[0.06]">
        {items.map((item) => (
          <div
            key={item.id}
            className="grid gap-5 p-6 sm:grid-cols-[1fr_auto] sm:items-center sm:p-8"
          >
            <div className="flex gap-4">
              <div
                className={`grid h-20 w-20 shrink-0 place-items-center rounded-[22px] ${
                  item.category === "kitchen"
                    ? "bg-[#f4cd83]"
                    : "bg-[#cee8d5]"
                }`}
              >
                {item.category === "kitchen" ? (
                  <Pizza className="h-7 w-7" />
                ) : (
                  <Leaf className="h-7 w-7 text-[var(--hp-forest)]" />
                )}
              </div>

              <div className="min-w-0">
                <div className="text-lg font-black tracking-[-0.025em]">
                  {item.name}
                </div>
                <p className="mt-1 max-w-lg text-sm leading-6 text-[var(--hp-ink-soft)]">
                  {item.description}
                </p>
                <div className="mt-3 font-black text-[var(--hp-forest)]">
                  {formatJmd(item.unitPrice)}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 sm:justify-end">
              <div className="flex items-center rounded-full border border-black/10 bg-[var(--hp-paper)] p-1">
                <button
                  type="button"
                  aria-label={`Decrease ${item.name} quantity`}
                  onClick={() => onDecrease(item.id)}
                  className="grid h-9 w-9 place-items-center rounded-full transition hover:bg-white"
                >
                  <Minus className="h-4 w-4" />
                </button>

                <span className="w-9 text-center text-sm font-black">
                  {item.quantity}
                </span>

                <button
                  type="button"
                  aria-label={`Increase ${item.name} quantity`}
                  onClick={() => onIncrease(item.id)}
                  className="grid h-9 w-9 place-items-center rounded-full transition hover:bg-white"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              <button
                type="button"
                aria-label={`Remove ${item.name}`}
                onClick={() => onRemove(item.id)}
                className="grid h-11 w-11 place-items-center rounded-full text-[var(--hp-ink-soft)] transition hover:bg-red-50 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function SummaryRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-6">
      <span className="text-sm text-white/55">{label}</span>
      <span className="text-sm font-black text-white">{value}</span>
    </div>
  );
}

