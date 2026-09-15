import { z } from "zod";

export const trustedPaymentEventSchema =
  z.object({
    eventId:
      z.string().min(1).max(200),

    provider:
      z.string().min(1).max(100),

    bookingId:
      z.string().uuid(),

    paymentReference:
      z.string().min(1).max(200),

    status:
      z.literal("paid"),

    amountMinor:
      z.number().int().nonnegative(),

    currency:
      z.string()
        .length(3)
        .transform((value) =>
          value.toUpperCase(),
        ),
  });

export type TrustedPaymentEvent =
  z.infer<
    typeof trustedPaymentEventSchema
  >;
