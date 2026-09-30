import type { HerAdminAppointment } from "./admin-types";

const MINUTE_MS = 60_000;
const HOUR_MS = 60 * MINUTE_MS;

export function parseEstimatedDurationMs(duration: string): number | null {
  if (/\d\s*[–-]\s*\d/.test(duration)) return null;
  const hours = duration.match(/(\d+(?:\.\d+)?)\s*(?:hr|hour)/i);
  const minutes = duration.match(/(\d+)\s*min/i);
  if (!hours && !minutes) return null;
  const total = Number(hours?.[1] ?? 0) * HOUR_MS + Number(minutes?.[1] ?? 0) * MINUTE_MS;
  return Number.isFinite(total) && total > 0 ? total : null;
}

export function getActiveServiceElapsedMs(appointment: HerAdminAppointment, now = Date.now()): number {
  if (!appointment.serviceStartedAt) return 0;
  const endpoint = appointment.serviceCompletedAt ?? appointment.pausedAt ?? now;
  return Math.max(0, endpoint - appointment.serviceStartedAt - (appointment.accumulatedPausedMs ?? 0));
}

export function getCurrentPauseMs(appointment: HerAdminAppointment, now = Date.now()): number {
  return appointment.pausedAt ? Math.max(0, now - appointment.pausedAt) : 0;
}

export function getRemainingServiceMs(appointment: HerAdminAppointment, now = Date.now()): number | null {
  const estimate = parseEstimatedDurationMs(appointment.duration);
  return estimate === null ? null : Math.max(0, estimate - getActiveServiceElapsedMs(appointment, now));
}

export function getServiceOvertimeMs(appointment: HerAdminAppointment, now = Date.now()): number | null {
  const estimate = parseEstimatedDurationMs(appointment.duration);
  return estimate === null ? null : Math.max(0, getActiveServiceElapsedMs(appointment, now) - estimate);
}

export function getEstimatedFinishTime(appointment: HerAdminAppointment): number | null {
  const estimate = parseEstimatedDurationMs(appointment.duration);
  if (!appointment.serviceStartedAt || estimate === null) return null;
  return appointment.serviceStartedAt + estimate + (appointment.accumulatedPausedMs ?? 0) + getCurrentPauseMs(appointment);
}

export function getServiceProgress(appointment: HerAdminAppointment, now = Date.now()): number | null {
  const estimate = parseEstimatedDurationMs(appointment.duration);
  if (estimate === null) return null;
  return Math.min(100, Math.max(0, getActiveServiceElapsedMs(appointment, now) / estimate * 100));
}

export function getServiceVarianceMs(appointment: HerAdminAppointment): number | null {
  const estimate = parseEstimatedDurationMs(appointment.duration);
  if (estimate === null || !appointment.serviceCompletedAt) return null;
  return getActiveServiceElapsedMs(appointment, appointment.serviceCompletedAt) - estimate;
}

export function formatClockDuration(milliseconds: number): string {
  const seconds = Math.max(0, Math.floor(milliseconds / 1000));
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor(seconds % 3600 / 60);
  const remainder = seconds % 60;
  return [hours, minutes, remainder].map((part) => String(part).padStart(2, "0")).join(":");
}

export function formatCompactDuration(milliseconds: number): string {
  const totalMinutes = Math.max(0, Math.round(milliseconds / MINUTE_MS));
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  if (hours && minutes) return `${hours}h ${minutes}m`;
  if (hours) return `${hours}h`;
  return `${minutes} min`;
}

export function formatLocalTime(timestamp?: number): string {
  if (!timestamp) return "—";
  return new Intl.DateTimeFormat(undefined, { hour: "numeric", minute: "2-digit" }).format(timestamp);
}

export function parseAppointmentTimestamp(date: string, time: string): number | null {
  const match = time.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!match) return null;
  let hour = Number(match[1]) % 12;
  if (match[3].toUpperCase() === "PM") hour += 12;
  const result = new Date(`${date}T00:00:00`);
  if (Number.isNaN(result.getTime())) return null;
  result.setHours(hour, Number(match[2]), 0, 0);
  return result.getTime();
}
