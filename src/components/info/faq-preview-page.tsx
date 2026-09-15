import Link from "next/link";
import {
  ArrowRight,
  Bike,
  CakeSlice,
  HelpCircle,
  MapPin,
  PawPrint,
  Pizza,
  Ticket,
} from "lucide-react";

const faqs = [
  {
    question: "Where is Happy-Park located?",
    answer:
      "Happy-Park is located in Southfield, St Elizabeth, Jamaica.",
    icon: MapPin,
  },
  {
    question: "What can children do at Happy-Park?",
    answer:
      "Happy-Park offers trampolines, slides, swings and riding toys, along with other family experiences.",
    icon: Ticket,
  },
  {
    question: "Are there animals at Happy-Park?",
    answer:
      "Yes. Happy-Park has petting animals, common fowls, guinea chicks and a koi pond as part of the park experience.",
    icon: PawPrint,
  },
  {
    question: "Does Happy-Park sell food?",
    answer:
      "Yes. Happy-Park offers pizza, hot dogs, hamburgers, popcorn, snow cones, cotton candy, ice cream and more.",
    icon: Pizza,
  },
  {
    question: "Can we celebrate a birthday at Happy-Park?",
    answer:
      "Happy-Park supports birthday celebrations. The online preview includes an interactive Party Builder for planning the experience.",
    icon: CakeSlice,
  },
  {
    question: "Does Happy-Park offer delivery?",
    answer:
      "The Happy-Park digital platform is being designed to support eligible food and shop deliveries through SLYDE.",
    icon: Bike,
  },
  {
    question: "Does Happy-Park have special events?",
    answer:
      "Movie Night is one of the experiences Happy-Park has identified. Event dates and details can be published through the platform when confirmed.",
    icon: HelpCircle,
  },
];

export function FaqPreviewPage() {
  return (
    <main className="min-h-screen bg-[#faf9f6] px-5 pb-24 pt-32 text-slate-950 sm:px-8 lg:px-12 lg:pt-40">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-orange-100 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-orange-700">
            <HelpCircle className="h-4 w-4" />
            Happy-Park Help
          </div>

          <h1 className="mx-auto mt-7 max-w-4xl text-5xl font-black tracking-[-0.055em] sm:text-6xl">
            Questions?
            <span className="text-orange-500"> Happy to help.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-slate-500">
            Quick answers about visiting, playing, eating and
            celebrating at Happy-Park.
          </p>
        </div>

        <div className="mt-14 space-y-3">
          {faqs.map((faq) => {
            const Icon = faq.icon;

            return (
              <details
                key={faq.question}
                className="group rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm"
              >
                <summary className="flex cursor-pointer list-none items-center gap-4 font-black">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
                    <Icon className="h-5 w-5" />
                  </div>

                  <span className="flex-1 text-left">
                    {faq.question}
                  </span>

                  <span className="text-xl text-slate-300 transition group-open:rotate-45">
                    +
                  </span>
                </summary>

                <p className="ml-[3.75rem] mt-4 max-w-3xl pr-6 text-sm leading-7 text-slate-500">
                  {faq.answer}
                </p>
              </details>
            );
          })}
        </div>

        <div className="mt-14 rounded-[2.5rem] bg-slate-950 p-8 text-center text-white sm:p-12">
          <h2 className="text-3xl font-black">
            Ready for your Happy-Park day?
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-white/55">
            Explore the park or start planning your visit online.
          </p>

          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link
              href="/visit"
              className="inline-flex min-h-12 items-center gap-2 rounded-full bg-orange-500 px-6 text-sm font-black"
            >
              Plan your visit
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="/contact"
              className="inline-flex min-h-12 items-center rounded-full border border-white/15 bg-white/10 px-6 text-sm font-black"
            >
              Contact Happy-Park
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
