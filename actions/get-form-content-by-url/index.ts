"use server";

import prisma from "@/lib/prisma";

export async function getFormContentByUrl(formUrl: string, visit?: boolean) {
  if (visit) {
    return await prisma.form.update({
      select: {
        content: true,
        userId: true,
        name: true,
      },
      data: {
        visits: {
          increment: 1,
        },
      },
      where: {
        shareUrl: formUrl,
      },
    });
  }
  return await prisma.form.findUnique({
    where: {
      shareUrl: formUrl,
    },
  });
}
