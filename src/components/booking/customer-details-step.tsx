"use client";

import {
  Mail,
  Phone,
  UserRound,
} from "lucide-react";
import type {
  CustomerDetails,
} from "@/types/booking";

type CustomerDetailsStepProps = {
  customer: CustomerDetails;

  onChange: (
    field: keyof CustomerDetails,
    value: string
  ) => void;
};

function FieldLabel({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mb-2 text-sm font-black text-[var(--hp-ink)]">
      {children}
    </div>
  );
}

const inputClass =
  "min-h-14 w-full rounded-2xl border border-black/10 bg-white px-4 text-base font-semibold text-[var(--hp-ink)] outline-none transition placeholder:text-black/25 focus:border-[var(--hp-forest)] focus:ring-4 focus:ring-green-900/[0.06]";

export function CustomerDetailsStep({
  customer,
  onChange,
}: CustomerDetailsStepProps) {
  return (
    <div>
      <div className="grid h-14 w-14 place-items-center rounded-2xl bg-[#dff0b9] text-[var(--hp-forest)]">
        <UserRound className="h-6 w-6" />
      </div>

      <h2 className="hp-heading mt-6 text-4xl font-black sm:text-5xl">
        Who should we send the
        booking to?
      </h2>

      <p className="hp-copy mt-4 max-w-2xl">
        Enter the primary guest&apos;s
        contact information. This will
        later be used for confirmations,
        booking updates and digital
        admission passes.
      </p>

      <div className="mt-9 grid gap-5 sm:grid-cols-2">
        <label>
          <FieldLabel>
            First name
          </FieldLabel>

          <input
            autoComplete="given-name"
            value={
              customer.firstName
            }
            onChange={(event) =>
              onChange(
                "firstName",
                event.target.value
              )
            }
            placeholder="First name"
            className={inputClass}
          />
        </label>

        <label>
          <FieldLabel>
            Last name
          </FieldLabel>

          <input
            autoComplete="family-name"
            value={
              customer.lastName
            }
            onChange={(event) =>
              onChange(
                "lastName",
                event.target.value
              )
            }
            placeholder="Last name"
            className={inputClass}
          />
        </label>

        <label>
          <FieldLabel>
            Email address
          </FieldLabel>

          <div className="relative">
            <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-black/30" />

            <input
              type="email"
              autoComplete="email"
              value={
                customer.email
              }
              onChange={(event) =>
                onChange(
                  "email",
                  event.target.value
                )
              }
              placeholder="you@example.com"
              className={`${inputClass} pl-11`}
            />
          </div>
        </label>

        <label>
          <FieldLabel>
            Mobile number
          </FieldLabel>

          <div className="relative">
            <Phone className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-black/30" />

            <input
              type="tel"
              autoComplete="tel"
              value={
                customer.phone
              }
              onChange={(event) =>
                onChange(
                  "phone",
                  event.target.value
                )
              }
              placeholder="876-555-1234"
              className={`${inputClass} pl-11`}
            />
          </div>
        </label>
      </div>

      <div className="mt-6 rounded-2xl bg-black/[0.035] p-4 text-sm leading-6 text-[var(--hp-ink-soft)]">
        Your contact details are used
        only for this Happy-Park
        experience and related booking
        communication.
      </div>
    </div>
  );
}
