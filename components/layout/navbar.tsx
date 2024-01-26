import { Logo } from "@/components/globals/logo";
import { ThemeSwitcher } from "../globals/theme.switcher";
import { ButtonLogin } from "../auth/button-login";
import { ButtonProfile } from "../auth/button-profile";
import { ButtonGithub } from "../globals/button.github";
import { getServerSession } from "next-auth";
import { cn } from "@/lib/utils";

export const Navbar = async ({ className }: { className?: string }) => {
  const session = await getServerSession();
  return (
    <nav
      className={cn(
        "container sticky z-10 top-0 flex items-center justify-between border-b border-border/50 h-14 px-2.5 md:px-16 py-2 backdrop-blur-md bg-opacity-30 bg-neutral-50 dark:bg-neutral-950 dark:bg-opacity-30",
        className
      )}
    >
      <Logo withText />
      <div className="flex md:gap-1">
        <ButtonGithub />
        <ThemeSwitcher />
        {session ? <ButtonProfile /> : <ButtonLogin />}
      </div>
    </nav>
  );
};
