import { Label } from "@/components/ui/label";
import { FormElementInstance } from "@/lib/types/form.elements";
import { CustomInstance } from ".";

export const DesignerComponent = ({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) => {
  const element = elementInstance as CustomInstance;
  const { text } = element.extraAttributes;
  return (
    <div className="flex flex-col gap-2 w-full">
      <Label className="text-sm text-muted-foreground">Paragraph Field</Label>
      <p className="text-sm">{text}</p>
    </div>
  );
};
