"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Building2,
  CheckCircle2,
  GraduationCap,
  MapPin,
  Phone,
  ShieldCheck,
  Users,
} from "lucide-react";

const parishes = [
  "Kingston",
  "St. Andrew",
  "St. Catherine",
  "Clarendon",
  "Manchester",
  "St. Elizabeth",
  "Westmoreland",
  "Hanover",
  "St. James",
  "Trelawny",
  "St. Ann",
  "St. Mary",
  "Portland",
  "St. Thomas",
];

const contactRoles = [
  "Principal",
  "Vice Principal",
  "School Administrator",
  "Bursar",
  "Teacher",
  "Class Teacher",
  "Guidance Counsellor",
  "Early Childhood Administrator",
  "PTA President",
  "PTA Representative",
  "Board / Management Representative",
  "Other Authorized Representative",
];

const inputClass =
  "min-h-12 w-full rounded-xl border border-black/15 bg-white px-4 font-normal outline-none transition focus:border-[var(--hp-forest)] focus:ring-4 focus:ring-[var(--hp-forest)]/10";

const selectClass =
  "min-h-12 w-full cursor-pointer rounded-xl border border-black/15 bg-white px-4 font-normal outline-none transition focus:border-[var(--hp-forest)] focus:ring-4 focus:ring-[var(--hp-forest)]/10";

const textareaClass =
  "w-full rounded-xl border border-black/15 bg-white p-4 font-normal outline-none transition focus:border-[var(--hp-forest)] focus:ring-4 focus:ring-[var(--hp-forest)]/10";

function SectionHeading({
  icon,
  eyebrow,
  title,
  copy,
}: {
  icon: React.ReactNode;
  eyebrow: string;
  title: string;
  copy: string;
}) {
  return (
    <div className="mb-6 flex gap-4">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[var(--hp-forest)] text-white">
        {icon}
      </div>

      <div>
        <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--hp-coral)]">
          {eyebrow}
        </p>
        <h2 className="mt-1 text-2xl font-black text-[var(--hp-ink)]">
          {title}
        </h2>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-[var(--hp-ink-soft)]">
          {copy}
        </p>
      </div>
    </div>
  );
}

export function SchoolApplicationForm() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="rounded-[32px] border border-emerald-200 bg-emerald-50 p-8 text-center shadow-xl shadow-green-950/5 sm:p-10">
        <CheckCircle2 className="mx-auto h-14 w-14 text-emerald-600" />

        <p className="mt-5 text-xs font-black uppercase tracking-[0.18em] text-emerald-700">
          Application Preview Complete
        </p>

        <h2 className="mt-2 text-3xl font-black">
          Thank you for your interest.
        </h2>

        <p className="mx-auto mt-3 max-w-xl leading-7 text-[var(--hp-ink-soft)]">
          This is currently a preview application. No information was stored or
          sent. Production submission will activate when database persistence
          and authorized school review workflows are enabled.
        </p>

        <Link
          href="/schools"
          className="mt-7 inline-flex min-h-12 items-center rounded-full bg-[var(--hp-forest)] px-6 font-bold text-white"
        >
          Return to School Partner Programme
        </Link>
      </div>
    );
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(true);
      }}
      className="overflow-hidden rounded-[32px] border border-black/10 bg-white shadow-xl shadow-green-950/5"
    >
      <div className="border-b border-black/10 bg-[var(--hp-forest)] p-6 text-white sm:p-8">
        <p className="text-xs font-black uppercase tracking-[0.2em] text-[var(--hp-lime)]">
          Happy-Park School Partner Programme
        </p>

        <h2 className="mt-2 text-3xl font-black sm:text-4xl">
          Tell us about your school.
        </h2>

        <p className="mt-3 max-w-2xl leading-7 text-white/75">
          A few details will help Happy-Park understand your school, expected
          participation and Pizza Friday delivery needs.
        </p>

        <div className="mt-5 inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold text-white/80">
          Preview application • No information is currently stored
        </div>
      </div>

      <div className="space-y-10 p-5 sm:p-8">
        {/* SCHOOL */}
        <section>
          <SectionHeading
            icon={<Building2 className="h-5 w-5" />}
            eyebrow="Step 01"
            title="School information"
            copy="Start with the school and its location."
          />

          <div className="grid gap-5 md:grid-cols-2">
            <label className="grid gap-2 text-sm font-bold md:col-span-2">
              School name
              <input
                required
                name="schoolName"
                type="text"
                autoComplete="organization"
                placeholder="Enter official school name"
                className={inputClass}
              />
            </label>

            <label className="grid gap-2 text-sm font-bold">
              School type
              <select
                required
                name="schoolType"
                defaultValue=""
                className={selectClass}
              >
                <option value="" disabled>
                  Select school type
                </option>
                <option value="infant">Infant School</option>
                <option value="primary">Primary School</option>
                <option value="infant_primary">
                  Infant & Primary School
                </option>
                <option value="preparatory">Preparatory School</option>
                <option value="other">
                  Other Authorized School Category
                </option>
              </select>
            </label>

            <label className="grid gap-2 text-sm font-bold">
              Parish
              <div className="relative">
                <MapPin className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-black/40" />
                <select
                  required
                  name="parish"
                  defaultValue=""
                  className={`${selectClass} pl-11`}
                >
                  <option value="" disabled>
                    Select parish
                  </option>
                  {parishes.map((parish) => (
                    <option key={parish} value={parish}>
                      {parish}
                    </option>
                  ))}
                </select>
              </div>
            </label>

            <label className="grid gap-2 text-sm font-bold md:col-span-2">
              School address / community
              <textarea
                required
                name="address"
                rows={3}
                placeholder="Street, district or community"
                className={textareaClass}
              />
            </label>

            <label className="grid gap-2 text-sm font-bold">
              Main telephone
              <input
                required
                name="mainTelephone"
                type="tel"
                autoComplete="tel"
                placeholder="876-000-0000"
                className={inputClass}
              />
            </label>

            <label className="grid gap-2 text-sm font-bold">
              School email
              <input
                required
                name="schoolEmail"
                type="email"
                autoComplete="email"
                placeholder="school@example.com"
                className={inputClass}
              />
            </label>
          </div>
        </section>

        <div className="border-t border-black/10" />

        {/* REPRESENTATIVE */}
        <section>
          <SectionHeading
            icon={<GraduationCap className="h-5 w-5" />}
            eyebrow="Step 02"
            title="School representative"
            copy="Tell us who is authorized to coordinate the programme with Happy-Park."
          />

          <div className="grid gap-5 md:grid-cols-2">
            <label className="grid gap-2 text-sm font-bold">
              Principal&apos;s name
              <input
                required
                name="principalName"
                type="text"
                placeholder="Principal's full name"
                className={inputClass}
              />
            </label>

            <label className="grid gap-2 text-sm font-bold">
              Primary contact name
              <input
                required
                name="primaryContactName"
                type="text"
                placeholder="Full name"
                className={inputClass}
              />
            </label>

            <label className="grid gap-2 text-sm font-bold">
              Primary contact role
              <select
                required
                name="primaryContactRole"
                defaultValue=""
                className={selectClass}
              >
                <option value="" disabled>
                  Select role
                </option>

                {contactRoles.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </label>

            <label className="grid gap-2 text-sm font-bold">
              Preferred contact method
              <select
                name="preferredContactMethod"
                defaultValue="whatsapp"
                className={selectClass}
              >
                <option value="whatsapp">WhatsApp</option>
                <option value="phone">Phone Call</option>
                <option value="email">Email</option>
              </select>
            </label>

            <label className="grid gap-2 text-sm font-bold">
              Contact telephone / WhatsApp
              <input
                required
                name="primaryContactTelephone"
                type="tel"
                placeholder="876-000-0000"
                className={inputClass}
              />
            </label>

            <label className="grid gap-2 text-sm font-bold">
              Contact email
              <input
                required
                name="primaryContactEmail"
                type="email"
                placeholder="name@school.edu"
                className={inputClass}
              />
            </label>
          </div>
        </section>

        <div className="border-t border-black/10" />

        {/* PROGRAMME */}
        <section>
          <SectionHeading
            icon={<Users className="h-5 w-5" />}
            eyebrow="Step 03"
            title="Programme planning"
            copy="These estimates help Happy-Park plan Pizza Friday quantities and delivery capacity."
          />

          <div className="grid gap-5 md:grid-cols-2">
            <label className="grid gap-2 text-sm font-bold">
              Approximate student population
              <input
                required
                name="studentPopulation"
                type="number"
                min="1"
                max="10000"
                placeholder="e.g. 350"
                className={inputClass}
              />
            </label>

            <label className="grid gap-2 text-sm font-bold">
              Number of classes
              <input
                required
                name="classCount"
                type="number"
                min="1"
                max="500"
                placeholder="e.g. 12"
                className={inputClass}
              />
            </label>

            <label className="grid gap-2 text-sm font-bold">
              Expected weekly participation
              <input
                required
                name="expectedWeeklyParticipation"
                type="number"
                min="0"
                max="10000"
                placeholder="Estimated participating students"
                className={inputClass}
              />
            </label>

            <label className="grid gap-2 text-sm font-bold">
              Preferred Pizza Friday frequency
              <select
                required
                name="frequency"
                defaultValue="weekly"
                className={selectClass}
              >
                <option value="weekly">Every Week</option>
                <option value="fortnightly">Every 2 Weeks</option>
                <option value="monthly">Monthly</option>
                <option value="occasional">
                  Special Events / Occasionally
                </option>
              </select>
            </label>
          </div>
        </section>

        <div className="border-t border-black/10" />

        {/* DELIVERY */}
        <section>
          <SectionHeading
            icon={<MapPin className="h-5 w-5" />}
            eyebrow="Step 04"
            title="Delivery & programme notes"
            copy="Help us understand where deliveries should arrive and anything important about your school&apos;s programme."
          />

          <div className="grid gap-5">
            <label className="grid gap-2 text-sm font-bold">
              Delivery location at school
              <select
                name="deliveryLocation"
                defaultValue="main_office"
                className={selectClass}
              >
                <option value="main_office">Main Office</option>
                <option value="canteen">Canteen</option>
                <option value="staff_room">Staff Room</option>
                <option value="security_gate">Security / Main Gate</option>
                <option value="designated_area">
                  Other Designated Collection Area
                </option>
              </select>
            </label>

            <label className="grid gap-2 text-sm font-bold">
              Delivery instructions
              <textarea
                name="deliveryInstructions"
                rows={4}
                placeholder="Example: Deliver to the main office and ask for the programme coordinator."
                className={textareaClass}
              />
            </label>

            <label className="grid gap-2 text-sm font-bold">
              Anything else Happy-Park should know?
              <textarea
                name="notes"
                rows={4}
                placeholder="Optional programme, delivery or school information."
                className={textareaClass}
              />
            </label>
          </div>
        </section>

        <div className="border-t border-black/10" />

        {/* AGREEMENTS */}
        <section>
          <SectionHeading
            icon={<ShieldCheck className="h-5 w-5" />}
            eyebrow="Step 05"
            title="School authorization"
            copy="Please confirm these programme requirements before submitting the preview application."
          />

          <div className="grid gap-3">
            {[
              "I am authorized to apply on behalf of the school.",
              "I understand orders are consolidated by the school.",
              "I understand confirmed quantities become payable.",
              "I understand payment is due according to approved school terms.",
              "The school agrees to the programme terms.",
            ].map((text) => (
              <label
                key={text}
                className="flex cursor-pointer items-start gap-3 rounded-2xl border border-black/5 bg-[var(--hp-cream)] p-4 text-sm font-semibold transition hover:border-[var(--hp-forest)]/20"
              >
                <input
                  required
                  type="checkbox"
                  className="mt-0.5 h-5 w-5 shrink-0 accent-[var(--hp-forest)]"
                />
                <span className="leading-6">{text}</span>
              </label>
            ))}
          </div>
        </section>

        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-950">
          <strong>Interactive preview.</strong> Nothing entered into this form is
          currently stored or sent. Please do not enter student names or other
          student personal information.
        </div>

        <button
          type="submit"
          className="flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-[var(--hp-forest)] px-6 font-black text-white shadow-lg shadow-green-950/10 transition hover:-translate-y-0.5 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-[var(--hp-forest)]/20"
        >
          <ShieldCheck className="h-5 w-5" />
          Submit Preview Application
        </button>

        <div className="flex items-center justify-center gap-2 text-center text-xs text-black/45">
          <Phone className="h-3.5 w-3.5" />
          Happy-Park will confirm programme and delivery arrangements with approved schools.
        </div>
      </div>
    </form>
  );
}


