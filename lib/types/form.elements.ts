import { ElementType, FC } from "react";

import { TextFieldFormElement } from "@/components/fields/text-field";
import { TitleFieldFormElement } from "@/components/fields/title-field";
import { SubTitleFieldFormElement } from "@/components/fields/sub-title-field";
import { ParagraphFieldFormElement } from "@/components/fields/paragraph-field";
import { SeparatorFieldFormElement } from "@/components/fields/separator-field";
import { SpacingFieldFormElement } from "@/components/fields/spacing-field";
import { NumberFieldFormElement } from "@/components/fields/number-field";
import { TextAreaFieldFormElement } from "@/components/fields/textarea-field";
import { DateFieldFormElement } from "@/components/fields/date-field";
import { SelectFieldFormElement } from "@/components/fields/select-field";
import { CheckboxFieldFormElement } from "@/components/fields/checkbox-field";

export type TElements =
  | "TitleField"
  | "SubTitleField"
  | "ParagraphField"
  | "SeparatorField"
  | "SpacingField"
  | "TextField"
  | "NumberField"
  | "TextAreaField"
  | "DateField"
  | "SelectField"
  | "CheckboxField";

export type TSubmitValue = (key: string, value: string) => void;

export type FormElement = {
  type: TElements;

  construct: (id: string) => FormElementInstance;

  designerButtonElement: {
    icon: ElementType;
    label: string;
  };

  designerComponent: FC<{
    elementInstance: FormElementInstance;
  }>;
  formComponent: FC<{
    elementInstance: FormElementInstance;
    submitValue?: TSubmitValue;
    isInvalid?: boolean;
    defaultValue?: string;
  }>;
  propertiesComponent: FC<{
    elementInstance: FormElementInstance;
  }>;

  validate: (formElement: FormElementInstance, currentValue: string) => boolean;
};

export type FormElementInstance = {
  id: string;
  type: TElements;
  extraAttributes?: Record<string, any>;
};

type TFormElements = {
  [key in TElements]: FormElement;
};

export const FormElements: TFormElements = {
  TextField: TextFieldFormElement,
  TitleField: TitleFieldFormElement,
  SubTitleField: SubTitleFieldFormElement,
  ParagraphField: ParagraphFieldFormElement,
  SeparatorField: SeparatorFieldFormElement,
  SpacingField: SpacingFieldFormElement,
  NumberField: NumberFieldFormElement,
  TextAreaField: TextAreaFieldFormElement,
  DateField: DateFieldFormElement,
  SelectField: SelectFieldFormElement,
  CheckboxField: CheckboxFieldFormElement,
};
