"use client";

import { FormElementInstance } from "@/lib/types/form.elements";
import { CustomInstance } from ".";

export const FormComponent = ({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) => {
  const element = elementInstance as CustomInstance;
  const { text } = element.extraAttributes;
  return <p className="text-sm">{text}</p>;
};
