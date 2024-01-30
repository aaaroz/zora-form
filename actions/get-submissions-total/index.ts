"use server";

import { getServerSession } from "next-auth";

import prisma from "@/lib/prisma";
import { UserNotFoundErr } from "../user.not.found.error";
import { authOptions } from "@/next.auth.options";

export async function getSubmissionsTotal() {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new UserNotFoundErr();
  }

  return await prisma.formSubmissions.findMany({
    where: {
      userId: session.user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}
