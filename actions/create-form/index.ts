"use server";

import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

import prisma from "@/lib/prisma";
import { authOptions } from "@/next.auth.options";
import { UserNotFoundErr } from "../user.not.found.error";
import { FormSchema, TFormSchema } from "@/schemas";

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
