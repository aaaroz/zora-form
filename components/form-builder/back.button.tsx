"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

export const BackButton = () => {
  const router = useRouter();
  return (
    <Button size="sm" variant="link" onClick={() => router.back()}>
      &larr; Back
    </Button>
  );
};
