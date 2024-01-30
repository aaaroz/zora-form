"use server";

import prisma from "@/lib/prisma";

export async function submitForm(
  formUrl: string,
  content: string,
  userId: string
) {
  return await prisma.form.update({
    data: {
      submissions: {
        increment: 1,
      },
      FormSubmissions: {
        create: {
          content,
          userId,
        },
      },
    },
    where: {
      shareUrl: formUrl,
      published: true,
    },
  });
}
