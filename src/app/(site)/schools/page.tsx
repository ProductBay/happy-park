import type { Metadata } from "next";
import { SchoolLanding } from "@/components/schools/school-landing";
export const metadata: Metadata = { title: "Pizza Fridays for Schools", description: "Order by the box. Earn by the class. Celebrate as a school with Happy-Park Pizza Fridays." };
export default function SchoolsPage(){ return <SchoolLanding/>; }
