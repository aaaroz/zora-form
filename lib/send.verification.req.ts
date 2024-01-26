import MagicLinkEmail from "@/components/email";
import resend from "./resend";

export async function sendVerificationRequest(params: any) {
  const { identifier, url } = params;
  const { host } = new URL(url);

  try {
    const data = await resend.emails.send({
      from: "z-form <onboarding@resend.dev>",
      to: [identifier],
      subject: `Log in to ${host}`,
      text: text({ url, host }),
      react: MagicLinkEmail({ url, host }),
    });
    return { success: true, data };
  } catch (error) {
    throw new Error("Failed to send the email verification.");
  }
}

function text({ url, host }: any) {
  return `Sign in verification to ${host}\n${url}`;
}
