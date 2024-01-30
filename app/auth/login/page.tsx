import AuthForm from "@/components/auth/auth-form";
import { Container } from "@/components/globals/container";
import { SEOAuth } from "@/lib/constant";
import { authOptions } from "@/next.auth.options";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: SEOAuth.title,
  description: SEOAuth.description,
};

export default async function Login() {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/users/dashboard");
  }
  return (
    <Container>
      <AuthForm />
    </Container>
  );
}
