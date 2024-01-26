import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export const Logo = ({ className, withText }: { className?: string; withText?: boolean }) => {
  if (withText) {
    return (
      <Link href="/" className="flex text-lg font-bold items-center gap-3">
        <span>
          <Image
            src="/images/z-1.webp"
            alt="z"
            width={15}
            height={15}
            className={cn("w-auto h-auto block dark:hidden", className)}
          />
          <Image
            src="/images/z-2.webp"
            alt="z"
            width={15}
            height={15}
            className={cn("w-auto h-auto hidden dark:block", className)}
          />
        </span>
        <h1>z-form.</h1>
      </Link>
    );
  }
  return (
    <Link href="/" className="flex font-bold items-center gap-3">
      <span>
        <Image
          src="/images/z-1.webp"
          alt="z"
          width={15}
          height={15}
          className={cn("w-auto h-auto block dark:hidden", className)}
        />
        <Image
          src="/images/z-2.webp"
          alt="z"
          width={15}
          height={15}
          className={cn("w-auto h-auto hidden dark:block", className)}
        />
      </span>
    </Link>
  );
};
