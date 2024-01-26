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
import { LuHeading1 } from "react-icons/lu";
import { BsTextParagraph } from "react-icons/bs";

const type: TElements = "ParagraphField";

const extraAttributes = {
  text: "Text Here",
};

export const PropertiesSchema = z.object({
  text: z.string().min(2).max(500),
});

export type TPropertiesSchema = z.infer<typeof PropertiesSchema>;

export type CustomInstance = FormElementInstance & {
  extraAttributes: typeof extraAttributes;
};

export const ParagraphFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  designerButtonElement: {
    icon: BsTextParagraph,
    label: "Paragraph Field",
  },
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,
  validate: (): boolean => {
    return true;
  },
};
