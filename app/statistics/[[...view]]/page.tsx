import type { Metadata } from "next";
import { StatisticsSection } from "@/components/sections/statistics";

export const metadata: Metadata = {
  title: "PORT-CATHODE // STATISTICS",
};

export default function StatisticsPage() {
  return <StatisticsSection />;
}
