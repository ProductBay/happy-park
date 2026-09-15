import { z } from "zod";

export const reissueAdmissionPassSchema =
  z.object({
    passId: z.string().uuid(),
    reason: z
      .string()
      .trim()
      .min(
        5,
        "A reissue reason is required.",
      )
      .max(500),

    staffId: z
      .string()
      .trim()
      .max(120)
      .optional(),

    staffName: z
      .string()
      .trim()
      .max(160)
      .optional(),
  });

export const revokeAdmissionPassSchema =
  z.object({
    passId: z.string().uuid(),
    reason: z
      .string()
      .trim()
      .min(
        5,
        "A revocation reason is required.",
      )
      .max(500),

    staffId: z
      .string()
      .trim()
      .max(120)
      .optional(),

    staffName: z
      .string()
      .trim()
      .max(160)
      .optional(),
  });

export type ReissueAdmissionPassInput =
  z.infer<
    typeof reissueAdmissionPassSchema
  >;

export type RevokeAdmissionPassInput =
  z.infer<
    typeof revokeAdmissionPassSchema
  >;
