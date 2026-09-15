import postgres from "@prisma/orm-postgres/runtime";

import type { Contract } from "../../../prisma/contract";
import contractJson from "../../../prisma/contract.json";

const databaseUrl =
  process.env.DATABASE_URL?.trim() ?? "";

function isPlaceholderDatabaseUrl(url: string) {
  return (
    !url ||
    url.includes("USER:PASSWORD@HOST") ||
    url.includes("PASSWORD@HOST")
  );
}

export function isHappyParkDatabaseEnabled() {
  return (
    process.env.HAPPY_PARK_DB_ENABLED === "true" &&
    !isPlaceholderDatabaseUrl(databaseUrl)
  );
}

const client = !isPlaceholderDatabaseUrl(databaseUrl)
  ? postgres<Contract>({
      contractJson,
      url: databaseUrl,
      poolOptions: {
        connectionTimeoutMillis: 10000,
        idleTimeoutMillis: 30000,
      },
    })
  : null;

export function getHappyParkDb() {
  if (!isHappyParkDatabaseEnabled() || !client) {
    throw new Error(
      "Happy-Park database persistence is not enabled.",
    );
  }

  return client;
}
