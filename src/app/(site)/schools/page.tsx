import type { Metadata } from "next";
import { SchoolLanding } from "@/components/schools/school-landing";
export const metadata: Metadata = { title: { absolute: "Happy-Park for Schools" }, description: "Order by the box. Earn by the class. Celebrate as a school with Happy-Park Pizza Fridays." };
export default function SchoolsPage(){ return <SchoolLanding/>; }
