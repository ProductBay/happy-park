import type { HerService } from "../booking-types";

export type HerAppointmentStatus = "REQUESTED" | "CONFIRMED" | "CHECKED IN" | "IN SERVICE" | "COMPLETED" | "CANCELLED" | "NO-SHOW";
export type HerContactPreference = "WhatsApp" | "Phone" | "Email";
export type HerAdminView = "overview" | "appointments" | "clients" | "consultations" | "services" | "reports" | "settings";

export type HerAdminAppointment = {
  id: string;
  clientId: string;
  client: string;
  date: string;
  dayLabel: string;
  time: string;
  serviceId: string;
  service: string;
  duration: string;
  price: number;
  status: HerAppointmentStatus;
  contactPreference: HerContactPreference;
  note?: string;
  serviceStartedAt?: number;
  serviceCompletedAt?: number;
  pausedAt?: number;
  accumulatedPausedMs?: number;
};

export type HerAdminClient = {
  id: string;
  name: string;
  phone: string;
  email: string;
  lastVisit: string;
  nextAppointment: string;
  preferredService: string;
  visits: number;
  note: string;
};

export type HerConsultationRequest = {
  id: string;
  clientId: string;
  client: string;
  concern: string;
  requested: string;
  requestedDate: string;
  contactPreference: HerContactPreference;
  status: "NEW" | "REVIEWED" | "FOLLOW-UP";
  note?: string;
};

export type HerAdminService = HerService & {
  duration: string;
  onlineBooking: boolean;
  consultationRequired: boolean;
  status: "ACTIVE" | "HIDDEN";
};
