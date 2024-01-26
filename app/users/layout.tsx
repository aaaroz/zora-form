import { ReactNode } from "react";

import { Navbar } from "@/components/layout/navbar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Footer } from "@/components/layout/footer";
import { SideNav } from "@/components/layout/side.nav";
import { File, LayoutGridIcon, Send } from "lucide-react";
import { Container } from "@/components/globals/container";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <TooltipProvider delayDuration={0}>
      <Navbar className="md:px-10" />
      <Container className="md:px-0 min-h-[90dvh]">
        <div className="flex flex-row">
          <div className="py-8 border-r min-h-[90dvh]">
            <SideNav
              links={[
                {
                  title: "Dashboard",
                  label: "",
                  href: "/users/dashboard",
                  icon: <LayoutGridIcon className="w-5 h-5" />,
                },
                {
                  title: "Forms",
                  label: "",
                  href: "/users/forms",
                  icon: <File className="w-5 h-5" />,
                },
                {
                  title: "Submissions",
                  label: "",
                  href: "/users/submissions",
                  icon: <Send className="w-5 h-5" />,
                },
              ]}
            />
          </div>
          <main className="px-3 md:pl-5 py-8 w-full h-[90dvh] overflow-y-scroll">
            {children}
          </main>
        </div>
      </Container>
      <Footer className="md:px-10 py-3 border-t border-border/80" />
    </TooltipProvider>
  );
}
