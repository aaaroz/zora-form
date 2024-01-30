"use server";

import { getServerSession } from "next-auth";

import prisma from "@/lib/prisma";
import { authOptions } from "@/next.auth.options";
import { UserNotFoundErr } from "../user.not.found.error";

export async function getForms() {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new UserNotFoundErr();
  }

  return await prisma.form.findMany({
    where: {
      userId: session.user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}
