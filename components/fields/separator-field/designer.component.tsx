import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { FormElementInstance } from "@/lib/types/form.elements";

export const DesignerComponent = ({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <Label className="text-sm text-muted-foreground">Separator Field</Label>
      <Separator />
    </div>
  );
};
