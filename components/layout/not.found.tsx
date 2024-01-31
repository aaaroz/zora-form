"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Logo } from "../globals/logo";

const NotFound = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center">
      <Card className="pt-20 flex flex-col w-full max-w-[55dvh] border-none">
        <CardHeader className="flex items-center gap-5">
          <Logo className="p-3 rounded border-2 border-primary" />
          <h1 className="font-bold text-2xl">Page Not Found!</h1>
        </CardHeader>
        <CardContent className="px-0 py-4 space-y-2 text-center text-sm">
          <h3 className="text-xl font-semibold">Whoopsie!</h3>
          <p className="py-3">
            The page you{"'"}re looking for seems to be taking a break. Our team
            is on it, trying to reunite you. While we work our magic, feel free
            to explore other parts of our site. If you need assistance, our
            support team is here to help.
          </p>
          <Button
            size="sm"
            className="w-full text-sm"
            onClick={() => router.back()}
          >
            Go Back
          </Button>
          <Button variant="ghost" size="sm" className="w-full text-sm" asChild>
            <Link href="mailto:ram.ardiansyah18@gmail.com">Contact Us</Link>
          </Button>
        </CardContent>
        <CardFooter>
          <p className="text-xs text-center">
            Thanks for your understanding and happy browsing with z-form !
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default NotFound;
