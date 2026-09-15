import { z } from "zod";

export const prepareBookingSchema = z.object({
  visitDate: z
    .string()
    .regex(
      /^\d{4}-\d{2}-\d{2}$/,
      "A valid visit date is required."
    ),

  guests: z.object({
    adults: z
      .number()
      .int()
      .min(0)
      .max(20),

    children: z
      .number()
      .int()
      .min(0)
      .max(30),
  }),

  packageId: z
    .string()
    .trim()
    .min(1)
    .max(100),

  extraIds: z
    .array(
      z.string().trim().min(1).max(100)
    )
    .max(10),

  customer: z.object({
    firstName: z
      .string()
      .trim()
      .min(2, "First name is required.")
      .max(80),

    lastName: z
      .string()
      .trim()
      .min(2, "Last name is required.")
      .max(80),

    email: z
      .string()
      .trim()
      .email("Enter a valid email address.")
      .max(160),

    phone: z
      .string()
      .trim()
      .min(7, "Enter a valid phone number.")
      .max(30)
      .regex(
        /^[0-9+()\-\s]+$/,
        "Enter a valid phone number."
      ),
  }),
});

export type PrepareBookingInput =
  z.infer<typeof prepareBookingSchema>;
