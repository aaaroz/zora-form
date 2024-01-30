import { getForms } from "@/actions";
import { FormCard } from "./form.card";
import { Card } from "@/components/ui/card";

export const FormCards = async ({
  limit,
  published,
}: {
  limit?: number;
  published?: boolean;
}) => {
  const forms = await getForms();
  if (published) {
    const formsPublished = forms?.filter((form) => form.published);
    return (
      <>
        {formsPublished.map((form) => (
          <FormCard key={form.id} form={form} />
        ))}
        {!forms.length && !formsPublished.length ? (
          <Card className="p-0 flex items-center justify-center h-[30dvh]">
            <p>No forms found</p>
          </Card>
        ) : null}
      </>
    );
  }
  if (limit) {
    const formsLimited = forms?.slice(0, limit);
    return (
      <>
        {formsLimited.map((form) => (
          <FormCard key={form.id} form={form} />
        ))}
        {!forms.length && !formsLimited.length ? (
          <Card className="p-0 flex items-center justify-center h-[30dvh]">
            <p>No forms found</p>
          </Card>
        ) : null}
      </>
    );
  }
  return (
    <>
      {forms.map((form) => (
        <FormCard key={form.id} form={form} />
      ))}
      {!forms.length && !forms.length ? (
        <Card className="p-0 flex items-center justify-center h-[30dvh]">
          <p>No forms found</p>
        </Card>
      ) : null}
    </>
  );
};
