"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormElementInstance, TSubmitValue } from "@/lib/types/form.elements";
import { CheckboxFieldFormElement, CustomInstance } from ".";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";

export const FormComponent = ({
  elementInstance,
  submitValue,
  isInvalid,
  defaultValue,
}: {
  elementInstance: FormElementInstance;
  submitValue?: TSubmitValue;
  isInvalid?: boolean;
  defaultValue?: string;
}) => {
  const [value, setValue] = useState(defaultValue === "true" ? true : false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsError(isInvalid === true);
  }, [isInvalid]);

  const element = elementInstance as CustomInstance;
  const { label, required, placeholder, helperText } = element.extraAttributes;
  const id = `checkbox-${element.id}`;
  return (
    <div className="flex items-top space-x-2">
      <Checkbox
        id={id}
        checked={value}
        className={cn(isError && "border-red-500")}
        onCheckedChange={(checked) => {
          let value = false;
          if (checked === true) value = true;

          setValue(value);
          if (!submitValue) return;

          const stringValue = value ? "true" : "false";
          const isValid = CheckboxFieldFormElement.validate(
            element,
            stringValue
          );
          setIsError(!isValid);
          submitValue(element.id, stringValue);
        }}
      />
      <div className="grid gap-1.5 leading-none">
        <Label htmlFor={id} className={cn(isError && "text-red-500")}>
          {label}
          {required ? <span className="text-red-500 text-xs"> *</span> : ""}
        </Label>
        {helperText ? (
          <p
            className={cn(
              "text-xs text-muted-foreground",
              isError && "text-red-500"
            )}
          >
            {helperText}
          </p>
        ) : null}
      </div>
    </div>
  );
};
