import { z } from "zod";

export const admissionCredentialSchema = z
  .string()
  .trim()
  .min(20)
  .max(200)
  .regex(
    /^HP1\.[A-Za-z0-9_-]{40,}$/,
    "Invalid Happy-Park admission credential.",
  );

export const scanAdmissionSchema = z.object({
  credential: admissionCredentialSchema,

  staffId: z
    .string()
    .trim()
    .min(1)
    .max(120)
    .optional(),

  staffName: z
    .string()
    .trim()
    .min(1)
    .max(160)
    .optional(),

  gate: z
    .string()
    .trim()
    .min(1)
    .max(80)
    .optional(),

  deviceId: z
    .string()
    .trim()
    .min(1)
    .max(120)
    .optional(),
});

export const manualAdmissionLookupSchema =
  z.object({
    passNumber: z
      .string()
      .trim()
      .min(8)
      .max(80)
      .transform((value) =>
        value.toUpperCase(),
      ),
  });

export type ScanAdmissionInput =
  z.infer<typeof scanAdmissionSchema>;

export type ManualAdmissionLookupInput =
  z.infer<
    typeof manualAdmissionLookupSchema
  >;
