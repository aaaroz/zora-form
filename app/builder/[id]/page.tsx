import FormBuilder from "@/components/form-builder";
import { getFormById } from "@/actions/form";
import { Container } from "@/components/globals/container";

export default async function FormBuilderPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const form = await getFormById(Number(id));
  if (!form) throw new Error("Form not found!");
  return (
    <Container className="md:px-0">
      <FormBuilder form={form} />
    </Container>
  );
}
