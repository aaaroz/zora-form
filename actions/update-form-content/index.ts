"use server";

import { getServerSession } from "next-auth";

import prisma from "@/lib/prisma";
import { authOptions } from "@/next.auth.options";
import { UserNotFoundErr } from "../user.not.found.error";

export async function updateFormContent(id: number, jsonContent: string) {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new UserNotFoundErr();
  }

  return await prisma.form.update({
    where: {
      userId: session.user.id,
      id,
    },
    data: {
      content: jsonContent,
    },
  });
}
