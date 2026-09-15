import { z } from "zod";

export const admissionAccessSchema =
  z.object({
    accessToken: z
      .string()
      .trim()
      .min(40)
      .max(256)
      .regex(
        /^HPA1\.[A-Za-z0-9_-]+$/,
        "Invalid admission access credential.",
      ),
  });

export type AdmissionAccessInput =
  z.infer<
    typeof admissionAccessSchema
  >;
