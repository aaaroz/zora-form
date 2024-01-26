"use server";

import prisma from "@/lib/prisma";
import { authOptions } from "@/next.auth.options";
import { FormSchema, TFormSchema } from "@/schemas/create-form-schema";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

class UserNotFoundErr extends Error {}

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

export async function createForm(data: TFormSchema) {
  const validation = FormSchema.safeParse(data);
  if (!validation.success) {
    throw new Error("form not valid");
  }

  const session = await getServerSession(authOptions);
  if (!session) {
    throw new UserNotFoundErr();
  }

  const { name, description } = data;

  const form = await prisma.form.create({
    data: {
      userId: session.user.id,
      name,
      description,
    },
  });

  if (!form) {
    throw new Error("something went wrong");
  }
  revalidatePath("/users/forms");
  return form.id;
}

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

export async function getFormById(id: number) {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new UserNotFoundErr();
  }

  return await prisma.form.findUnique({
    where: {
      userId: session.user.id,
      id,
    },
  });
}

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

export async function getFormContentByUrl(formUrl: string) {
  return await prisma.form.update({
    select: {
      content: true,
      userId: true,
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
