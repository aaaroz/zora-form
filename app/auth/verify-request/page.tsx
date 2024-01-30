import CardRequestWrapper from "@/components/auth/card-request-wrapper";
import { Container } from "@/components/globals/container";
import { SEOVerify } from "@/lib/constant";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: SEOVerify.title,
  description: SEOVerify.description,
};

export default function VerifyRequest() {
  return (
    <Container>
      <CardRequestWrapper />
    </Container>
  );
}
