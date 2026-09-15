"use client";

import {
  ArrowLeft,
  ArrowRight,
  LockKeyhole,
} from "lucide-react";
import {
  useMemo,
  useState,
} from "react";
import { BookingProgress } from "@/components/booking/booking-progress";
import { BookingSummary } from "@/components/booking/booking-summary";
import { CheckoutStep } from "@/components/booking/checkout-step";
import { CustomerDetailsStep } from "@/components/booking/customer-details-step";
import { DateStep } from "@/components/booking/date-step";
import { ExtrasStep } from "@/components/booking/extras-step";
import { GuestStep } from "@/components/booking/guest-step";
import { PackageStep } from "@/components/booking/package-step";
import { ReviewStep } from "@/components/booking/review-step";
import { useVisitBooking } from "@/hooks/use-visit-booking";
import type {
  PrepareBookingResponse,
  PreparedBookingQuote,
} from "@/types/booking-api";

export function VisitBookingExperience() {
  const booking =
    useVisitBooking();

  const [
    preparedQuote,
    setPreparedQuote,
  ] =
    useState<PreparedBookingQuote | null>(
      null
    );

  const [
    preparedFingerprint,
    setPreparedFingerprint,
  ] = useState<string | null>(null);

  const [
    preparing,
    setPreparing,
  ] = useState(false);

  const [
    prepareError,
    setPrepareError,
  ] =
    useState<string | null>(null);

  const currentFingerprint =
    useMemo(
      () =>
        JSON.stringify(
          booking.state
        ),
      [booking.state]
    );

  const quoteCurrent =
    Boolean(
      preparedQuote &&
        preparedFingerprint ===
          currentFingerprint
    );

  async function prepareCheckout() {
    setPreparing(true);
    setPrepareError(null);

    try {
      const response =
        await fetch(
          "/api/bookings/prepare",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify(
              booking.state
            ),
          }
        );

      const result =
        (await response.json()) as PrepareBookingResponse;

      if (
        !response.ok ||
        !result.ok
      ) {
        setPreparedQuote(null);
        setPreparedFingerprint(
          null
        );

        setPrepareError(
          result.ok
            ? "The booking could not be prepared."
            : result.message
        );

        return;
      }

      setPreparedQuote(
        result.quote
      );

      setPreparedFingerprint(
        currentFingerprint
      );
    } catch {
      setPreparedQuote(null);

      setPreparedFingerprint(
        null
      );

      setPrepareError(
        "We could not verify the booking. Please try again."
      );
    } finally {
      setPreparing(false);
    }
  }

  const isCheckout =
    booking.currentStep.id ===
    "checkout";

  return (
    <section className="min-h-screen bg-[var(--hp-cream)] pb-20 pt-36 sm:pt-40">
      <div className="hp-container">
        <div className="mb-8">
          <div className="hp-eyebrow">
            Plan your visit
          </div>

          <h1 className="hp-heading mt-5 max-w-4xl text-5xl font-black sm:text-6xl lg:text-7xl">
            Your Happy-Park day
            starts here.
          </h1>

          <p className="hp-copy mt-5 max-w-2xl text-lg">
            Build your visit in a few
            simple steps. Happy-Park
            verifies everything before
            checkout.
          </p>
        </div>

        <BookingProgress
          steps={booking.steps}
          currentIndex={
            booking.stepIndex
          }
          onSelect={
            booking.goToStep
          }
        />

        <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div className="rounded-[34px] border border-black/[0.06] bg-white p-6 shadow-[0_30px_90px_rgba(20,39,30,0.06)] sm:p-8 lg:p-10">
            {booking.currentStep.id ===
            "date" ? (
              <DateStep
                value={
                  booking.state
                    .visitDate
                }
                onChange={
                  booking.setVisitDate
                }
              />
            ) : null}

            {booking.currentStep.id ===
            "guests" ? (
              <GuestStep
                adults={
                  booking.state
                    .guests.adults
                }
                childCount={
                  booking.state
                    .guests.children
                }
                onChange={
                  booking.setGuestCount
                }
              />
            ) : null}

            {booking.currentStep.id ===
            "package" ? (
              <PackageStep
                selectedId={
                  booking.state
                    .packageId
                }
                onSelect={
                  booking.setPackage
                }
              />
            ) : null}

            {booking.currentStep.id ===
            "extras" ? (
              <ExtrasStep
                selectedIds={
                  booking.state
                    .extraIds
                }
                onToggle={
                  booking.toggleExtra
                }
              />
            ) : null}

            {booking.currentStep.id ===
            "review" ? (
              <ReviewStep
                state={
                  booking.state
                }
              />
            ) : null}

            {booking.currentStep.id ===
            "details" ? (
              <CustomerDetailsStep
                customer={
                  booking.state
                    .customer
                }
                onChange={
                  booking.setCustomerField
                }
              />
            ) : null}

            {booking.currentStep.id ===
            "checkout" ? (
              <CheckoutStep
                state={
                  booking.state
                }
                preparedQuote={
                  preparedQuote
                }
                preparing={
                  preparing
                }
                error={
                  prepareError
                }
                quoteCurrent={
                  quoteCurrent
                }
                onPrepare={
                  prepareCheckout
                }
              />
            ) : null}

            {!isCheckout ? (
              <div className="mt-10 flex flex-col-reverse gap-3 border-t border-black/[0.07] pt-6 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="button"
                  onClick={
                    booking.back
                  }
                  disabled={
                    booking.stepIndex ===
                    0
                  }
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-black/10 bg-white px-5 text-sm font-black disabled:cursor-not-allowed disabled:opacity-30"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </button>

                <button
                  type="button"
                  onClick={
                    booking.next
                  }
                  disabled={
                    !booking.canContinue()
                  }
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--hp-forest)] px-6 text-sm font-black text-white shadow-[0_14px_36px_rgba(22,75,51,0.2)] disabled:cursor-not-allowed disabled:opacity-35"
                >
                  {booking.currentStep
                    .id === "review"
                    ? "Continue to details"
                    : booking.currentStep
                          .id ===
                        "details"
                      ? "Continue to checkout"
                      : "Continue"}

                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <div className="mt-10 border-t border-black/[0.07] pt-6">
                <button
                  type="button"
                  onClick={
                    booking.back
                  }
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-black/10 bg-white px-5 text-sm font-black"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Edit details
                </button>
              </div>
            )}

            <div className="mt-5 flex items-center justify-center gap-2 text-xs text-black/40">
              <LockKeyhole className="h-3.5 w-3.5" />

              No payment is taken
              during this development
              phase.
            </div>
          </div>

          <BookingSummary
            state={booking.state}
            pricing={
              booking.pricing
            }
          />
        </div>
      </div>
    </section>
  );
}
