import type { HerAdminAppointment, HerAppointmentStatus } from "./admin/admin-types";

export type HerClientAppointment = Pick<
  HerAdminAppointment,
  | "id"
  | "date"
  | "dayLabel"
  | "time"
  | "serviceId"
  | "service"
  | "duration"
  | "price"
  | "status"
  | "serviceStartedAt"
  | "serviceCompletedAt"
  | "pausedAt"
  | "accumulatedPausedMs"
>;

export type HerClientView = "home" | "appointments" | "book" | "history";

export const clientRescheduleStatuses: HerAppointmentStatus[] = ["REQUESTED", "CONFIRMED"];

export function canClientReschedule(status: HerAppointmentStatus) {
  return clientRescheduleStatuses.includes(status);
}

export function toClientAppointment(
  appointment: HerAdminAppointment,
): HerClientAppointment {
  const {
    id,
    date,
    dayLabel,
    time,
    serviceId,
    service,
    duration,
    price,
    status,
    serviceStartedAt,
    serviceCompletedAt,
    pausedAt,
    accumulatedPausedMs,
  } = appointment;

  return {
    id,
    date,
    dayLabel,
    time,
    serviceId,
    service,
    duration,
    price,
    status,
    serviceStartedAt,
    serviceCompletedAt,
    pausedAt,
    accumulatedPausedMs,
  };
}

export function getClientStatusLabel(status: HerAppointmentStatus) {
  if (status === "CHECKED IN") return "Your HER experience is almost ready";
  if (status === "IN SERVICE") return "Your HER experience is in progress";
  if (status === "COMPLETED") return "Your HER experience is complete";
  if (status === "CANCELLED") return "Cancellation requested";
  return status === "REQUESTED" ? "Awaiting confirmation" : "Confirmed";
}

export function createClientAppointmentWhatsappMessage(
  appointment: Pick<HerClientAppointment, "service" | "date" | "time">,
) {
  return `Hi HER! I have a question about my ${appointment.service} appointment on ${appointment.date} at ${appointment.time}.`;
}
