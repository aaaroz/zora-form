"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormElementInstance, TSubmitValue } from "@/lib/types/form.elements";
import { CustomInstance, NumberFieldFormElement } from ".";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

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
  const [value, setValue] = useState(defaultValue || "");
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsError(isInvalid === true);
  }, [isInvalid]);

  const element = elementInstance as CustomInstance;
  const { label, required, placeholder, helperText } = element.extraAttributes;
  return (
    <div className="flex flex-col gap-2 w-full">
      <Label className={cn(isError && "text-red-500")}>
        {label}
        {required ? <span className="text-red-500 text-xs"> *</span> : ""}
      </Label>
      <Input
        type="number"
        placeholder={placeholder}
        onChange={(e) => setValue(e.target.value)}
        onBlur={(e) => {
          if (!submitValue) return;
          const valid = NumberFieldFormElement.validate(
            elementInstance,
            e.target.value
          );
          setIsError(!valid);
          if (!valid) return;
          submitValue(element.id, value);
        }}
        value={value}
        className={cn(isError && "text-red-500 border-red-500")}
      />
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
  );
};
