"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import { useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown.menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";
import { ButtonLogout } from "./button-logout";
import { usePathname } from "next/navigation";
import { MdOutlinePerson, MdPersonOutline } from "react-icons/md";

export const ButtonProfile = () => {
  const session = useSession();
  const pathname = usePathname();
  const arrPathname = pathname?.split("/");
  const imageUrl = session.data?.user.image as string;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
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
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" alignOffset={5}>
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
            <h1 className="text-sm md:text-base font-bold">
              Welcome, {session.data?.user?.name} !
            </h1>
            <p className="text-xs text-muted-foreground">
              {session.data?.user?.email}
            </p>
          </div>
        </div>
        <DropdownMenuSeparator />
        {arrPathname[1] !== "users" && (
          <DropdownMenuItem asChild>
            <Link href="/users/dashboard">Dashboard</Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem>
          <ButtonLogout />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
