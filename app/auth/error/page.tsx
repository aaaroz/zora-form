import CardError from "@/components/auth/card-error";
import { Container } from "@/components/globals/container";
import { SEOError } from "@/lib/constant";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: SEOError.title,
  description: SEOError.description,
};

export default function ErrorAuthPage() {
  return (
    <Container>
      <CardError />
    </Container>
  );
}
