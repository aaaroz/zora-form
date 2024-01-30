import { Metadata } from "next";

import FormDetail from "@/components/dashboard/form-detail";
import { getFormById } from "@/actions";

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = params.id;

  const form = await getFormById(Number(id));

  return {
    title: `${form?.name}` || "Form Detail",
  };
}
export default async function FormSubmissionsPage({ params }: Props) {
  const { id } = params;
  const form = await getFormById(Number(id));
  if (!form) throw new Error("Form not found!");

  return <FormDetail form={form} id={id} />;
}
