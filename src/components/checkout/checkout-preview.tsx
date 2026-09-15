"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronRight,
  CreditCard,
  Leaf,
  LockKeyhole,
  Mail,
  MapPin,
  PackageCheck,
  Phone,
  Pizza,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Truck,
  User,
} from "lucide-react";
import { useState } from "react";
import { useHappyParkCart } from "@/lib/cart/cart-provider";

type Fulfillment = "pickup" | "delivery";
type PaymentMethod = "card" | "pay-at-counter";

const formatJmd = (value: number) =>
  new Intl.NumberFormat("en-JM", {
    style: "currency",
    currency: "JMD",
    maximumFractionDigits: 0,
  }).format(value);

export function CheckoutPreview() {
  const {
    items,
    subtotal,
    hydrated,
    clearCart,
  } = useHappyParkCart();
  const [fulfillment, setFulfillment] =
    useState<Fulfillment>("pickup");

  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethod>("card");

  const [complete, setComplete] = useState(false);
if (complete) {
    return (
      <CheckoutSuccess fulfillment={fulfillment} subtotal={subtotal} />
    );
  }


  if (!hydrated) {
    return (
      <main className="min-h-screen bg-[var(--hp-paper)] px-4 pb-24 pt-40">
        <div className="mx-auto max-w-xl rounded-[32px] border border-black/[0.06] bg-white p-10 text-center shadow-sm">
          <div className="mx-auto h-8 w-8 animate-pulse rounded-full bg-[var(--hp-forest)]/15" />

          <p className="mt-4 text-sm font-bold text-[var(--hp-ink-soft)]">
            Preparing checkout...
          </p>
        </div>
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-[var(--hp-paper)] px-4 pb-24 pt-40">
        <div className="mx-auto max-w-2xl rounded-[40px] border border-black/[0.06] bg-white p-8 text-center shadow-[0_24px_80px_rgba(20,39,30,0.08)] sm:p-12">
          <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-[var(--hp-paper)] text-[var(--hp-forest)]">
            <ShoppingBag className="h-8 w-8" />
          </div>

          <h1 className="hp-heading mt-7 text-4xl font-black sm:text-5xl">
            Your cart is empty.
          </h1>

          <p className="mx-auto mt-4 max-w-lg leading-7 text-[var(--hp-ink-soft)]">
            Add something from the Happy-Park Kitchen or Natural Shop before
            continuing to checkout.
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
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[var(--hp-paper)] pb-24 pt-36 sm:pt-40">
      <div className="hp-container">

        <div className="mb-9">
          <Link
            href="/cart"
            className="inline-flex items-center gap-2 text-sm font-bold text-[var(--hp-forest)] transition hover:gap-3"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to cart
          </Link>

          <div className="mt-7 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-[var(--hp-forest)]">
                <LockKeyhole className="h-4 w-4" />
                Happy-Park Checkout
              </div>

              <h1 className="hp-heading mt-4 text-5xl font-black sm:text-6xl lg:text-7xl">
                Almost there.
                <br />
                <span className="text-[var(--hp-forest)]">
                  Let&apos;s make it happy.
                </span>
              </h1>
            </div>

            <div className="flex w-fit items-center gap-2 rounded-full border border-black/[0.07] bg-white px-5 py-3 text-xs font-bold text-[var(--hp-ink-soft)] shadow-sm">
              <ShieldCheck className="h-4 w-4 text-[var(--hp-forest)]" />
              Secure checkout architecture
            </div>
          </div>
        </div>

        <CheckoutProgress />

        <div className="mt-8 grid gap-8 xl:grid-cols-[1fr_400px] xl:items-start">

          <div className="space-y-6">

            <CheckoutSection
              number="01"
              title="Your details"
              subtitle="Where should we send your order updates?"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <Field
                  label="First name"
                  placeholder="First name"
                  icon={<User className="h-4 w-4" />}
                />

                <Field
                  label="Last name"
                  placeholder="Last name"
                  icon={<User className="h-4 w-4" />}
                />

                <Field
                  label="Email"
                  type="email"
                  placeholder="you@example.com"
                  icon={<Mail className="h-4 w-4" />}
                />

                <Field
                  label="Phone / WhatsApp"
                  type="tel"
                  placeholder="876-000-0000"
                  icon={<Phone className="h-4 w-4" />}
                />
              </div>
            </CheckoutSection>

            <CheckoutSection
              number="02"
              title="Fulfillment"
              subtitle="Choose how you would like to receive your order."
            >
              <div className="grid gap-4 sm:grid-cols-2">

                <ChoiceCard
                  selected={fulfillment === "pickup"}
                  onClick={() => setFulfillment("pickup")}
                  icon={<PackageCheck className="h-6 w-6" />}
                  title="Pickup at Happy-Park"
                  description="We'll prepare your order for collection at Happy-Park."
                />

                <ChoiceCard
                  selected={fulfillment === "delivery"}
                  onClick={() => {
                    setFulfillment("delivery");
                    setPaymentMethod("card");
                  }}
                  icon={<Truck className="h-6 w-6" />}
                  title="SLYDE delivery"
                  description="Get a delivery quote and track your order after dispatch."
                />

              </div>

              {fulfillment === "pickup" ? (
                <div className="mt-5 rounded-[24px] border border-black/[0.06] bg-[var(--hp-paper)] p-5">
                  <div className="flex gap-4">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-[15px] bg-white text-[var(--hp-forest)] shadow-sm">
                      <MapPin className="h-5 w-5" />
                    </span>

                    <div>
                      <div className="font-black">
                        Happy-Park
                      </div>
                      <p className="mt-1 text-sm leading-6 text-[var(--hp-ink-soft)]">
                        Southfield, St. Elizabeth, Jamaica
                      </p>
                      <p className="mt-2 text-xs font-bold text-[var(--hp-forest)]">
                        Pickup instructions will appear with your confirmed order.
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mt-5 space-y-4 rounded-[24px] border border-[var(--hp-forest)]/20 bg-[#eef7f0] p-5 sm:p-6">
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-[14px] bg-[var(--hp-forest)] !text-white">
                      <Truck className="h-5 w-5" />
                    </span>

                    <div>
                      <div className="font-black">
                        Delivery powered by SLYDE
                      </div>
                      <div className="text-xs text-[var(--hp-ink-soft)]">
                        Delivery availability and price will be confirmed before payment.
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field
                      label="Delivery address"
                      placeholder="Street / community"
                      icon={<MapPin className="h-4 w-4" />}
                    />

                    <Field
                      label="Parish"
                      placeholder="Select parish"
                      icon={<MapPin className="h-4 w-4" />}
                    />
                  </div>

                  <Field
                    label="Delivery instructions"
                    placeholder="Gate, landmark or helpful directions"
                    icon={<MapPin className="h-4 w-4" />}
                  />
                </div>
              )}
            </CheckoutSection>

            <CheckoutSection
              number="03"
              title="Payment"
              subtitle="Choose your preferred payment method."
            >
              <div className="grid gap-4 sm:grid-cols-2">

                <ChoiceCard
                  selected={paymentMethod === "card"}
                  onClick={() => setPaymentMethod("card")}
                  icon={<CreditCard className="h-6 w-6" />}
                  title="Pay securely online"
                  description="Card and supported online payment options."
                />

                <ChoiceCard
                  selected={paymentMethod === "pay-at-counter"}
                  onClick={() => setPaymentMethod("pay-at-counter")}
                  icon={<ShoppingBag className="h-6 w-6" />}
                  title="Pay at pickup"
                  description="Available for eligible pickup orders."
                  disabled={fulfillment === "delivery"}
                />

              </div>

              {paymentMethod === "card" ? (
                <div className="mt-5 rounded-[24px] border border-dashed border-black/10 bg-[var(--hp-paper)] p-6">
                  <div className="flex items-start gap-4">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-[15px] bg-white text-[var(--hp-forest)] shadow-sm">
                      <LockKeyhole className="h-5 w-5" />
                    </span>

                    <div>
                      <div className="font-black">
                        Secure payment gateway
                      </div>

                      <p className="mt-1 max-w-xl text-sm leading-6 text-[var(--hp-ink-soft)]">
                        The production payment provider will load securely here.
                        No card details are collected in this client preview.
                      </p>
                    </div>
                  </div>
                </div>
              ) : null}
            </CheckoutSection>

          </div>

          <aside className="xl:sticky xl:top-28">
            <div className="overflow-hidden rounded-[34px] bg-[var(--hp-ink)] !text-white shadow-[0_24px_70px_rgba(16,39,28,0.2)]">

              <div className="p-7 sm:p-8">
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <div className="text-xs font-black uppercase tracking-[0.18em] text-white/50">
                      Review
                    </div>
                    <h2 className="mt-2 text-2xl font-black !text-white">
                      Your order
                    </h2>
                  </div>

                  <Sparkles className="h-6 w-6 text-[#f4cd83]" />
                </div>

                <div className="mt-7 space-y-5">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-start gap-4 border-b border-white/10 pb-5 last:border-0"
                    >
                      <span
                        className={`grid h-12 w-12 shrink-0 place-items-center rounded-[16px] ${
                          item.category === "kitchen"
                            ? "bg-[#f4cd83] text-[var(--hp-ink)]"
                            : "bg-[#cee8d5] text-[var(--hp-forest)]"
                        }`}
                      >
                        {item.category === "kitchen" ? (
                          <Pizza className="h-5 w-5" />
                        ) : (
                          <Leaf className="h-5 w-5" />
                        )}
                      </span>

                      <div className="min-w-0 flex-1">
                        <div className="flex justify-between gap-4">
                          <div className="font-black !text-white">
                            {item.name}
                          </div>

                          <div className="shrink-0 text-sm font-black !text-white">
                            {formatJmd(item.unitPrice * item.quantity)}
                          </div>
                        </div>

                        <p className="mt-1 text-xs leading-5 text-white/45">
                          {item.quantity > 1 ? `${item.quantity} × ` : ""}{item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 space-y-3">
                  <SummaryRow
                    label="Subtotal"
                    value={formatJmd(subtotal)}
                  />

                  <SummaryRow
                    label={
                      fulfillment === "delivery"
                        ? "SLYDE delivery"
                        : "Pickup"
                    }
                    value={
                      fulfillment === "delivery"
                        ? "Quoted before payment"
                        : "FREE"
                    }
                  />
                </div>

                <div className="my-6 border-t border-white/10" />

                <div className="flex items-end justify-between gap-5">
                  <div>
                    <div className="text-sm text-white/50">
                      Estimated total
                    </div>

                    {fulfillment === "delivery" ? (
                      <div className="mt-1 text-xs text-white/35">
                        Excludes delivery quote
                      </div>
                    ) : null}
                  </div>

                  <div className="text-3xl font-black tracking-[-0.04em] !text-white">
                    {formatJmd(subtotal)}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setComplete(true);
                    clearCart();
                  }}
                  className="mt-7 flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-black !text-[var(--hp-ink)] shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#f4cd83]"
                >
                  {paymentMethod === "card"
                    ? "Preview order confirmation"
                    : "Place preview order"}

                  <ArrowRight className="h-4 w-4" />
                </button>

                <div className="mt-5 flex items-center justify-center gap-2 text-center text-xs font-bold text-white/45">
                  <ShieldCheck className="h-4 w-4" />
                  Client preview · No real payment processed
                </div>
              </div>

            </div>
          </aside>

        </div>
      </div>
    </main>
  );
}

function CheckoutProgress() {
  const steps = ["Cart", "Details", "Fulfillment", "Payment", "Done"];

  return (
    <div className="overflow-x-auto rounded-[26px] border border-black/[0.06] bg-white px-5 py-4 shadow-sm">
      <div className="flex min-w-[600px] items-center">
        {steps.map((step, index) => (
          <div
            key={step}
            className="flex flex-1 items-center last:flex-none"
          >
            <div className="flex items-center gap-2">
              <span
                className={`grid h-8 w-8 place-items-center rounded-full text-xs font-black ${
                  index === 0
                    ? "bg-[var(--hp-forest)] !text-white"
                    : index === 1
                      ? "bg-[var(--hp-forest)] !text-white"
                      : "bg-[var(--hp-paper)] text-[var(--hp-ink-soft)]"
                }`}
              >
                {index < 2 ? <Check className="h-4 w-4" /> : index + 1}
              </span>

              <span className="text-xs font-black">
                {step}
              </span>
            </div>

            {index < steps.length - 1 ? (
              <ChevronRight className="mx-3 h-4 w-4 flex-1 text-black/20" />
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}

function CheckoutSection({
  number,
  title,
  subtitle,
  children,
}: {
  number: string;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-[32px] border border-black/[0.06] bg-white p-6 shadow-[0_18px_60px_rgba(20,39,30,0.05)] sm:p-8">
      <div className="mb-7 flex items-start gap-4">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-[15px] bg-[var(--hp-forest)] text-xs font-black !text-white">
          {number}
        </span>

        <div>
          <h2 className="text-2xl font-black tracking-[-0.035em]">
            {title}
          </h2>
          <p className="mt-1 text-sm leading-6 text-[var(--hp-ink-soft)]">
            {subtitle}
          </p>
        </div>
      </div>

      {children}
    </section>
  );
}

function Field({
  label,
  placeholder,
  icon,
  type = "text",
}: {
  label: string;
  placeholder: string;
  icon: React.ReactNode;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-black uppercase tracking-[0.12em] text-[var(--hp-ink-soft)]">
        {label}
      </span>

      <span className="flex min-h-14 items-center gap-3 rounded-[18px] border border-black/10 bg-white px-4 transition focus-within:border-[var(--hp-forest)] focus-within:ring-4 focus-within:ring-[var(--hp-forest)]/10">
        <span className="text-[var(--hp-forest)]">
          {icon}
        </span>

        <input
          type={type}
          placeholder={placeholder}
          className="min-w-0 flex-1 bg-transparent text-sm font-semibold text-[var(--hp-ink)] outline-none placeholder:text-black/30"
        />
      </span>
    </label>
  );
}

function ChoiceCard({
  selected,
  onClick,
  icon,
  title,
  description,
  disabled = false,
}: {
  selected: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  title: string;
  description: string;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`relative rounded-[24px] border p-5 text-left transition-all ${
        disabled
          ? "cursor-not-allowed border-black/[0.05] bg-black/[0.025] opacity-45"
          : selected
            ? "border-[var(--hp-forest)] bg-[var(--hp-forest)] !text-white shadow-[0_12px_30px_rgba(22,75,51,0.18)]"
            : "border-black/[0.08] bg-[var(--hp-paper)] text-[var(--hp-ink)] hover:-translate-y-0.5 hover:border-[var(--hp-forest)]/30"
      }`}
    >
      {selected && !disabled ? (
        <span className="absolute right-4 top-4 grid h-7 w-7 place-items-center rounded-full bg-white text-[var(--hp-forest)]">
          <Check className="h-4 w-4" />
        </span>
      ) : null}

      <span
        className={`mb-5 grid h-11 w-11 place-items-center rounded-[15px] ${
          selected && !disabled
            ? "bg-white/15 text-white"
            : "bg-white text-[var(--hp-forest)]"
        }`}
      >
        {icon}
      </span>

      <div
        className={`font-black ${
          selected && !disabled ? "!text-white" : ""
        }`}
      >
        {title}
      </div>

      <p
        className={`mt-2 pr-4 text-sm leading-6 ${
          selected && !disabled
            ? "text-white/70"
            : "text-[var(--hp-ink-soft)]"
        }`}
      >
        {description}
      </p>
    </button>
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
    <div className="flex items-center justify-between gap-5">
      <span className="text-sm text-white/50">
        {label}
      </span>
      <span className="text-right text-sm font-black !text-white">
        {value}
      </span>
    </div>
  );
}

function CheckoutSuccess({
  fulfillment,
  subtotal,
}: {
  fulfillment: Fulfillment;
  subtotal: number;
}) {
  return (
    <main className="min-h-screen bg-[var(--hp-paper)] px-4 pb-24 pt-36 sm:pt-40">
      <div className="mx-auto max-w-3xl">

        <div className="overflow-hidden rounded-[42px] border border-black/[0.06] bg-white text-center shadow-[0_30px_100px_rgba(20,39,30,0.1)]">

          <div className="bg-[var(--hp-forest)] px-6 py-12 !text-white sm:px-12">
            <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-white text-[var(--hp-forest)] shadow-xl">
              <CheckCircle2 className="h-10 w-10" />
            </div>

            <div className="mt-6 text-xs font-black uppercase tracking-[0.2em] text-white/60">
              Preview confirmation
            </div>

            <h1 className="hp-heading mt-3 text-4xl font-black !text-white sm:text-6xl">
              Your Happy-Park order is ready.
            </h1>

            <p className="mx-auto mt-4 max-w-xl leading-7 text-white/70">
              This demonstrates the completed customer journey. No real
              payment or production order was created.
            </p>
          </div>

          <div className="p-7 sm:p-10">
            <div className="grid gap-4 text-left sm:grid-cols-3">

              <SuccessStat
                label="Order"
                value="HP-PREVIEW"
              />

              <SuccessStat
                label="Fulfillment"
                value={
                  fulfillment === "delivery"
                    ? "SLYDE delivery"
                    : "Happy-Park pickup"
                }
              />

              <SuccessStat
                label="Subtotal"
                value={formatJmd(subtotal)}
              />

            </div>

            {fulfillment === "delivery" ? (
              <div className="mt-7 rounded-[26px] bg-[#eef7f0] p-6 text-left">
                <div className="flex items-start gap-4">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-[16px] bg-[var(--hp-forest)] !text-white">
                    <Truck className="h-5 w-5" />
                  </span>

                  <div>
                    <div className="font-black">
                      SLYDE delivery journey
                    </div>
                    <p className="mt-1 text-sm leading-6 text-[var(--hp-ink-soft)]">
                      In production, the confirmed order can request a SLYDE
                      quote, dispatch a Slyder, expose live tracking and record
                      proof of delivery.
                    </p>
                  </div>
                </div>
              </div>
            ) : null}

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/account"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--hp-forest)] px-6 text-sm font-black !text-white transition hover:-translate-y-0.5 hover:bg-[var(--hp-forest-deep)]"
              >
                View my account
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-black/10 bg-white px-6 text-sm font-black text-[var(--hp-ink)] transition hover:bg-black/[0.03]"
              >
                Return home
              </Link>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}

function SuccessStat({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-[22px] bg-[var(--hp-paper)] p-5">
      <div className="text-[10px] font-black uppercase tracking-[0.15em] text-[var(--hp-ink-soft)]">
        {label}
      </div>
      <div className="mt-2 text-sm font-black">
        {value}
      </div>
    </div>
  );
}


