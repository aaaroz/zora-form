"use client";

import { signOut } from "next-auth/react";

export const ButtonLogout = () => {
  return <button onClick={() => signOut({ callbackUrl: "/" })}>Log out</button>;
};
