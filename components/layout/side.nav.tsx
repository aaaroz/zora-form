"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useCallback, useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/lib/hooks";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { buttonVariants } from "../ui/button";

interface NavProps {
  links: {
    title: string;
    label?: string;
    href: string;
    icon?: ReactNode;
  }[];
}

export function SideNav({ links }: NavProps) {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const pathName = usePathname();
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const widthCheck = useCallback(() => {
    if (isDesktop) {
      setIsCollapsed(false);
    } else {
      setIsCollapsed(true);
    }
  }, [setIsCollapsed, isDesktop]);

  useEffect(() => {
    widthCheck();
  }, [widthCheck]);

  return (
    <div
      data-collapsed={isCollapsed}
      className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2 sticky"
    >
      <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
        {links.map((link, index) => {
          const isActive =
            link.title.toLowerCase() === pathName.split("/")[2]
              ? "default"
              : "ghost";
          return isCollapsed ? (
            <Tooltip key={index} delayDuration={0}>
              <TooltipTrigger asChild>
                <Link
                  href={link.href}
                  className={cn(
                    buttonVariants({ variant: isActive, size: "icon" }),
                    "h-9 w-9",
                    isActive === "default" &&
                      "dark:bg-muted dark:text-white dark:hover:bg-muted/80 dark:hover:text-white"
                  )}
                >
                  {link.icon}
                  <span className="sr-only">{link.title}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent
                side="right"
                sideOffset={9}
                className="flex items-center gap-4"
              >
                {link.title}
                {link.label && (
                  <span className="ml-auto text-white">{link.label}</span>
                )}
              </TooltipContent>
            </Tooltip>
          ) : (
            <Link
              key={index}
              href={link.href}
              className={cn(
                buttonVariants({ variant: isActive, size: "sm" }),
                isActive === "default" &&
                  "dark:bg-muted dark:text-white dark:hover:bg-muted/80 dark:hover:text-white",
                "justify-start gap-3 px-5"
              )}
            >
              {link.icon}
              {link.title}
              {link.label && (
                <span
                  className={cn(
                    "ml-auto",
                    isActive === "default" && "text-background dark:text-white"
                  )}
                >
                  {link.label}
                </span>
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
