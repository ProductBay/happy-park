import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Bike,
  CalendarDays,
  CakeSlice,
  CheckCircle2,
  ChevronRight,
  Clock3,
  CookingPot,
  DollarSign,
  Megaphone,
  Package,
  Pizza,
  QrCode,
  ShoppingBag,
  Sparkles,
  TicketCheck,
  TrendingUp,
  Users,
  Warehouse,
} from "lucide-react";

const metrics = [
  {
    label: "Today's Visitors",
    value: "84",
    detail: "Preview activity",
    icon: Users,
    tone: "bg-orange-100 text-orange-700",
  },
  {
    label: "Bookings",
    value: "12",
    detail: "Visits + parties",
    icon: CalendarDays,
    tone: "bg-sky-100 text-sky-700",
  },
  {
    label: "Food Orders",
    value: "18",
    detail: "Demo kitchen queue",
    icon: Pizza,
    tone: "bg-yellow-100 text-yellow-700",
  },
  {
    label: "Revenue",
    value: "J$128K",
    detail: "Demo today",
    icon: DollarSign,
    tone: "bg-emerald-100 text-emerald-700",
  },
];

const kitchenOrders = [
  {
    id: "HP-1048",
    order: "Large Pizza + Drinks",
    status: "Preparing",
    time: "8 min",
  },
  {
    id: "HP-1049",
    order: "2 Burgers + Snow Cones",
    status: "New",
    time: "2 min",
  },
  {
    id: "HP-1050",
    order: "Pizza + Popcorn",
    status: "Oven",
    time: "12 min",
  },
];

const operations = [
  {
    icon: QrCode,
    title: "Admissions & Check-In",
    copy: "Scan passes, find bookings and manage park entry.",
    href: "/admin/check-in",
    action: "Open check-in",
    tone: "bg-orange-100 text-orange-700",
  },
  {
    icon: CakeSlice,
    title: "Parties",
    copy: "See upcoming celebrations, schedules and party requirements.",
    href: "/book/party",
    action: "View party flow",
    tone: "bg-pink-100 text-pink-700",
  },
  {
    icon: CookingPot,
    title: "Kitchen",
    copy: "Manage incoming food orders and preparation stages.",
    href: "/food/order/preview",
    action: "Preview orders",
    tone: "bg-yellow-100 text-yellow-700",
  },
  {
    icon: ShoppingBag,
    title: "Natural Shop",
    copy: "Products, inventory, customer orders and fulfilment.",
    href: "/shop",
    action: "Open storefront",
    tone: "bg-emerald-100 text-emerald-700",
  },
  {
    icon: Bike,
    title: "SLYDE Deliveries",
    copy: "Dispatch eligible orders and follow active deliveries.",
    href: "/food/order/preview",
    action: "Delivery preview",
    tone: "bg-sky-100 text-sky-700",
  },
  {
    icon: Megaphone,
    title: "Marketing",
    copy: "Promotions, banners, offers and future customer campaigns.",
    href: "/",
    action: "View experience",
    tone: "bg-violet-100 text-violet-700",
  },
];

export function BusinessOsPreview() {
  return (
    <main className="min-h-screen bg-[#f4f5f3] pb-24 pt-24 text-slate-950">
      <section className="border-b border-slate-200 bg-white px-5 py-7 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-[1500px] flex-col justify-between gap-5 lg:flex-row lg:items-center">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-950 text-white">
                <Sparkles className="h-4 w-4" />
              </div>

              <p className="text-xs font-black uppercase tracking-[0.18em] text-orange-600">
                Happy-Park Business OS
              </p>
            </div>

            <h1 className="mt-3 text-2xl font-black tracking-tight sm:text-3xl">
              Good morning, Happy-Park.
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Here is the park at a glance.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Link
              href="/admin/check-in"
              className="inline-flex min-h-11 items-center gap-2 rounded-full bg-orange-500 px-5 text-sm font-black text-white"
            >
              <QrCode className="h-4 w-4" />
              Start check-in
            </Link>

            <span className="inline-flex min-h-11 items-center gap-2 rounded-full border border-slate-200 bg-white px-5 text-xs font-black text-slate-500">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Preview mode
            </span>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-[1500px] px-5 py-8 sm:px-8 lg:px-12">
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {metrics.map((metric) => {
            const Icon = metric.icon;

            return (
              <article
                key={metric.label}
                className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="flex items-start justify-between">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl ${metric.tone}`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>

                  <TrendingUp className="h-4 w-4 text-emerald-500" />
                </div>

                <p className="mt-7 text-3xl font-black">
                  {metric.value}
                </p>

                <p className="mt-1 text-sm font-black">
                  {metric.label}
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  {metric.detail}
                </p>
              </article>
            );
          })}
        </section>

        <section className="mt-5 grid gap-5 xl:grid-cols-[1.25fr_0.75fr]">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-400">
                  Today
                </p>

                <h2 className="mt-2 text-2xl font-black">
                  Park operations
                </h2>
              </div>

              <TicketCheck className="h-6 w-6 text-orange-500" />
            </div>

            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              <OperationStat
                label="Checked in"
                value="46"
                detail="Demo guests"
              />
              <OperationStat
                label="Expected"
                value="38"
                detail="Remaining"
              />
              <OperationStat
                label="Parties"
                value="3"
                detail="Scheduled"
              />
            </div>

            <div className="mt-7 rounded-[1.75rem] bg-slate-950 p-6 text-white">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.16em] text-orange-300">
                    Admission control
                  </p>

                  <h3 className="mt-2 text-xl font-black">
                    QR check-in is ready.
                  </h3>

                  <p className="mt-2 max-w-lg text-xs leading-6 text-white/50">
                    Staff can move from the dashboard directly into
                    the existing Happy-Park pass scanning experience.
                  </p>
                </div>

                <Link
                  href="/admin/check-in"
                  className="inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-5 text-xs font-black text-slate-950"
                >
                  Launch scanner
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] bg-orange-500 p-6 text-white sm:p-8">
            <div className="flex items-center justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
                <CalendarDays className="h-6 w-6" />
              </div>

              <span className="rounded-full bg-slate-950 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider">
                Demo
              </span>
            </div>

            <p className="mt-7 text-xs font-black uppercase tracking-[0.16em] text-orange-100">
              Next celebration
            </p>

            <h2 className="mt-2 text-3xl font-black">
              Birthday Party
            </h2>

            <p className="mt-3 text-sm leading-7 text-white/75">
              Party schedule, guest count, food choices and extras
              can all surface here for the Happy-Park team.
            </p>

            <div className="mt-7 grid grid-cols-2 gap-3">
              <MiniParty label="Children" value="12" />
              <MiniParty label="Status" value="Confirmed" />
            </div>
          </div>
        </section>

        <section className="mt-5 grid gap-5 xl:grid-cols-[0.85fr_1.15fr]">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 sm:p-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-400">
                  Kitchen
                </p>
                <h2 className="mt-2 text-2xl font-black">
                  Live order queue
                </h2>
              </div>

              <CookingPot className="h-6 w-6 text-orange-500" />
            </div>

            <div className="mt-7 space-y-3">
              {kitchenOrders.map((order) => (
                <div
                  key={order.id}
                  className="rounded-2xl border border-slate-100 p-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-sm font-black">
                          {order.id}
                        </p>

                        <span className="rounded-full bg-orange-100 px-2.5 py-1 text-[9px] font-black uppercase tracking-wider text-orange-700">
                          {order.status}
                        </span>
                      </div>

                      <p className="mt-2 text-xs text-slate-500">
                        {order.order}
                      </p>
                    </div>

                    <div className="flex items-center gap-1 text-xs font-black text-slate-400">
                      <Clock3 className="h-3.5 w-3.5" />
                      {order.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Link
              href="/food/order/preview"
              className="mt-6 inline-flex items-center gap-2 text-sm font-black text-orange-600"
            >
              Open order preview
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="overflow-hidden rounded-[2rem] bg-[#153a2d] p-6 text-white sm:p-8">
            <div className="flex flex-wrap items-start justify-between gap-5">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.16em] text-emerald-300">
                  Delivery operations
                </p>

                <h2 className="mt-2 text-2xl font-black">
                  SLYDE dispatch
                </h2>

                <p className="mt-3 max-w-xl text-sm leading-7 text-white/55">
                  Happy-Park food and eligible shop orders can move
                  from fulfilment into SLYDE dispatch and tracking.
                </p>
              </div>

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-400 text-emerald-950">
                <Bike className="h-7 w-7" />
              </div>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <DeliveryStat
                value="4"
                label="Awaiting"
              />
              <DeliveryStat
                value="2"
                label="Active"
              />
              <DeliveryStat
                value="11"
                label="Completed"
              />
            </div>

            <div className="mt-7 flex items-center gap-3 rounded-2xl bg-white/10 p-4">
              <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-300" />

              <div className="min-w-0 flex-1">
                <p className="text-sm font-black">
                  Delivery architecture ready
                </p>

                <p className="mt-1 text-xs leading-5 text-white/45">
                  Production SLYDE credentials remain intentionally dormant.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-5">
          <div className="mb-5 flex items-end justify-between gap-5">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-400">
                Business tools
              </p>

              <h2 className="mt-2 text-2xl font-black">
                Run Happy-Park from one place.
              </h2>
            </div>

            <BarChart3 className="hidden h-7 w-7 text-slate-300 sm:block" />
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {operations.map((operation) => {
              const Icon = operation.icon;

              return (
                <Link
                  key={operation.title}
                  href={operation.href}
                  className="group rounded-[1.75rem] border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="flex items-start justify-between">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-2xl ${operation.tone}`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>

                    <ChevronRight className="h-5 w-5 text-slate-300 transition group-hover:translate-x-1" />
                  </div>

                  <h3 className="mt-6 text-xl font-black">
                    {operation.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-500">
                    {operation.copy}
                  </p>

                  <p className="mt-5 text-xs font-black text-orange-600">
                    {operation.action}
                  </p>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="mt-5 grid gap-5 md:grid-cols-3">
          <BottomMetric
            icon={<Warehouse className="h-5 w-5" />}
            label="Shop Inventory"
            value="32"
            detail="Preview products/units"
          />

          <BottomMetric
            icon={<Package className="h-5 w-5" />}
            label="Orders Today"
            value="21"
            detail="Food + shop"
          />

          <BottomMetric
            icon={<Users className="h-5 w-5" />}
            label="Customers"
            value="486"
            detail="Demo profiles"
          />
        </section>

        <section className="mt-5 rounded-[2.5rem] bg-yellow-300 p-7 sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                <BarChart3 className="h-5 w-5" />
              </div>

              <h2 className="mt-5 max-w-3xl text-3xl font-black tracking-tight sm:text-4xl">
                Website outside. Business operating system inside.
              </h2>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-700">
                Happy-Park can manage the customer journey and the
                operational journey from one connected digital platform.
              </p>
            </div>

            <Link
              href="/"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-slate-950 px-6 text-sm font-black text-white"
            >
              View customer experience
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}

function OperationStat({
  label,
  value,
  detail,
}: {
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <div className="rounded-2xl bg-[#f5f5f2] p-4">
      <p className="text-2xl font-black">{value}</p>
      <p className="mt-1 text-xs font-black">{label}</p>
      <p className="mt-1 text-[10px] text-slate-400">{detail}</p>
    </div>
  );
}

function MiniParty({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl bg-white/15 p-4">
      <p className="text-[9px] font-black uppercase tracking-wider text-orange-100">
        {label}
      </p>
      <p className="mt-1 text-sm font-black">{value}</p>
    </div>
  );
}

function DeliveryStat({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <div className="rounded-2xl bg-white/10 p-4">
      <p className="text-2xl font-black text-emerald-300">
        {value}
      </p>
      <p className="mt-1 text-xs font-bold text-white/50">
        {label}
      </p>
    </div>
  );
}

function BottomMetric({
  icon,
  label,
  value,
  detail,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6">
      <div className="flex items-center justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100">
          {icon}
        </div>

        <span className="text-3xl font-black">{value}</span>
      </div>

      <p className="mt-5 text-sm font-black">{label}</p>
      <p className="mt-1 text-xs text-slate-400">{detail}</p>
    </div>
  );
}
