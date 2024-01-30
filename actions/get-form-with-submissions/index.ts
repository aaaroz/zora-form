"use server";

import { getServerSession } from "next-auth";

import prisma from "@/lib/prisma";
import { UserNotFoundErr } from "../user.not.found.error";
import { authOptions } from "@/next.auth.options";

export async function getFormWithSubmissions(id: number) {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new UserNotFoundErr();
  }

  return await prisma.form.findUnique({
    where: {
      userId: session.user.id,
      id,
    },
    include: {
      FormSubmissions: true,
    },
  });
}
