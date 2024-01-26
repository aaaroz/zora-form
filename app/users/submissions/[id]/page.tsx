import { getFormById } from "@/actions/form";
import FormDetail from "@/components/dashboard/form-detail";

export default async function FormSubmissionsPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const form = await getFormById(Number(id));
  if (!form) throw new Error("Form not found!");

  return <FormDetail form={form} id={id} />;
}
