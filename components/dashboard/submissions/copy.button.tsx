"use client";

import { toast } from "sonner";
import { FaShare } from "react-icons/fa";
import { Button } from "@/components/ui/button";

export const CopyButton = ({ shareUrl }: { shareUrl: string }) => {
  return (
    <Button
      className="w-[25dvh] px-10 space-x-2"
      onClick={() => {
        navigator.clipboard.writeText(shareUrl);
        toast.success("Copied to clipboard");
      }}
    >
      <FaShare />
      <span>Share Link</span>
    </Button>
  );
};
