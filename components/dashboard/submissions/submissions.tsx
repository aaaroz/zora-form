import { FormElementInstance, TElements } from "@/lib/types/form.elements";
import { getFormWithSubmissions } from "@/actions";
import { SubmissionsTable } from "./submissions.table";

export type Row = {
  [key: string]: string;
} & {
  submittedAt: Date;
};

export type Columns = {
  id: string;
  label: string | undefined;
  required: boolean;
  type: TElements;
};

export type Submissions = Record<string, string>;

export const Submissions = async ({ id }: { id: number }) => {
  const form = await getFormWithSubmissions(id);
  if (!form) {
    throw new Error("Form not found!");
  }

  const formElements = JSON.parse(form.content) as FormElementInstance[];
  const columns: Columns[] = [];

  formElements.forEach((element) => {
    switch (element.type) {
      case "TextField":
      case "NumberField":
      case "TextAreaField":
      case "DateField":
      case "SelectField":
      case "CheckboxField":
        columns.push({
          id: element.id,
          label: element.extraAttributes?.label,
          required: element.extraAttributes?.required,
          type: element.type,
        });
        break;
      default:
        break;
    }
  });

  const rows: Row[] = [];
  form.FormSubmissions.forEach((submission) => {
    const content = JSON.parse(submission.content);
    rows.push({
      ...content,
      submitted_at: submission.createdAt,
    });
  });

  return (
    <div className="py-4 space-y-2">
      <SubmissionsTable columns={columns} rows={rows} />
    </div>
  );
};
