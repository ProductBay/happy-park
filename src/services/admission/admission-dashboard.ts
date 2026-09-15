import {
  databaseDateToDateString,
  getJamaicaDateString,
} from "@/lib/booking/jamaica-date";
import { getHappyParkDb } from "@/lib/db/happy-park-db";
import type {
  AdmissionDashboardActivity,
  AdmissionDashboardActivityStatus,
  AdmissionDashboardData,
} from "@/types/admission-dashboard";

const EXPECTED_BOOKING_STATUSES = new Set([
  "confirmed",
  "partially_checked_in",
  "checked_in",
]);

const EXPECTED_PASS_STATUSES = new Set([
  "active",
  "used",
]);

const ATTENTION_STATUSES = new Set([
  "rejected",
  "already_used",
  "invalid",
  "revoked",
]);

export async function getAdmissionDashboard(): Promise<AdmissionDashboardData> {
  const db = getHappyParkDb();
  const today = getJamaicaDateString();

  /*
   * Prisma 8 RC foundation:
   *
   * Keep these reads intentionally straightforward until the
   * production database is activated and real query volumes can
   * be measured.
   *
   * We will later move date filtering, ordering and limits into
   * PostgreSQL once the live schema is initialized.
   */
  const [passes, bookings, checkIns] =
    await Promise.all([
      db.orm.public.BookingPass.all(),
      db.orm.public.Booking.all(),
      db.orm.public.CheckIn.all(),
    ]);

  const bookingById = new Map(
    bookings.map((booking) => [
      String(booking.id),
      booking,
    ]),
  );

  const passById = new Map(
    passes.map((pass) => [
      String(pass.id),
      pass,
    ]),
  );

  const todaysPasses = passes.filter(
    (pass) =>
      databaseDateToDateString(
        pass.validDate,
      ) === today,
  );

  const expectedPasses =
    todaysPasses.filter((pass) => {
      const booking = bookingById.get(
        String(pass.bookingId),
      );

      if (!booking) {
        return false;
      }

      return (
        EXPECTED_BOOKING_STATUSES.has(
          booking.status,
        ) &&
        EXPECTED_PASS_STATUSES.has(
          pass.status,
        )
      );
    });

  const checkedIn = expectedPasses.filter(
    (pass) => pass.status === "used",
  ).length;

  const remaining = expectedPasses.filter(
    (pass) => pass.status === "active",
  ).length;

  const todaysCheckIns =
    checkIns.filter((checkIn) => {
      const scannedAt = new Date(
        checkIn.scannedAt,
      );

      const jamaicaDate =
        new Intl.DateTimeFormat("en-CA", {
          timeZone: "America/Jamaica",
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
          .format(scannedAt)
          .replace(/\//g, "-");

      return jamaicaDate === today;
    });

  const attention =
    todaysCheckIns.filter((checkIn) =>
      ATTENTION_STATUSES.has(
        checkIn.status,
      ),
    ).length;

  const recentActivity: AdmissionDashboardActivity[] =
    todaysCheckIns
      .slice()
      .sort(
        (left, right) =>
          new Date(
            right.scannedAt,
          ).getTime() -
          new Date(
            left.scannedAt,
          ).getTime(),
      )
      .slice(0, 20)
      .map((checkIn) => {
        const pass = passById.get(
          String(checkIn.passId),
        );

        const booking = bookingById.get(
          String(checkIn.bookingId),
        );

        return {
          id: String(checkIn.id),
          scannedAt: new Date(
            checkIn.scannedAt,
          ).toISOString(),
          status:
            checkIn.status as AdmissionDashboardActivityStatus,
          passNumber:
            pass?.passNumber ??
            "Unknown pass",
          bookingReference:
            booking?.reference ??
            "Unknown booking",
          guestType:
            pass?.guestType ??
            "adult",
          gate:
            checkIn.gate ?? null,
          staffName:
            checkIn.checkedInByName ??
            null,
          reason:
            checkIn.reason ?? null,
        };
      });

  return {
    date: today,
    generatedAt:
      new Date().toISOString(),
    expectedGuests:
      expectedPasses.length,
    checkedIn,
    remaining,
    attention,
    recentActivity,
  };
}
