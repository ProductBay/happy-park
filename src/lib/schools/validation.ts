import { z } from "zod";

const phone = z.string().trim().min(7).max(30);
export const schoolApplicationSchema = z.object({
  schoolName: z.string().trim().min(2).max(160), schoolType: z.enum(["infant", "primary", "infant_primary", "preparatory", "other"]),
  parish: z.string().trim().min(2).max(80), address: z.string().trim().min(5).max(300), mainTelephone: phone,
  schoolEmail: z.email(), principalName: z.string().trim().min(2).max(120), primaryContactName: z.string().trim().min(2).max(120),
  primaryContactRole: z.string().trim().min(2).max(100), primaryContactTelephone: phone, primaryContactEmail: z.email(),
  studentPopulation: z.coerce.number().int().positive().max(10000), classCount: z.coerce.number().int().positive().max(500),
  frequency: z.enum(["weekly", "fortnightly", "monthly", "occasional"]), expectedWeeklyParticipation: z.coerce.number().int().nonnegative().max(10000),
  deliveryInstructions: z.string().trim().max(1000).optional().default(""), notes: z.string().trim().max(2000).optional().default(""),
  authorized: z.literal(true), consolidatedOrders: z.literal(true), confirmedPayable: z.literal(true), paymentTerms: z.literal(true), programmeTerms: z.literal(true),
});

export type SchoolApplicationInput = z.infer<typeof schoolApplicationSchema>;
