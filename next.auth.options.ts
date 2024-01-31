import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import EmailProvider from "next-auth/providers/email";
import prisma from "@/lib/prisma";
import { AuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { sendEmail } from "./lib/send.email";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      profile(profile) {
        return {
          id: profile.id.toString(),
          name: profile.name ?? profile.login,
          email: profile.email,
          image: profile.avatar_url,
          isPremium: profile.isPremium,
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      profile(profile) {
        return {
          id: profile.sub,
          name: `${profile.given_name} ${profile.family_name}`,
          email: profile.email,
          image: profile.picture,
          isPremium: profile.isPremium,
        };
      },
    }),
    EmailProvider({
      async sendVerificationRequest({ identifier: email, url }) {
        await sendEmail({ identifier: email, url });
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },

    async session({ session, token }) {
      session.user.id = token.id;
      session.user.isPremium = token.isPremium;
      session.user.name =
        token.name || token.email?.split("@")[0]?.replace(/\d+/g, "") || "";
      return session;
    },
  },

  events: {
    async linkAccount({ user }) {
      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          emailVerified: new Date(),
        },
      });
    },
  },

  pages: {
    signIn: "/auth/login",
    signOut: "/",
    verifyRequest: "/auth/verify-request",
    error: "/auth/error",
  },

  secret: process.env.NEXTAUTH_SECRET,
};
