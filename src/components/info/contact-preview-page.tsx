import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  CakeSlice,
  HelpCircle,
  MapPin,
  MessageCircle,
  Sparkles,
} from "lucide-react";

export function ContactPreviewPage() {
  return (
    <main className="min-h-screen bg-[#faf9f6] px-5 pb-24 pt-32 text-slate-950 sm:px-8 lg:px-12 lg:pt-40">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-orange-100 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-orange-700">
            <MessageCircle className="h-4 w-4" />
            Talk to Happy-Park
          </div>

          <h1 className="mt-7 text-5xl font-black tracking-[-0.055em] sm:text-6xl lg:text-7xl">
            How can we
            <span className="block text-orange-500">make you happy?</span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600">
            Questions about visiting, birthdays, food or the
            Happy-Park experience? Choose where you need help.
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          <ContactCard
            icon={<CalendarDays className="h-7 w-7" />}
            title="Planning a visit?"
            copy="Explore the park and start planning your family day online."
            href="/visit"
            action="Plan your visit"
          />

          <ContactCard
            icon={<CakeSlice className="h-7 w-7" />}
            title="Birthday questions?"
            copy="Explore the Happy-Park birthday experience or start building the celebration."
            href="/parties"
            action="Explore parties"
          />

          <ContactCard
            icon={<HelpCircle className="h-7 w-7" />}
            title="Need an answer?"
            copy="Our frequently asked questions cover the main Happy-Park experiences."
            href="/faq"
            action="Read FAQs"
          />

          <div className="rounded-[2rem] bg-slate-950 p-7 text-white">
            <MapPin className="h-7 w-7 text-orange-400" />

            <h2 className="mt-6 text-2xl font-black">
              Visit Happy-Park
            </h2>

            <p className="mt-3 text-sm leading-7 text-white/60">
              Southfield, St Elizabeth, Jamaica
            </p>

            <p className="mt-8 text-xs leading-6 text-white/40">
              Additional contact details and confirmed operating
              hours will be added once supplied by Happy-Park.
            </p>
          </div>
        </div>

        <div className="mt-16 rounded-[2.75rem] bg-gradient-to-br from-orange-400 to-yellow-300 p-8 sm:p-12">
          <Sparkles className="h-8 w-8" />

          <h2 className="mt-5 max-w-2xl text-4xl font-black tracking-[-0.04em]">
            Ready to start planning?
          </h2>

          <Link
            href="/book/visit"
            className="mt-7 inline-flex min-h-12 items-center gap-2 rounded-full bg-slate-950 px-6 text-sm font-black text-white"
          >
            Book a visit
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </main>
  );
}

function ContactCard({
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
    <div className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 text-orange-600">
        {icon}
      </div>

      <h2 className="mt-6 text-2xl font-black">{title}</h2>

      <p className="mt-3 text-sm leading-7 text-slate-500">
        {copy}
      </p>

      <Link
        href={href}
        className="mt-7 inline-flex items-center gap-2 text-sm font-black text-orange-600"
      >
        {action}
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
