"use client";

import Link from "next/link";
import {
  ArrowRight,
  Bike,
  CalendarDays,
  CakeSlice,
  ChevronRight,
  CircleUserRound,
  Clock3,
  Gift,
  Leaf,
  MapPin,
  PackageCheck,
  PartyPopper,
  Pizza,
  QrCode,
  ShoppingBag,
  Sparkles,
  Star,
  Ticket,
  Trophy,
  UserRound,
} from "lucide-react";

const activity = [
  {
    title: "Happy-Park visit",
    meta: "Upcoming visit",
    detail: "Family admission · 2 adults · 2 children",
    icon: Ticket,
    tone: "bg-orange-100 text-orange-700",
  },
  {
    title: "Pizza order",
    meta: "Order preview",
    detail: "Pizza Studio order · preparation journey",
    icon: Pizza,
    tone: "bg-yellow-100 text-yellow-700",
  },
  {
    title: "Natural Shop",
    meta: "Shop preview",
    detail: "Herbal & natural product order",
    icon: Leaf,
    tone: "bg-emerald-100 text-emerald-700",
  },
];

export function CustomerAccountPreview() {
  return (
    <main className="min-h-screen bg-[#f7f7f4] pb-24 pt-24 text-slate-950">
      <section className="border-b border-slate-200 bg-white px-5 py-8 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 md:flex-row md:items-center">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 text-orange-600">
              <CircleUserRound className="h-7 w-7" />
            </div>

            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-orange-600">
                My Happy-Park
              </p>

              <h1 className="mt-1 text-2xl font-black tracking-tight sm:text-3xl">
                Welcome back, Happy Explorer.
              </h1>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Link
              href="/book/visit"
              className="inline-flex min-h-11 items-center gap-2 rounded-full bg-orange-500 px-5 text-sm font-black text-white"
            >
              <CalendarDays className="h-4 w-4" />
              Plan another visit
            </Link>

            <button
              type="button"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white"
              aria-label="Account profile"
            >
              <UserRound className="h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-12 lg:py-12">
        <section className="grid gap-5 xl:grid-cols-[1.35fr_0.65fr]">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-slate-950 p-7 text-white sm:p-9 lg:p-10">
            <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-orange-500/20 blur-3xl" />

            <div className="relative">
              <div className="flex flex-wrap items-start justify-between gap-6">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.16em] text-orange-300">
                    <Sparkles className="h-3.5 w-3.5" />
                    Coming up
                  </div>

                  <h2 className="mt-5 text-3xl font-black sm:text-4xl">
                    Your Happy-Park day
                  </h2>

                  <p className="mt-3 text-sm leading-7 text-white/55">
                    Everything for the next family adventure,
                    together in one place.
                  </p>
                </div>

                <div className="rounded-2xl bg-orange-500 px-5 py-4 text-center">
                  <p className="text-[10px] font-black uppercase tracking-wider text-orange-100">
                    Demo Visit
                  </p>
                  <p className="mt-1 text-xl font-black">
                    Upcoming
                  </p>
                </div>
              </div>

              <div className="mt-9 grid gap-3 sm:grid-cols-3">
                <VisitDetail
                  icon={<CalendarDays />}
                  label="Date"
                  value="Visit scheduled"
                />

                <VisitDetail
                  icon={<Ticket />}
                  label="Guests"
                  value="2 adults · 2 children"
                />

                <VisitDetail
                  icon={<MapPin />}
                  label="Location"
                  value="Southfield"
                />
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/account/passes"
                  className="inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-6 text-sm font-black text-slate-950"
                >
                  <QrCode className="h-4 w-4" />
                  View QR passes
                </Link>

                <Link
                  href="/visit"
                  className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/15 bg-white/10 px-6 text-sm font-black"
                >
                  Visit details
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>

          <div className="rounded-[2.5rem] bg-gradient-to-br from-yellow-300 to-orange-300 p-7 sm:p-9">
            <div className="flex items-start justify-between">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/70">
                <Trophy className="h-7 w-7" />
              </div>

              <span className="rounded-full bg-slate-950 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-white">
                Preview
              </span>
            </div>

            <p className="mt-8 text-xs font-black uppercase tracking-[0.18em] text-slate-700">
              Happy Rewards
            </p>

            <p className="mt-2 text-4xl font-black">
              1,250
            </p>

            <p className="mt-1 text-sm font-bold text-slate-700">
              Happy Points
            </p>

            <div className="mt-7 h-2 overflow-hidden rounded-full bg-white/50">
              <div className="h-full w-[62%] rounded-full bg-slate-950" />
            </div>

            <p className="mt-3 text-xs leading-5 text-slate-700">
              Rewards architecture ready for future visits,
              celebrations and purchases.
            </p>
          </div>
        </section>

        <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <DashboardAction
            icon={<QrCode className="h-6 w-6" />}
            title="My Passes"
            copy="Entry QR codes"
            href="/account/passes"
            className="bg-orange-100"
          />

          <DashboardAction
            icon={<CakeSlice className="h-6 w-6" />}
            title="My Parties"
            copy="Celebrations"
            href="/parties"
            className="bg-pink-100"
          />

          <DashboardAction
            icon={<ShoppingBag className="h-6 w-6" />}
            title="My Orders"
            copy="Food & shop"
            href="/food/order/preview"
            className="bg-yellow-100"
          />

          <DashboardAction
            icon={<Gift className="h-6 w-6" />}
            title="Rewards"
            copy="Happy Points"
            href="#rewards"
            className="bg-emerald-100"
          />
        </section>

        <section className="mt-6 grid gap-6 lg:grid-cols-[1fr_0.82fr]">
          <div className="rounded-[2.25rem] border border-slate-200 bg-white p-6 sm:p-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-400">
                  Orders
                </p>
                <h2 className="mt-2 text-2xl font-black">
                  Your Happy activity
                </h2>
              </div>

              <Clock3 className="h-6 w-6 text-slate-300" />
            </div>

            <div className="mt-7 space-y-3">
              {activity.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="flex items-center gap-4 rounded-2xl border border-slate-100 p-4"
                  >
                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${item.tone}`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-x-2">
                        <p className="font-black">
                          {item.title}
                        </p>

                        <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                          {item.meta}
                        </span>
                      </div>

                      <p className="mt-1 truncate text-xs text-slate-500">
                        {item.detail}
                      </p>
                    </div>

                    <ChevronRight className="h-5 w-5 shrink-0 text-slate-300" />
                  </div>
                );
              })}
            </div>
          </div>

          <div className="overflow-hidden rounded-[2.25rem] bg-[#153a2d] p-6 text-white sm:p-8">
            <div className="flex items-center justify-between">
              <div className="flex h-13 w-13 items-center justify-center rounded-2xl bg-emerald-400 text-emerald-950">
                <Bike className="h-6 w-6" />
              </div>

              <span className="rounded-full bg-white/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.14em] text-emerald-200">
                SLYDE
              </span>
            </div>

            <p className="mt-8 text-xs font-black uppercase tracking-[0.18em] text-emerald-300">
              Delivery
            </p>

            <h2 className="mt-3 text-3xl font-black">
              Follow the happiness.
            </h2>

            <p className="mt-4 text-sm leading-7 text-white/60">
              Food and eligible Happy-Park shop orders can move
              into a connected SLYDE delivery journey.
            </p>

            <div className="mt-7 rounded-2xl bg-white/10 p-4">
              <div className="flex items-center gap-3">
                <PackageCheck className="h-5 w-5 text-emerald-300" />

                <div>
                  <p className="text-sm font-black">
                    Pizza order
                  </p>
                  <p className="mt-1 text-xs text-white/45">
                    Demo tracking available
                  </p>
                </div>
              </div>
            </div>

            <Link
              href="/food/order/preview"
              className="mt-6 inline-flex items-center gap-2 text-sm font-black text-emerald-300"
            >
              Track demo order
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        <section
          id="rewards"
          className="mt-6 grid gap-6 lg:grid-cols-3"
        >
          <AccountFeature
            icon={<PartyPopper className="h-6 w-6" />}
            title="Birthday central"
            copy="Keep party plans, celebration details and future bookings together."
            href="/parties"
            action="Explore parties"
          />

          <AccountFeature
            icon={<Pizza className="h-6 w-6" />}
            title="Order favourites"
            copy="Return to Happy-Park food and build another family favourite."
            href="/food"
            action="Explore food"
          />

          <AccountFeature
            icon={<Leaf className="h-6 w-6" />}
            title="Natural Shop"
            copy="Browse Happy-Park's herbal and natural product storefront."
            href="/shop"
            action="Visit shop"
          />
        </section>

        <section className="mt-6 rounded-[2.5rem] border border-slate-200 bg-white p-7 sm:p-9">
          <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <div className="flex items-center gap-2 text-orange-600">
                <Star className="h-5 w-5 fill-orange-500" />
                <Sparkles className="h-5 w-5" />
              </div>

              <h2 className="mt-4 text-3xl font-black tracking-tight">
                One account. The whole Happy-Park experience.
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-500">
                Visits, passes, parties, food, shopping, delivery
                and future rewards can all live under one customer
                identity.
              </p>
            </div>

            <Link
              href="/attractions"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-slate-950 px-6 text-sm font-black text-white"
            >
              Find more fun
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}

function VisitDetail({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl bg-white/10 p-4">
      <div className="flex items-center gap-2 text-orange-300 [&>svg]:h-4 [&>svg]:w-4">
        {icon}
        <span className="text-[10px] font-black uppercase tracking-wider">
          {label}
        </span>
      </div>

      <p className="mt-2 text-sm font-black">{value}</p>
    </div>
  );
}

function DashboardAction({
  icon,
  title,
  copy,
  href,
  className,
}: {
  icon: React.ReactNode;
  title: string;
  copy: string;
  href: string;
  className: string;
}) {
  return (
    <Link
      href={href}
      className={`group rounded-[1.75rem] p-6 transition duration-300 hover:-translate-y-1 ${className}`}
    >
      <div className="flex items-start justify-between">
        {icon}
        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
      </div>

      <h3 className="mt-8 text-xl font-black">{title}</h3>
      <p className="mt-1 text-xs font-bold text-slate-500">
        {copy}
      </p>
    </Link>
  );
}

function AccountFeature({
  icon,
  title,
  copy,
  href,
  action,
}: {
  icon: React.ReactNode;
  title: string;
  copy: string;
  href: string;
  action: string;
}) {
  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-6">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100 text-orange-600">
        {icon}
      </div>

      <h3 className="mt-6 text-xl font-black">{title}</h3>

      <p className="mt-3 text-sm leading-7 text-slate-500">
        {copy}
      </p>

      <Link
        href={href}
        className="mt-6 inline-flex items-center gap-2 text-sm font-black text-orange-600"
      >
        {action}
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
