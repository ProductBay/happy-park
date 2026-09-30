import assert from "node:assert/strict";
import test from "node:test";
import type { HerAdminAppointment } from "./admin-types.ts";
import { formatClockDuration, getActiveServiceElapsedMs, getEstimatedFinishTime, getRemainingServiceMs, getServiceOvertimeMs, getServiceProgress, getServiceVarianceMs, parseEstimatedDurationMs } from "./service-timer.ts";

const base: HerAdminAppointment = { id: "test", clientId: "client", client: "Test Client", date: "2026-09-30", dayLabel: "Today", time: "9:00 AM", serviceId: "her-reset", service: "HER RESET", duration: "2 hr 30 min", price: 18500, status: "IN SERVICE", contactPreference: "WhatsApp", serviceStartedAt: 1_000, accumulatedPausedMs: 0 };

test("parses configured duration and rejects ranges or missing duration", () => {
  assert.equal(parseEstimatedDurationMs("2 hr 30 min"), 9_000_000);
  assert.equal(parseEstimatedDurationMs("2–3 hr"), null);
  assert.equal(parseEstimatedDurationMs("Not set"), null);
});

test("derives elapsed and remaining time from timestamps", () => {
  assert.equal(getActiveServiceElapsedMs(base, 61_000), 60_000);
  assert.equal(getRemainingServiceMs(base, 61_000), 8_940_000);
  assert.equal(getEstimatedFinishTime(base), 9_001_000);
});

test("paused time stops active elapsed and resumes without drift", () => {
  const paused = { ...base, pausedAt: 61_000 };
  assert.equal(getActiveServiceElapsedMs(paused, 361_000), 60_000);
  const resumed = { ...base, accumulatedPausedMs: 300_000 };
  assert.equal(getActiveServiceElapsedMs(resumed, 661_000), 360_000);
});

test("overtime and progress clamp while lifecycle remains in service", () => {
  const now = 9_061_000;
  assert.equal(getRemainingServiceMs(base, now), 0);
  assert.equal(getServiceOvertimeMs(base, now), 60_000);
  assert.equal(getServiceProgress(base, now), 100);
});

test("completion variance excludes accumulated pauses", () => {
  const complete = { ...base, status: "COMPLETED" as const, serviceCompletedAt: 8_521_000, accumulatedPausedMs: 60_000 };
  assert.equal(getActiveServiceElapsedMs(complete), 8_460_000);
  assert.equal(getServiceVarianceMs(complete), -540_000);
});

test("clock formatter supports immediate and long-running displays", () => {
  assert.equal(formatClockDuration(0), "00:00:00");
  assert.equal(formatClockDuration(6_138_000), "01:42:18");
});
