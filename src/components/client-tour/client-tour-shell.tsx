"use client";

import { Suspense, type ReactNode } from "react";

import { HappyTools } from "../shared/happy-tools";
import { ClientTourOverlay } from "./client-tour-overlay";
import { ClientTourProvider } from "./client-tour-provider";

function ClientTourExperience({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <ClientTourProvider>
      {children}
      <HappyTools />
      <ClientTourOverlay />
    </ClientTourProvider>
  );
}

export function ClientTourShell({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <Suspense fallback={children}>
      <ClientTourExperience>
        {children}
      </ClientTourExperience>
    </Suspense>
  );
}
