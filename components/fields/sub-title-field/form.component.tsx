"use client";

import { FormElementInstance } from "@/lib/types/form.elements";
import { CustomInstance } from ".";

export const FormComponent = ({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) => {
  const element = elementInstance as CustomInstance;
  const { title } = element.extraAttributes;
  return <p className="text-lg">{title}</p>;
};
