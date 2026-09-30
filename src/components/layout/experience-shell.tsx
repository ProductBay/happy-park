"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { AnnouncementBar } from "./announcement-bar";
import { Footer } from "./footer";
import { Navbar } from "../navigation/navbar";
import { ClientTourShell } from "../client-tour/client-tour-shell";
import { ParkGateway } from "../park-gateway";

export function ExperienceShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isHerAdmin = pathname === "/her/admin" || pathname.startsWith("/her/admin/");

  if (isHerAdmin) return <>{children}</>;

  return <ClientTourShell><ParkGateway /><AnnouncementBar /><Navbar /><main>{children}</main><Footer /></ClientTourShell>;
}
