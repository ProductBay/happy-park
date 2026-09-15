import { getHappyParkDb } from "@/lib/db/happy-park-db";
import { issueAdmissionCredential } from "@/lib/booking/issue-admission-credential";
import { assertAdmissionPassIssuanceAllowed } from "@/lib/booking/pass-issuance-policy";
import { encryptPassCredential } from "@/lib/security/pass-credential-encryption";

export type AdmissionPassForCustomer = {
  passNumber: string;
  credential: string;
  guestType: "adult" | "child";
  sequenceNumber: number;
};

export type IssueBookingPassesResult = {
  bookingId: string;
  bookingReference: string;
  issued: boolean;
  passes: AdmissionPassForCustomer[];
};

export async function issueBookingAdmissionPasses(
  bookingId: string,
): Promise<IssueBookingPassesResult> {
  const db = getHappyParkDb();

  return db.transaction(async (tx) => {
    const booking =
      await tx.orm.public.Booking.first({
        id: bookingId,
      });

    if (!booking) {
      throw new Error("Booking not found.");
    }

    assertAdmissionPassIssuanceAllowed({
      bookingStatus: booking.status,
      paymentStatus: booking.paymentStatus,
    });

    const existingPasses =
      await tx.orm.public.BookingPass
        .where({
          bookingId,
        })
        .all();

    if (existingPasses.length > 0) {
      return {
        bookingId: String(booking.id),
        bookingReference: booking.reference,
        issued: false,
        passes: [],
      };
    }

    const resolvedBookingId = booking.id;
    const visitDate = booking.visitDate;

    const expectedGuestCount =
      booking.adultCount +
      booking.childCount;

    if (
      expectedGuestCount <= 0 ||
      expectedGuestCount !== booking.guestCount
    ) {
      throw new Error(
        "Booking guest counts are inconsistent. Admission passes were not issued.",
      );
    }

    const issued: AdmissionPassForCustomer[] = [];

    let sequenceNumber = 1;

    async function createPass(
      guestType: "adult" | "child",
    ) {
      const credential =
        issueAdmissionCredential();

      const encrypted =
        encryptPassCredential(
          credential.credential,
        );

      const pass =
        await tx.orm.public.BookingPass.create({
          bookingId: resolvedBookingId,
          passNumber: credential.passNumber,
          qrTokenHash:
            credential.credentialHash,
          tokenVersion:
            credential.version,
          guestType,
          sequenceNumber,
          status: "active",
          validDate: visitDate,
        });

      await tx.orm.public.BookingPassCredential.create({
        passId: pass.id,
        encryptedCredential:
          encrypted.ciphertext,
        initializationVector:
          encrypted.initializationVector,
        authenticationTag:
          encrypted.authenticationTag,
        keyVersion:
          encrypted.keyVersion,
      });

      issued.push({
        passNumber:
          credential.passNumber,
        credential:
          credential.credential,
        guestType,
        sequenceNumber,
      });

      sequenceNumber += 1;
    }

    for (
      let index = 0;
      index < booking.adultCount;
      index += 1
    ) {
      await createPass("adult");
    }

    for (
      let index = 0;
      index < booking.childCount;
      index += 1
    ) {
      await createPass("child");
    }

    await tx.orm.public.BookingEvent.create({
      bookingId: resolvedBookingId,
      type: "admission_passes_issued",
      metadata: {
        count: issued.length,
      },
    });

    return {
      bookingId:
        String(booking.id),
      bookingReference:
        booking.reference,
      issued: true,
      passes: issued,
    };
  });
}



