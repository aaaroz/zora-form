import OverviewDashboard from "@/components/dashboard/overview";
import { SEODashboard } from "@/lib/constant";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: SEODashboard.title,
  description: SEODashboard.description,
};
export default async function Dashboard() {
  return <OverviewDashboard />;
}
