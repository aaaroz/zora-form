import Link from "next/link";
import { GithubIcon } from "lucide-react";

import { Button } from "../ui/button";

export const ButtonGithub = () => {
  return (
    <Button variant="ghost" size="icon" asChild>
      <Link href="https://github.com/aaaroz" target="_blank">
        <GithubIcon size={20} />
      </Link>
    </Button>
  );
};
