import { Label } from "@/components/ui/label";
import { FormElementInstance } from "@/lib/types/form.elements";
import { CustomInstance } from ".";
import { Checkbox } from "@/components/ui/checkbox";

export const DesignerComponent = ({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) => {
  const element = elementInstance as CustomInstance;
  const { label, required, helperText } = element.extraAttributes;
  const id = `checkbox-${element.id}`;
  return (
    <div className="flex items-top space-x-2">
      <Checkbox id={id} />
      <div className="grid gap-1.5 leading-none">
        <Label htmlFor={id}>
          {label}
          {required ? <span className="text-red-500 text-xs"> *</span> : ""}
        </Label>
        {helperText ? (
          <p className="text-xs text-muted-foreground">{helperText}</p>
        ) : null}
      </div>
    </div>
  );
};
