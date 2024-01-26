"use client";

import { MdTextFields } from "react-icons/md";

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

const type: TElements = "TitleField";

const extraAttributes = {
  title: "Title Field",
};

export const PropertiesSchema = z.object({
  title: z.string().min(2).max(50),
});

export type TPropertiesSchema = z.infer<typeof PropertiesSchema>;

export type CustomInstance = FormElementInstance & {
  extraAttributes: typeof extraAttributes;
};

export const TitleFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  designerButtonElement: {
    icon: LuHeading1,
    label: "Title Field",
  },
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,
  validate: (): boolean => {
    return true;
  },
};
