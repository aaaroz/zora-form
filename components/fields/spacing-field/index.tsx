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
import { LuHeading1, LuSeparatorHorizontal } from "react-icons/lu";

const type: TElements = "SpacingField";

const extraAttributes = {
  height: 20,
};

export const PropertiesSchema = z.object({
  height: z.number().min(5).max(200),
});

export type TPropertiesSchema = z.infer<typeof PropertiesSchema>;

export type CustomInstance = FormElementInstance & {
  extraAttributes: typeof extraAttributes;
};

export const SpacingFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  designerButtonElement: {
    icon: LuSeparatorHorizontal,
    label: "Spacing Field",
  },
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,
  validate: (): boolean => {
    return true;
  },
};
