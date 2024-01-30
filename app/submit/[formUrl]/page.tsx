import { Metadata } from "next";

import FormSubmitComponent from "@/components/submit";
import { getFormContentByUrl } from "@/actions";
import { Container } from "@/components/globals/container";
import { FormElementInstance } from "@/lib/types/form.elements";

type Props = {
  params: { formUrl: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const form = await getFormContentByUrl(params.formUrl);

  return {
    title: `${form?.name}` || "Form Builder",
  };
}

export default async function SubmitFormPage({ params }: Props) {
  const form = await getFormContentByUrl(params.formUrl);
  if (!form) throw new Error("Form not found!");

  const formContent = JSON.parse(form.content) as FormElementInstance[];
  return (
    <Container>
      <FormSubmitComponent
        formUrl={params.formUrl}
        content={formContent}
        userId={form.userId}
      />
    </Container>
  );
}
