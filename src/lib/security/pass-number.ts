import { randomBytes } from "node:crypto";

function compactDate(date = new Date()) {
  const year = String(date.getUTCFullYear()).slice(-2);
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");

  return `${year}${month}${day}`;
}

export function createPassNumber(date = new Date()) {
  const suffix = randomBytes(4)
    .toString("hex")
    .toUpperCase();

  return `HP-${compactDate(date)}-${suffix}`;
}
