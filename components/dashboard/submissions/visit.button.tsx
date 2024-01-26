"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export const VisitButton = ({ shareUrl }: { shareUrl: string }) => {
  return (
    <Button asChild>
      <Link href={shareUrl} target="_blank" className="w-[25dvh]">
        Visit
      </Link>
    </Button>
  );
};
