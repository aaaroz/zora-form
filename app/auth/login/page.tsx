import AuthForm from "@/components/auth/auth-form";
import { Container } from "@/components/globals/container";
import { authOptions } from "@/next.auth.options";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

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
