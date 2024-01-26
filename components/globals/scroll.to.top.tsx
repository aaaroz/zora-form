"use client";

import { ArrowUp } from "lucide-react";
import { Button } from "../ui/button";

export const ScrollToTop = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className="rounded-full"
    >
      <ArrowUp className="h-4 w-4" />
    </Button>
  );
};
