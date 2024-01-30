import { ElementType, FC } from "react";

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

export type TFormElements = {
  [key in TElements]: FormElement;
};
