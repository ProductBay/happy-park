import { herServices } from "../demo-data";
import type { HerAdminAppointment, HerAdminClient, HerAdminService, HerConsultationRequest } from "./admin-types";

export const herAdminAppointments: HerAdminAppointment[] = [
  { id: "HER-A101", clientId: "sarah", client: "Sarah Morgan", date: "2026-09-30", dayLabel: "Today", time: "9:00 AM", serviceId: "her-reset", service: "HER RESET", duration: "2 hr 30 min", price: 18500, status: "CONFIRMED", contactPreference: "WhatsApp" },
  { id: "HER-A102", clientId: "alicia", client: "Alicia Brown", date: "2026-09-30", dayLabel: "Today", time: "11:00 AM", serviceId: "silk-press", service: "Silk Press", duration: "2 hr", price: 7500, status: "CONFIRMED", contactPreference: "Phone" },
  { id: "HER-A103", clientId: "monique", client: "Monique Davis", date: "2026-09-30", dayLabel: "Today", time: "1:30 PM", serviceId: "advanced-consult", service: "Advanced Hair & Scalp Consultation", duration: "1 hr", price: 6500, status: "CONFIRMED", contactPreference: "WhatsApp" },
  { id: "HER-A104", clientId: "janelle", client: "Janelle Richards", date: "2026-09-30", dayLabel: "Today", time: "3:00 PM", serviceId: "coil-hydration", service: "Coil Hydration Therapy", duration: "1 hr 45 min", price: 8500, status: "REQUESTED", contactPreference: "Phone" },
  { id: "HER-A105", clientId: "danielle", client: "Danielle Campbell", date: "2026-09-30", dayLabel: "Today", time: "5:30 PM", serviceId: "her-time", service: "HER TIME", duration: "2 hr", price: 14500, status: "CONFIRMED", contactPreference: "WhatsApp" },
  { id: "HER-A106", clientId: "nicole", client: "Nicole Williams", date: "2026-10-01", dayLabel: "Tomorrow", time: "10:30 AM", serviceId: "her-complete", service: "HER COMPLETE", duration: "3 hr 30 min", price: 25000, status: "CONFIRMED", contactPreference: "Email" },
];

export const herAdminClients: HerAdminClient[] = [
  { id: "sarah", name: "Sarah Morgan", phone: "876-555-0142", email: "sarah.m@example.com", lastVisit: "Sep 14", nextAppointment: "Today, 9:00 AM", preferredService: "HER RESET", visits: 4, note: "Prefers morning appointments." },
  { id: "alicia", name: "Alicia Brown", phone: "876-555-0188", email: "alicia.b@example.com", lastVisit: "Aug 28", nextAppointment: "Today, 11:00 AM", preferredService: "Silk Press", visits: 6, note: "Prefers WhatsApp reminders." },
  { id: "monique", name: "Monique Davis", phone: "876-555-0117", email: "monique.d@example.com", lastVisit: "First visit", nextAppointment: "Today, 1:30 PM", preferredService: "Consultation", visits: 0, note: "Requested a consultation before selecting services." },
  { id: "janelle", name: "Janelle Richards", phone: "876-555-0163", email: "janelle.r@example.com", lastVisit: "Sep 02", nextAppointment: "Today, 3:00 PM", preferredService: "Coil Hydration Therapy", visits: 2, note: "Prefers afternoon appointments." },
  { id: "danielle", name: "Danielle Campbell", phone: "876-555-0199", email: "danielle.c@example.com", lastVisit: "Sep 10", nextAppointment: "Today, 5:30 PM", preferredService: "HER TIME", visits: 3, note: "Enjoys the full relaxation add-on." },
  { id: "nicole", name: "Nicole Williams", phone: "876-555-0135", email: "nicole.w@example.com", lastVisit: "Jul 22", nextAppointment: "Tomorrow, 10:30 AM", preferredService: "HER COMPLETE", visits: 5, note: "Prefers email contact." },
];

export const herConsultations: HerConsultationRequest[] = [
  { id: "HER-C201", clientId: "monique", client: "Monique Davis", concern: "Thinning-hair concerns", requested: "Today · 9:14 AM", requestedDate: "2026-09-30", contactPreference: "WhatsApp", status: "NEW", note: "Would like professional guidance before choosing a service." },
  { id: "HER-C202", clientId: "janelle", client: "Janelle Richards", concern: "Dry/flaky scalp concerns", requested: "Yesterday", requestedDate: "2026-09-29", contactPreference: "Phone", status: "FOLLOW-UP" },
  { id: "HER-C203", clientId: "tasha", client: "Tasha Reid", concern: "Breakage concerns", requested: "Today · 10:42 AM", requestedDate: "2026-09-30", contactPreference: "Email", status: "NEW" },
];

export const herAdminServices: HerAdminService[] = herServices.map((service) => ({
  ...service,
  duration: service.category === "Add-Ons" ? "30 min" : service.category === "Wellness" ? "60 min" : service.category === "Signature Experiences" ? "2–3 hr" : "1 hr 30 min",
  onlineBooking: service.category !== "Care Programmes",
  consultationRequired: service.category === "Advanced Hair & Scalp" || service.category === "Care Programmes",
  status: "ACTIVE",
}));

export const herWhatsappLeads = ["Nicole — HER RESET inquiry", "Tasha — consultation question", "Melissa — Mom & Me inquiry"];
