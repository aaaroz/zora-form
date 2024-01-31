import Link from "next/link";
import { Logo } from "@/components/globals/logo";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

const CardError = () => {
  return (
    <div className="flex flex-col items-center">
      <Card className="pt-20 flex flex-col w-full max-w-[55dvh] border-none">
        <CardHeader className="flex items-center gap-5">
          <Logo className="p-3 rounded border-2 border-primary" />
          <h1 className="font-semibold text-2xl">Authentication Error!</h1>
        </CardHeader>
        <CardContent className="px-0 py-7 space-y-1 text-center text-sm">
          <p className="py-5">
            <strong>Whoopsie!</strong> Looks like your sign-in link took an
            extended coffee break. No worries, you can{" "}
            <strong>try again to sign in</strong>. Thanks for your understanding
            and happy signing in!
          </p>
          <Button size="sm" className="w-full text-sm" asChild>
            <Link href="/auth/login">Try again</Link>
          </Button>
        </CardContent>
        <CardFooter>
          <p className="text-xs text-center">
            Ready to roll with Z-form? Hit {'"'}Try again{'"'} to show you{"'"}
            re on board with our Terms of Use and Privacy Policy. It{"'"}s like
            a friendly handshake, but in the digital world! 🤝 Let{"'"}s keep it
            simple and fun!
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CardError;
