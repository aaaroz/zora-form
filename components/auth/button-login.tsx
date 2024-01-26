import Link from "next/link";
import { Button } from "../ui/button";

export const ButtonLogin = () => {
  return (
    <Button
      variant="ghost"
      size="sm"
      className="text-muted-foreground hover:font-semibold hover:bg-transparent transition-all duration-300"
      asChild
    >
      <Link href="/auth/login">Login</Link>
    </Button>
  );
};
