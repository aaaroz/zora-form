"use client";

import { FormElementInstance } from "@/lib/types/form.elements";
import { CustomInstance } from ".";

export const FormComponent = ({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) => {
  const element = elementInstance as CustomInstance;
  const { height } = element.extraAttributes;
  return <div style={{ height, width: "100%" }} />;
};
