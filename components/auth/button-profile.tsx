"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { MdPersonOutline } from "react-icons/md";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { ButtonLogout } from "./button-logout";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Separator } from "../ui/separator";

export const ButtonProfile = () => {
  const session = useSession();
  const pathname = usePathname();
  const arrPathname = pathname?.split("/");
  const imageUrl = session.data?.user.image as string;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt="z"
              width={20}
              height={20}
              className="rounded-full"
            />
          ) : (
            <MdPersonOutline className="w-6 h-6" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        alignOffset={5}
        className="p-2 min-w-[45dvh] max-w-[50dvh]"
      >
        <div className="p-3 flex gap-3">
          <Avatar>
            <AvatarImage src={imageUrl} alt="z" />
            <AvatarFallback>
              {session.data?.user.name
                ?.split(" ")
                .map((i) => i[0])
                ?.join("")}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <h1 className="text-sm md:text-base font-bold line-clamp-2">
              Welcome, {session.data?.user?.name} !
            </h1>
            <p className="text-xs text-muted-foreground">
              {session.data?.user?.email}
            </p>
          </div>
        </div>
        <Separator className="my-3" />
        <div className="flex flex-col gap-2">
          {arrPathname[1] !== "users" && (
            <Button size="sm" asChild>
              <Link href="/users/dashboard">Dashboard</Link>
            </Button>
          )}
          <ButtonLogout />
        </div>
      </PopoverContent>
    </Popover>
  );
};
