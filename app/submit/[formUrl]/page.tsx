import { getFormContentByUrl } from "@/actions/form";
import { Container } from "@/components/globals/container";
import FormSubmitComponent from "@/components/submit";
import { FormElementInstance } from "@/lib/types/form.elements";

export default async function SubmitForm({
  params,
}: {
  params: { formUrl: string };
}) {
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
