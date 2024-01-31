import { Metadata } from "next";

import NotFoundSection from "@/components/layout/not.found";
import { Container } from "@/components/globals/container";

export const metadata: Metadata = {
  title: "Page not found - Error 404",
  description: "Page not found - Error 404",
};

export default function NotFoundPage() {
  return (
    <Container>
      <NotFoundSection />
    </Container>
  );
}
