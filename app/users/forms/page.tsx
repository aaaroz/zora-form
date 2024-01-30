import { Metadata } from "next";

import FormsDashboard from "@/components/dashboard/forms";
import { SEOForms } from "@/lib/constant";

export const metadata: Metadata = {
  title: SEOForms.title,
  description: SEOForms.description,
};

export default function Forms() {
  return <FormsDashboard />;
}
