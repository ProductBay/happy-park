import assert from "node:assert/strict";
import test from "node:test";

import {
  canClientReschedule,
  createClientAppointmentWhatsappMessage,
  toClientAppointment,
} from "./client-account.ts";
import type { HerAdminAppointment } from "./admin/admin-types.ts";

const appointment: HerAdminAppointment = {
  id: "HER-A101",
  clientId: "sarah",
  client: "Sarah Morgan",
  date: "2026-10-10",
  dayLabel: "Saturday",
  time: "10:30 AM",
  serviceId: "her-reset",
  service: "HER RESET",
  duration: "2 hr 30 min",
  price: 18_500,
  status: "CONFIRMED",
  contactPreference: "WhatsApp",
  note: "Internal note",
};

test("client projection excludes identity, contact preference, and internal notes", () => {
  const projection = toClientAppointment(appointment);
  assert.equal(projection.service, "HER RESET");
  assert.equal("client" in projection, false);
  assert.equal("clientId" in projection, false);
  assert.equal("contactPreference" in projection, false);
  assert.equal("note" in projection, false);
});

test("rescheduling is limited to eligible upcoming states", () => {
  assert.equal(canClientReschedule("REQUESTED"), true);
  assert.equal(canClientReschedule("CONFIRMED"), true);
  for (const status of ["CHECKED IN", "IN SERVICE", "COMPLETED", "CANCELLED", "NO-SHOW"] as const) {
    assert.equal(canClientReschedule(status), false);
  }
});

test("appointment WhatsApp copy contains only client-safe appointment details", () => {
  assert.equal(
    createClientAppointmentWhatsappMessage(appointment),
    "Hi HER! I have a question about my HER RESET appointment on 2026-10-10 at 10:30 AM.",
  );
});
