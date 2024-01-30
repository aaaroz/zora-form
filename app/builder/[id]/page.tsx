import { Metadata } from "next";

import FormBuilder from "@/components/form-builder";
import { getFormById } from "@/actions";
import { Container } from "@/components/globals/container";

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = params.id;

  const form = await getFormById(Number(id));

  return {
    title: `${form?.name}` || "Form Builder",
  };
}

export default async function FormBuilderPage({ params }: Props) {
  const { id } = params;
  const form = await getFormById(Number(id));
  if (!form) throw new Error("Form not found!");
  return (
    <Container className="md:px-0">
      <FormBuilder form={form} />
    </Container>
  );
}
