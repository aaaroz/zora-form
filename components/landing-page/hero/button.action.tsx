import { Button } from "@/components/ui/button";
import Link from "next/link";

export const ButtonAction = () => {
  return (
    <div className="flex flex-col items-center justify-center py-14">
      <div className="flex">
        <Button variant="default" className="px-5" asChild>
          <Link href="/auth/login">Get started</Link>
        </Button>
        <Button variant="link" asChild>
          <Link href="#features">Discover more &rarr; </Link>
        </Button>
      </div>
      <p className="text-sm text-muted-foreground mt-10">
        Feel free to start with us, it{"'"}s free!
      </p>
    </div>
  );
};
