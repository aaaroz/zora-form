"use client";

import { Label } from "@/components/ui/label";
import { FormElementInstance, TSubmitValue } from "@/lib/types/form.elements";
import { CustomInstance, SelectFieldFormElement } from ".";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  const { label, required, placeholder, helperText, options } =
    element.extraAttributes;
  return (
    <div className="flex flex-col gap-2 w-full">
      <Label className={cn(isError && "text-red-500")}>
        {label}
        {required ? <span className="text-red-500 text-xs"> *</span> : ""}
      </Label>
      <Select
        defaultValue={value}
        onValueChange={(value) => {
          setValue(value);
          if (!submitValue) return;
          const isValid = SelectFieldFormElement.validate(element, value);
          setIsError(!isValid);
          submitValue(element.id, value);
        }}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option, i) => (
            <SelectItem key={i} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
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
