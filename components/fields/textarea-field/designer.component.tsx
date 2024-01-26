import { Label } from "@/components/ui/label";
import { FormElementInstance } from "@/lib/types/form.elements";
import { CustomInstance } from ".";
import { Textarea } from "@/components/ui/textarea";

export const DesignerComponent = ({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) => {
  const element = elementInstance as CustomInstance;
  const { label, required, placeholder, helperText } = element.extraAttributes;
  return (
    <div className="flex flex-col gap-2 w-full">
      <Label>
        {label}
        {required ? <span className="text-red-500 text-xs"> *</span> : ""}
      </Label>
      <Textarea
        readOnly
        disabled
        placeholder={placeholder}
        className="min-h-1"
      />
      {helperText ? (
        <p className="text-xs text-muted-foreground">{helperText}</p>
      ) : null}
    </div>
  );
};
