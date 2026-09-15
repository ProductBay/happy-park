"use client";

import Image from "next/image";
import {
  ArrowRight,
  BarChart3,
  Check,
  ChevronDown,
  CircleUserRound,
  FileSignature,
  Gauge,
  LockKeyhole,
  PartyPopper,
  Pizza,
  QrCode,
  Rocket,
  Settings2,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Store,
  Truck,
  X,
} from "lucide-react";
import {
  useEffect,
  useState,
  type ReactNode,
} from "react";

const STORAGE_KEY = "happy-park-client-preview-accepted-v1";
type ScopeStatus = "preview" | "foundation" | "planned";

type ScopeGroup = {
  title: string;
  description: string;
  status: ScopeStatus;
  icon: typeof Store;
  features: string[];
};

const PROJECT_HOURS = {
  total: 200,
  completed: 128,
  remaining: 72,
  progress: 64,
} as const;

const PROJECT_SCOPE: ScopeGroup[] = [
  {
    title: "Destination Experience",
    description:
      "The premium digital front door for discovering Happy-Park and planning a family experience.",
    status: "preview",
    icon: Store,
    features: [
      "Premium responsive public website",
      "Happy-Park homepage experience",
      "Attractions & experiences discovery",
      "Play, animals, nature & Movie Night presentation",
      "Plan Your Visit experience",
      "About Happy-Park",
      "Contact experience",
      "Frequently Asked Questions",
      "Gallery & media architecture",
      "Mobile-first navigation",
      "WhatsApp contact experience",
      "SEO & discoverability foundation",
    ],
  },
  {
    title: "Visit Booking & Smart Admission",
    description:
      "Digital visit reservations with a production-ready foundation for secure guest admission.",
    status: "foundation",
    icon: QrCode,
    features: [
      "Visit booking workflow",
      "Visit date selection",
      "Adult & child guest counts",
      "Admission booking records",
      "Booking confirmation architecture",
      "Secure QR admission credentials",
      "Individual guest passes",
      "Customer pass retrieval",
      "Pass revoke & reissue architecture",
      "Staff QR check-in",
      "Camera scanning foundation",
      "Manual booking/pass lookup",
      "Admission audit events",
      "Transactional pass issuance",
    ],
  },
  {
    title: "Birthday & Celebration Booking",
    description:
      "A guided celebration journey designed to turn party enquiries into structured bookings.",
    status: "foundation",
    icon: PartyPopper,
    features: [
      "Birthday & celebration discovery",
      "Party package presentation",
      "Party booking journey",
      "Date & time selection architecture",
      "Child/guest count workflow",
      "Food selection architecture",
      "Decor & extras architecture",
      "Deposit/payment foundation",
      "Booking confirmation architecture",
      "Party operations/calendar foundation",
    ],
  },
  {
    title: "Happy-Park Kitchen & Pizza Studio",
    description:
      "An interactive food-commerce experience built around Happy-Park's menu and custom pizza journey.",
    status: "preview",
    icon: Pizza,
    features: [
      "Happy-Park food storefront",
      "Interactive Pizza Studio",
      "Pizza size selection",
      "Crust selection",
      "Sauce & cheese configuration",
      "Toppings & modifier system",
      "Animated pizza visualization",
      "Dynamic pizza pricing",
      "Sides & drinks",
      "Happy Meal builder flow",
      "Parky interactive pizza guide",
      "Food cart architecture",
      "Pickup workflow",
      "Delivery workflow foundation",
      "Order-status experience",
    ],
  },
  {
    title: "Natural & Herbal Shop",
    description:
      "A dedicated retail storefront for Happy-Park's natural and herbal product business.",
    status: "preview",
    icon: ShoppingBag,
    features: [
      "Natural & herbal storefront",
      "Product categories",
      "Product information pages",
      "Product pricing",
      "Variant architecture",
      "Inventory foundation",
      "Product cart workflow",
      "Checkout integration",
      "Related-product architecture",
      "Shop order-management foundation",
      "Responsible product-information structure",
    ],
  },
  {
    title: "Unified Commerce & Checkout",
    description:
      "A shared commerce layer connecting Happy-Park food and retail products into one customer journey.",
    status: "foundation",
    icon: Store,
    features: [
      "Shared Happy-Park shopping cart",
      "Food & shop cart items",
      "Live navbar cart count",
      "Quantity management",
      "Cart subtotal calculation",
      "Order review",
      "Pickup selection",
      "Delivery selection",
      "Customer checkout",
      "Payment-provider architecture",
      "Order-confirmation foundation",
      "Transactional fulfilment foundation",
    ],
  },
  {
    title: "SLYDE Delivery Integration",
    description:
      "A planned logistics connection between Happy-Park commerce and the SLYDE delivery network.",
    status: "planned",
    icon: Truck,
    features: [
      "SLYDE delivery adapter",
      "Delivery quote architecture",
      "Delivery confirmation",
      "Automatic dispatch architecture",
      "Slyder assignment workflow",
      "Pickup workflow",
      "Live delivery tracking",
      "Delivery status updates",
      "Proof of delivery",
      "Customer tracking experience",
      "Delivery powered by SLYDE",
    ],
  },
  {
    title: "Customer Experience & Accounts",
    description:
      "One customer space for visits, passes, celebrations, purchases, deliveries and future loyalty.",
    status: "preview",
    icon: CircleUserRound,
    features: [
      "Happy-Park customer account",
      "Upcoming visits",
      "Admission passes",
      "Party bookings",
      "Food-order history",
      "Shop-order history",
      "Delivery tracking experience",
      "Saved-address architecture",
      "Wishlist architecture",
      "Rewards & loyalty foundation",
      "Customer profile",
      "Customer activity history",
    ],
  },
  {
    title: "Happy-Park Business OS",
    description:
      "The operational control centre designed for Happy-Park management and staff.",
    status: "preview",
    icon: Settings2,
    features: [
      "Executive operations dashboard",
      "Visit booking management",
      "Party booking management",
      "Party calendar architecture",
      "Guest check-in",
      "Food-order management",
      "Menu management architecture",
      "Shop product management",
      "Inventory architecture",
      "Customer management",
      "Delivery management",
      "Dispatch/history architecture",
      "Marketing controls",
      "Content controls",
      "Analytics foundation",
      "Staff roles architecture",
      "Platform settings",
    ],
  },
  {
    title: "Production Platform & Security",
    description:
      "The technical foundation required to move the demonstration environment into live commercial operation.",
    status: "foundation",
    icon: ShieldCheck,
    features: [
      "PostgreSQL production architecture",
      "Prisma data layer",
      "Dormant persistence controls",
      "Server-verified checkout foundation",
      "Transactional admission issuance",
      "Trusted payment fulfilment architecture",
      "Payment webhook foundation",
      "Environment security",
      "Staff authorization architecture",
      "Operational audit architecture",
      "Production deployment",
      "Database backup strategy",
      "Monitoring & observability",
      "Production hardening & QA",
    ],
  },
];

const FUTURE_READY = [
  "Memberships",
  "Expanded loyalty & rewards",
  "Events",
  "POS integration",
  "Happy-Park mobile apps",
  "Advanced analytics",
  "AI-assisted operations",
  "Additional A'Dash ecosystem integrations",
] as const;

export function ClientPreviewGate({
  children,
}: {
  children: ReactNode;
}) {
  const [ready, setReady] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [agreementOpen, setAgreementOpen] = useState(false);
  const [acknowledged, setAcknowledged] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        setAccepted(
          window.localStorage.getItem(STORAGE_KEY) === "accepted"
        );
      } catch {
        // Preview can continue without persistence.
      }

      setReady(true);
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  function acceptAgreement() {
    if (!acknowledged || name.trim().length < 2) {
      return;
    }

    try {
      window.localStorage.setItem(STORAGE_KEY, "accepted");
      window.localStorage.setItem(
        `${STORAGE_KEY}-name`,
        name.trim()
      );
      window.localStorage.setItem(
        `${STORAGE_KEY}-accepted-at`,
        new Date().toISOString()
      );
    } catch {
      // Preview can continue without persistence.
    }

    setAgreementOpen(false);
    setAccepted(true);
  }

  if (!ready) {
    return (
      <div className="fixed inset-0 z-[9999] grid place-items-center bg-[#06130d]">
        <div className="h-10 w-10 animate-pulse rounded-full border border-white/20 bg-white/10" />
      </div>
    );
  }

  if (accepted) {
    return <>{children}</>;
  }

  return (
    <>
      <main className="relative min-h-screen overflow-hidden bg-[#06130d] text-white">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-blue-500/10 blur-[120px]" />
          <div className="absolute -bottom-48 -right-40 h-[600px] w-[600px] rounded-full bg-cyan-400/10 blur-[140px]" />
          <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.025] blur-[100px]" />

          <div
            className="absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)",
              backgroundSize: "72px 72px",
            }}
          />
        </div>

        <div className="relative z-10 flex min-h-screen flex-col">
          <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-7 sm:px-8 lg:px-10">
            <div className="flex items-center gap-3 text-xs font-black uppercase tracking-[0.18em] text-white/50">
              <span className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/[0.06]">
                <LockKeyhole className="h-4 w-4 text-cyan-300" />
              </span>

              Private Client Environment
            </div>

            <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-[10px] font-black uppercase tracking-[0.16em] text-white/45 sm:flex">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
              Protected Preview
            </div>
          </header>

          <section className="mx-auto grid w-full max-w-7xl flex-1 items-center gap-14 px-6 py-12 sm:px-8 lg:grid-cols-[1.08fr_.92fr] lg:px-10 lg:py-16">
            <div className="max-w-3xl">
              <div className="hp-preview-logo-enter">
                <Image
                  src="/images/brand/adash-technologies-group.png"
                  alt="A'Dash Technologies Group"
                  width={720}
                  height={400}
                  priority
                  className="h-auto w-[280px] object-contain sm:w-[390px] lg:w-[440px]"
                />
              </div>

              <div className="mt-10 inline-flex items-center gap-2 rounded-full border border-cyan-300/15 bg-cyan-300/[0.06] px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-cyan-100">
                <Sparkles className="h-3.5 w-3.5" />
                A&apos;Dash Client Experience
              </div>

              <h1 className="mt-7 max-w-3xl text-5xl font-black leading-[0.95] tracking-[-0.055em] text-white sm:text-6xl lg:text-7xl">
                Happy-Park
                <span className="mt-3 block bg-gradient-to-r from-white via-cyan-100 to-blue-300 bg-clip-text text-transparent">
                  Client Preview.
                </span>
              </h1>

              <p className="mt-7 max-w-2xl text-base leading-8 text-white/55 sm:text-lg">
                Welcome to the private development preview of the Happy-Park
                Digital Experience &amp; Business Platform, designed and
                engineered by A&apos;Dash Technologies Group.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <PreviewPill label="Confidential" />
                <PreviewPill label="Development Environment" />
                <PreviewPill label="Not Final Handover" />
              </div>

              <button
                type="button"
                onClick={() => setAgreementOpen(true)}
                className="group mt-10 inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-white px-7 text-sm font-black !text-[#07140e] shadow-[0_18px_60px_rgba(255,255,255,.12)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(255,255,255,.18)]"
              >
                Review &amp; Enter Client Preview

                <span className="grid h-8 w-8 place-items-center rounded-full bg-[#07140e] text-white transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </button>

              <p className="mt-5 max-w-xl text-xs leading-6 text-white/35">
                Access is provided solely for Happy-Park&apos;s internal
                evaluation, feedback and project approval.
              </p>
            </div>

            <div className="relative">
              <div className="absolute inset-0 translate-x-8 translate-y-8 rounded-[44px] border border-cyan-300/10 bg-cyan-300/[0.025]" />

              <div className="relative overflow-hidden rounded-[40px] border border-white/10 bg-white/[0.055] p-7 shadow-[0_40px_120px_rgba(0,0,0,.35)] backdrop-blur-2xl sm:p-9">
                <div className="flex items-center justify-between">
                  <span className="grid h-14 w-14 place-items-center rounded-[20px] border border-white/10 bg-white/[0.07]">
                    <ShieldCheck className="h-6 w-6 text-cyan-200" />
                  </span>

                  <span className="rounded-full border border-emerald-300/15 bg-emerald-300/[0.07] px-4 py-2 text-[10px] font-black uppercase tracking-[0.16em] text-emerald-200">
                    Authorized Access
                  </span>
                </div>

                <div className="mt-9 text-xs font-black uppercase tracking-[0.2em] text-white/35">
                  Project
                </div>

                <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] text-white">
                  Happy-Park Digital Experience &amp; Business Platform
                </h2>

                <div className="mt-8 space-y-4 border-y border-white/10 py-7">
                  <SecurityRow
                    title="Confidential client preview"
                    description="Private evaluation environment."
                  />

                  <SecurityRow
                    title="A'Dash protected technology"
                    description="Architecture, code and reusable systems remain protected."
                  />

                  <SecurityRow
                    title="Controlled project handover"
                    description="Preview access does not constitute final transfer."
                  />
                </div>

                <div className="mt-7 flex items-center gap-3 text-xs leading-6 text-white/40">
                  <LockKeyhole className="h-4 w-4 shrink-0 text-cyan-200" />
                  Powered, designed and engineered by A&apos;Dash Technologies
                  Group.
                </div>
              </div>
            </div>
          </section>

          <ProjectScopeDossier
            onReviewAgreement={() => setAgreementOpen(true)}
          />

          <footer className="mx-auto flex w-full max-w-7xl flex-col gap-2 border-t border-white/[0.06] px-6 py-6 text-[10px] font-bold uppercase tracking-[0.14em] text-white/25 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">
            <span>Confidential Client Preview</span>
            <span>© A&apos;Dash Technologies Group</span>
          </footer>
        </div>
      </main>

      {agreementOpen ? (
        <AgreementModal
          name={name}
          setName={setName}
          acknowledged={acknowledged}
          setAcknowledged={setAcknowledged}
          onClose={() => setAgreementOpen(false)}
          onAccept={acceptAgreement}
        />
      ) : null}
    </>
  );
}

function ProjectScopeDossier({
  onReviewAgreement,
}: {
  onReviewAgreement: () => void;
}) {
  return (
    <section className="relative mx-auto w-full max-w-7xl px-6 pb-20 pt-8 sm:px-8 lg:px-10 lg:pb-28">
      <div className="overflow-hidden rounded-[34px] border border-white/10 bg-white/[0.045] shadow-[0_40px_140px_rgba(0,0,0,.28)] backdrop-blur-2xl sm:rounded-[44px]">
        <div className="relative overflow-hidden border-b border-white/[0.08] px-6 py-9 sm:px-9 lg:px-12 lg:py-12">
          <div className="pointer-events-none absolute -right-28 -top-32 h-80 w-80 rounded-full bg-cyan-300/[0.08] blur-[90px]" />

          <div className="relative grid gap-10 xl:grid-cols-[1fr_auto] xl:items-end">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/15 bg-cyan-300/[0.06] px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-cyan-100">
                <Gauge className="h-3.5 w-3.5" />
                A&apos;Dash Engineering Dossier
              </div>

              <h2 className="mt-6 max-w-4xl text-3xl font-black tracking-[-0.045em] text-white sm:text-4xl lg:text-5xl">
                Project Scope &amp;
                <span className="text-cyan-200"> Development Progress</span>
              </h2>

              <p className="mt-5 max-w-3xl text-sm leading-7 text-white/50 sm:text-base sm:leading-8">
                Happy-Park is being engineered as a complete digital experience
                and business platform — connecting destination discovery,
                admissions, celebrations, food commerce, retail, customer
                experiences, operations and delivery.
              </p>
            </div>

            <div className="rounded-[26px] border border-white/10 bg-[#04100b]/55 px-5 py-4 text-xs leading-6 text-white/40 xl:max-w-[310px]">
              This preview combines implemented experiences, production
              foundations and planned V1 wiring so the complete delivery scope
              can be evaluated in one place.
            </div>
          </div>
        </div>

        <div className="grid border-b border-white/[0.08] sm:grid-cols-2 xl:grid-cols-4">
          <ProjectMetric
            value={`${PROJECT_HOURS.total}`}
            suffix="hrs"
            label="Estimated V1 Engineering"
          />
          <ProjectMetric
            value={`${PROJECT_HOURS.completed}`}
            suffix="hrs"
            label="Estimated Completed"
          />
          <ProjectMetric
            value={`${PROJECT_HOURS.remaining}`}
            suffix="hrs"
            label="Estimated Remaining"
          />
          <ProjectMetric
            value={`${PROJECT_HOURS.progress}%`}
            label="Estimated Build Progress"
            last
          />
        </div>

        <div className="border-b border-white/[0.08] px-6 py-7 sm:px-9 lg:px-12">
          <div className="flex items-center justify-between gap-6">
            <div>
              <div className="text-[10px] font-black uppercase tracking-[0.18em] text-white/35">
                Production V1 progress
              </div>
              <div className="mt-2 text-sm font-bold text-white/70">
                Approximately {PROJECT_HOURS.completed} of {PROJECT_HOURS.total} estimated engineering hours
              </div>
            </div>

            <div className="text-2xl font-black tracking-[-0.04em] text-cyan-200">
              {PROJECT_HOURS.progress}%
            </div>
          </div>

          <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/[0.07]">
            <div
              className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-cyan-200 to-blue-300 shadow-[0_0_24px_rgba(103,232,249,.28)]"
              style={{ width: `${PROJECT_HOURS.progress}%` }}
            />
          </div>
        </div>

        <div className="px-6 py-9 sm:px-9 lg:px-12 lg:py-12">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="text-[10px] font-black uppercase tracking-[0.18em] text-cyan-200/65">
                Included Platform Scope
              </div>

              <h3 className="mt-3 text-2xl font-black tracking-[-0.035em] text-white sm:text-3xl">
                One platform. Every major Happy-Park journey.
              </h3>
            </div>

            <div className="flex flex-wrap gap-2">
              <StatusLegend status="preview" />
              <StatusLegend status="foundation" />
              <StatusLegend status="planned" />
            </div>
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            {PROJECT_SCOPE.map((group) => (
              <ScopeCard key={group.title} group={group} />
            ))}
          </div>

          <div className="mt-8 overflow-hidden rounded-[28px] border border-cyan-300/10 bg-gradient-to-br from-cyan-300/[0.06] to-blue-400/[0.025] p-6 sm:p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <div className="flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-[16px] border border-cyan-300/15 bg-cyan-300/[0.08]">
                    <Rocket className="h-5 w-5 text-cyan-200" />
                  </span>

                  <div>
                    <div className="text-[10px] font-black uppercase tracking-[0.18em] text-cyan-200/65">
                      Future-Ready Architecture
                    </div>
                    <h3 className="mt-1 text-xl font-black text-white">
                      Built to expand beyond V1.
                    </h3>
                  </div>
                </div>

                <p className="mt-4 text-sm leading-7 text-white/45">
                  The production architecture is being designed so Happy-Park
                  can expand into additional digital services without rebuilding
                  the core platform.
                </p>
              </div>

              <div className="flex max-w-xl flex-wrap gap-2">
                {FUTURE_READY.map((feature) => (
                  <span
                    key={feature}
                    className="rounded-full border border-white/10 bg-white/[0.05] px-3.5 py-2 text-[10px] font-bold text-white/55"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-5 rounded-[28px] border border-white/[0.08] bg-[#04100b]/45 p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.18em] text-white/35">
                <BarChart3 className="h-4 w-4 text-cyan-200" />
                Development Estimate
              </div>

              <p className="mt-3 max-w-3xl text-xs leading-6 text-white/40">
                Engineering hours and progress shown here are good-faith
                development estimates based on the current implementation and
                remaining production V1 scope. They are provided for project
                visibility and are not a time-tracking invoice. Features marked
                Production Wiring Planned may use demonstration data, simulated
                workflows or dormant integrations during this preview.
              </p>
            </div>

            <button
              type="button"
              onClick={onReviewAgreement}
              className="group inline-flex min-h-13 items-center justify-center gap-3 rounded-full bg-white px-6 text-sm font-black !text-[#07140e] transition hover:-translate-y-0.5"
            >
              Review &amp; Enter Preview
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectMetric({
  value,
  suffix,
  label,
  last = false,
}: {
  value: string;
  suffix?: string;
  label: string;
  last?: boolean;
}) {
  return (
    <div
      className={`px-6 py-7 sm:px-8 lg:px-10 ${
        last ? "" : "border-b border-white/[0.08] sm:border-b-0 sm:border-r"
      }`}
    >
      <div className="flex items-end gap-1.5">
        <span className="text-4xl font-black tracking-[-0.055em] text-white lg:text-5xl">
          {value}
        </span>
        {suffix ? (
          <span className="mb-1 text-xs font-black uppercase tracking-[0.12em] text-cyan-200/55">
            {suffix}
          </span>
        ) : null}
      </div>

      <div className="mt-2 text-[10px] font-black uppercase tracking-[0.14em] text-white/35">
        {label}
      </div>
    </div>
  );
}

function ScopeCard({ group }: { group: ScopeGroup }) {
  const Icon = group.icon;

  return (
    <details className="group overflow-hidden rounded-[26px] border border-white/[0.08] bg-white/[0.035] transition open:bg-white/[0.055]">
      <summary className="cursor-pointer list-none p-5 sm:p-6 [&::-webkit-details-marker]:hidden">
        <div className="flex items-start gap-4">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-[17px] border border-white/10 bg-white/[0.06]">
            <Icon className="h-5 w-5 text-cyan-200" />
          </span>

          <div className="min-w-0 flex-1">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <h4 className="text-lg font-black tracking-[-0.025em] text-white">
                {group.title}
              </h4>

              <ScopeStatusBadge status={group.status} />
            </div>

            <p className="mt-2 text-xs leading-6 text-white/40">
              {group.description}
            </p>

            <div className="mt-4 flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-[0.14em] text-white/30">
                {group.features.length} capabilities
              </span>

              <span className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.12em] text-cyan-200/55">
                View scope
                <ChevronDown className="h-4 w-4 transition-transform duration-300 group-open:rotate-180" />
              </span>
            </div>
          </div>
        </div>
      </summary>

      <div className="border-t border-white/[0.07] px-5 pb-6 pt-5 sm:px-6">
        <div className="grid gap-x-5 gap-y-3 sm:grid-cols-2">
          {group.features.map((feature) => (
            <div
              key={feature}
              className="flex items-start gap-2.5 text-xs leading-5 text-white/50"
            >
              <span className="mt-1 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-cyan-300/10">
                <Check className="h-2.5 w-2.5 text-cyan-200" />
              </span>
              {feature}
            </div>
          ))}
        </div>
      </div>
    </details>
  );
}

function ScopeStatusBadge({ status }: { status: ScopeStatus }) {
  const labels: Record<ScopeStatus, string> = {
    preview: "Preview Ready",
    foundation: "Foundation Built",
    planned: "Production Wiring Planned",
  };

  const styles: Record<ScopeStatus, string> = {
    preview:
      "border-emerald-300/15 bg-emerald-300/[0.07] text-emerald-200",
    foundation:
      "border-cyan-300/15 bg-cyan-300/[0.07] text-cyan-200",
    planned:
      "border-blue-300/15 bg-blue-300/[0.07] text-blue-200",
  };

  return (
    <span
      className={`w-fit shrink-0 rounded-full border px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.12em] ${styles[status]}`}
    >
      {labels[status]}
    </span>
  );
}

function StatusLegend({ status }: { status: ScopeStatus }) {
  return <ScopeStatusBadge status={status} />;
}
function PreviewPill({ label }: { label: string }) {
  return (
    <span className="rounded-full border border-white/10 bg-white/[0.045] px-4 py-2 text-[10px] font-black uppercase tracking-[0.14em] text-white/50 backdrop-blur-xl">
      {label}
    </span>
  );
}

function SecurityRow({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-4">
      <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-cyan-300/10 text-cyan-200">
        <Check className="h-3.5 w-3.5" />
      </span>

      <div>
        <div className="text-sm font-black text-white">{title}</div>
        <div className="mt-1 text-xs leading-5 text-white/40">
          {description}
        </div>
      </div>
    </div>
  );
}

function AgreementModal({
  name,
  setName,
  acknowledged,
  setAcknowledged,
  onClose,
  onAccept,
}: {
  name: string;
  setName: (value: string) => void;
  acknowledged: boolean;
  setAcknowledged: (value: boolean) => void;
  onClose: () => void;
  onAccept: () => void;
}) {
  const canAccept = acknowledged && name.trim().length >= 2;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="preview-agreement-title"
      className="fixed inset-0 z-[10000] flex items-end justify-center bg-[#020906]/85 p-0 backdrop-blur-xl sm:items-center sm:p-6"
    >
      <div className="hp-preview-modal-enter flex max-h-[94vh] w-full max-w-5xl flex-col overflow-hidden rounded-t-[34px] border border-white/10 bg-[#fbfcfb] shadow-[0_40px_160px_rgba(0,0,0,.6)] sm:max-h-[90vh] sm:rounded-[38px]">
        <header className="relative overflow-hidden bg-[#07140e] px-6 py-6 text-white sm:px-9">
          <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-cyan-300/10 blur-3xl" />

          <div className="relative flex items-start justify-between gap-6">
            <div className="flex items-start gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-[17px] border border-white/10 bg-white/[0.07]">
                <FileSignature className="h-5 w-5 text-cyan-200" />
              </span>

              <div>
                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-200/70">
                  A&apos;Dash Technologies Group
                </div>

                <h2
                  id="preview-agreement-title"
                  className="mt-2 text-2xl font-black tracking-[-0.035em] text-white sm:text-3xl"
                >
                  Client Preview &amp; IP Protection Agreement
                </h2>

                <p className="mt-2 text-xs leading-5 text-white/45">
                  Happy-Park Digital Experience &amp; Business Platform
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close agreement"
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/10 bg-white/[0.06] text-white transition hover:bg-white/10"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </header>

        <div className="overflow-y-auto px-6 py-7 text-[#17231c] sm:px-9 sm:py-8">
          <div className="mx-auto max-w-4xl">
            <div className="rounded-[24px] border border-[#0f5132]/10 bg-[#eef6f1] p-5">
              <div className="flex gap-3">
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#0f5132]" />

                <p className="text-sm leading-6 text-[#405249]">
                  This development environment is provided exclusively to
                  Happy-Park for evaluation and approval. Access does not
                  constitute final delivery or transfer of A&apos;Dash
                  intellectual property.
                </p>
              </div>
            </div>

            <AgreementSection number="01" title="Purpose">
              Happy-Park is being granted temporary access to this development
              preview solely to evaluate the proposed platform, test the
              customer experience, provide feedback and participate in project
              approval before formal completion and handover.
            </AgreementSection>

            <AgreementSection number="02" title="Confidentiality">
              Happy-Park agrees to keep non-public project information,
              demonstrations, private URLs, technical documentation, software
              architecture, workflows and other protected development
              information confidential and to disclose it only to authorized
              persons who reasonably require access for project evaluation.
            </AgreementSection>

            <AgreementSection
              number="03"
              title="A'Dash Intellectual Property"
            >
              A&apos;Dash retains ownership of its pre-existing and reusable
              technology, including source code, frameworks, libraries,
              architecture, APIs, integrations, development methods,
              administrative systems, reusable modules, utilities, deployment
              methods, SLYDE integration technology, know-how and other
              background technology unless expressly transferred under a
              separate written agreement.
            </AgreementSection>

            <AgreementSection
              number="04"
              title="Happy-Park Property"
            >
              Happy-Park retains ownership of its pre-existing brand, name,
              logos, business information, photographs, customer information
              and other materials supplied by Happy-Park. A&apos;Dash may use
              those materials as reasonably necessary to develop and
              demonstrate this project.
            </AgreementSection>

            <AgreementSection
              number="05"
              title="No Copying or Recreation"
            >
              The preview may not be copied, reverse engineered, redistributed,
              commercially deployed, supplied to another developer for
              replication, or used to reproduce A&apos;Dash protected
              technology without prior written authorization. This does not
              prevent independently developed technology that does not use or
              reproduce A&apos;Dash protected material.
            </AgreementSection>

            <AgreementSection
              number="06"
              title="Preview Is Not Handover"
            >
              Access to this preview does not itself constitute final delivery,
              assignment, licensing beyond evaluation, commercial deployment
              authorization or transfer of intellectual property. Final rights
              and deliverables are governed by the applicable signed project,
              payment, licensing or handover agreement between the parties.
            </AgreementSection>

            <AgreementSection
              number="07"
              title="Demo Environment"
            >
              This environment may contain demonstration data, simulated
              transactions, temporary pricing, placeholder products, generated
              promotional imagery, incomplete integrations and non-production
              payment or delivery functionality. It is not represented as the
              final production system.
            </AgreementSection>

            <AgreementSection
              number="08"
              title="Screenshots & Disclosure"
            >
              Reasonable screenshots may be used for Happy-Park&apos;s internal
              project review. Preview material remains confidential and should
              not be publicly distributed or provided to competing developers
              for replication of protected implementation.
            </AgreementSection>

            <AgreementSection
              number="09"
              title="Governing Law"
            >
              This preview agreement is intended to operate under the laws of
              Jamaica. The parties should first attempt in good faith to
              resolve disputes directly, without limiting lawful remedies
              available for protection of confidential information or
              intellectual property.
            </AgreementSection>

            <AgreementSection
              number="10"
              title="Formal Agreement"
            >
              This digital acknowledgement governs access to the client preview
              and supplements, rather than replaces, any formal project,
              development, confidentiality, licensing or handover agreement
              executed between A&apos;Dash Technologies Group and Happy-Park.
            </AgreementSection>

            <div className="mt-10 rounded-[28px] border border-black/[0.08] bg-white p-5 shadow-sm sm:p-6">
              <label className="block">
                <span className="text-xs font-black uppercase tracking-[0.12em] text-[#5b6a62]">
                  Authorized representative
                </span>

                <input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Enter your full name"
                  className="mt-3 min-h-14 w-full rounded-[18px] border border-black/10 bg-[#f7f9f7] px-4 text-sm font-bold text-[#17231c] outline-none transition focus:border-[#0f5132] focus:ring-4 focus:ring-[#0f5132]/10"
                />
              </label>

              <label className="mt-5 flex cursor-pointer items-start gap-4 rounded-[20px] bg-[#f7f9f7] p-4">
                <input
                  type="checkbox"
                  checked={acknowledged}
                  onChange={(event) =>
                    setAcknowledged(event.target.checked)
                  }
                  className="mt-1 h-5 w-5 accent-[#0f5132]"
                />

                <span className="text-sm leading-6 text-[#4d5c54]">
                  I acknowledge that I am accessing a confidential client
                  preview and agree to the preview, confidentiality and
                  intellectual-property conditions above.
                </span>
              </label>
            </div>
          </div>
        </div>

        <footer className="border-t border-black/[0.07] bg-white px-6 py-5 sm:px-9">
          <div className="mx-auto flex max-w-4xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-[#6a776f]">
              <LockKeyhole className="h-4 w-4 text-[#0f5132]" />
              Confidential · Happy-Park Client Preview
            </div>

            <button
              type="button"
              disabled={!canAccept}
              onClick={onAccept}
              className="inline-flex min-h-13 items-center justify-center gap-3 rounded-full bg-[#0b2d1d] px-6 text-sm font-black !text-white shadow-lg transition enabled:hover:-translate-y-0.5 enabled:hover:bg-[#12442d] disabled:cursor-not-allowed disabled:opacity-35"
            >
              Accept &amp; Enter Preview
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}

function AgreementSection({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="border-b border-black/[0.07] py-7 last:border-0">
      <div className="grid gap-3 sm:grid-cols-[54px_1fr]">
        <div className="text-xs font-black tracking-[0.15em] text-[#0f5132]">
          {number}
        </div>

        <div>
          <h3 className="text-lg font-black tracking-[-0.02em] text-[#17231c]">
            {title}
          </h3>

          <p className="mt-2 text-sm leading-7 text-[#5b6961]">
            {children}
          </p>
        </div>
      </div>
    </section>
  );
}






