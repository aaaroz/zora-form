"use server";

import { getServerSession } from "next-auth";

import prisma from "@/lib/prisma";
import { authOptions } from "@/next.auth.options";
import { UserNotFoundErr } from "../user.not.found.error";

export async function getFormStats() {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new UserNotFoundErr();
  }

  const stats = await prisma.form.aggregate({
    where: {
      userId: session.user.id,
    },
    _sum: {
      visits: true,
      submissions: true,
    },
  });

  const visits = stats._sum.visits || 0;
  const submissions = stats._sum.submissions || 0;

  let submissionRate = 0;
  let bounceRate = 0;

  if (visits > 0) {
    submissionRate = (submissions / visits) * 100;
    bounceRate = 100 - submissionRate;
  }

  return {
    visits,
    submissions,
    submissionRate,
    bounceRate,
  };
}
