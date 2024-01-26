"use client";

import Link from "next/link";
import { useEffect } from "react";

import { Container } from "@/components/globals/container";
import { Button } from "@/components/ui/button";

export default function ErrorPage({ error }: { error: Error }) {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <Container className="flex w-full h-full flex-col items-center justify-center gap-4">
      <h2 className="text-destructive text-4xl">Something went wrong!</h2>
      <Button asChild>
        <Link href={"/"}>Go back to home</Link>
      </Button>
    </Container>
  );
}
