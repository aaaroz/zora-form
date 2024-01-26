"use client";

import {
  FormElement,
  FormElementInstance,
  TElements,
} from "@/lib/types/form.elements";
import { z } from "zod";
import { DesignerComponent } from "./designer.component";
import { FormComponent } from "./form.component";
import { PropertiesComponent } from "./properties.component";
import { BsTextareaResize } from "react-icons/bs";

const type: TElements = "TextAreaField";

const extraAttributes = {
  label: "Text Area Field",
  helperText: "Helper Text",
  required: false,
  placeholder: "Value here...",
  rows: 3,
};

export const PropertiesSchema = z.object({
  label: z.string().min(2).max(50),
  helperText: z.string().max(200),
  required: z.boolean().default(false),
  placeholder: z.string().max(50),
  rows: z.number().min(1).max(10),
});

export type TPropertiesSchema = z.infer<typeof PropertiesSchema>;

export type CustomInstance = FormElementInstance & {
  extraAttributes: typeof extraAttributes;
};

export const TextAreaFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  designerButtonElement: {
    icon: BsTextareaResize,
    label: "TextArea Field",
  },
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,
  validate: (
    formElement: FormElementInstance,
    currentValue: string
  ): boolean => {
    const element = formElement as CustomInstance;
    if (element.extraAttributes.required) {
      return currentValue.length > 0;
    }
    return true;
  },
};
