import { Metadata } from "next";

import SubmissionsDashboard from "@/components/dashboard/submissions";
import { SEOSubmissions } from "@/lib/constant";

export const metadata: Metadata = {
  title: SEOSubmissions.title,
  description: SEOSubmissions.description,
};
export default function SubmissionsPage() {
  return <SubmissionsDashboard />;
}
