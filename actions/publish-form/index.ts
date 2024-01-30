"use server";

import { getServerSession } from "next-auth";

import prisma from "@/lib/prisma";
import { UserNotFoundErr } from "../user.not.found.error";
import { authOptions } from "@/next.auth.options";

export async function publishForm(id: number) {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new UserNotFoundErr();
  }

  return await prisma.form.update({
    data: {
      published: true,
    },
    where: {
      userId: session.user.id,
      id,
    },
  });
}
