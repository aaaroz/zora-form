import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { ThemeProvider } from "@/components/providers/theme.providers";
import { AuthProvider } from "@/components/providers/auth.providers";
import { Toaster } from "@/components/ui/sonner";
import { DesignerContextProvider } from "@/components/providers/designer.context.provider";
import NextTopLoader from "nextjs-toploader";
import { SEO } from "@/lib/constant";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s • Z-Form",
    default: SEO.title,
  },
  description: SEO.description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        <NextTopLoader showSpinner={false} color="#2e2d2f" />
        <DesignerContextProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <AuthProvider>{children}</AuthProvider>
            <Toaster />
          </ThemeProvider>
        </DesignerContextProvider>
      </body>
    </html>
  );
}
