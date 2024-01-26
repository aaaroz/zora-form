import MagicLinkEmail from "@/components/email";
import nodemailer from "nodemailer";
import { createElement } from "react";
import { compileTemplate } from "./compile.template";

interface SendEmail {
  identifier: string;
  url: string;
}

export async function sendEmail({ identifier, url }: SendEmail) {
  const { SMTP_EMAIL, SMTP_PASSWORD } = process.env;

  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: SMTP_EMAIL,
      pass: SMTP_PASSWORD,
    },
  });
  //   try {
  //     const testResult = await transport.verify();
  //     console.log(testResult);
  //   } catch (error) {
  //     console.error({ error });
  //     return;
  //   }

  try {
    await transport.sendMail({
      from: `Z-Form <${SMTP_EMAIL}>`,
      to: identifier,
      subject: "Log in to your account",
      text: `Sign in verification to ${url}\n${url}`,
      html: compileTemplate(url, url),
    });
  } catch (error) {
    console.log(error);
  }
}
