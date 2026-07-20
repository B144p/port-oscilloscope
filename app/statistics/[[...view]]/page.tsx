import type { Metadata } from "next";
import { StatisticsSection } from "@/components/sections/statistics";

export const metadata: Metadata = {
  title: "OSCILLOSCOPE // STATISTICS",
};

export default function StatisticsPage() {
  return <StatisticsSection />;
}
