const JAMAICA_TIME_ZONE = "America/Jamaica";

const jamaicaDateFormatter = new Intl.DateTimeFormat(
  "en-CA",
  {
    timeZone: JAMAICA_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  },
);

export function getJamaicaDateString(
  date = new Date(),
) {
  const parts =
    jamaicaDateFormatter.formatToParts(date);

  const year = parts.find(
    (part) => part.type === "year",
  )?.value;

  const month = parts.find(
    (part) => part.type === "month",
  )?.value;

  const day = parts.find(
    (part) => part.type === "day",
  )?.value;

  if (!year || !month || !day) {
    throw new Error(
      "Unable to resolve Jamaica calendar date.",
    );
  }

  return `${year}-${month}-${day}`;
}

export function databaseDateToDateString(
  value: Date | string,
) {
  if (typeof value === "string") {
    return value.slice(0, 10);
  }

  return [
    value.getUTCFullYear(),
    String(value.getUTCMonth() + 1).padStart(2, "0"),
    String(value.getUTCDate()).padStart(2, "0"),
  ].join("-");
}
