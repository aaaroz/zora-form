import { TFormElements } from "./types/form.elements";
import { CheckboxFieldFormElement } from "@/components/fields/checkbox-field";
import { DateFieldFormElement } from "@/components/fields/date-field";
import { NumberFieldFormElement } from "@/components/fields/number-field";
import { ParagraphFieldFormElement } from "@/components/fields/paragraph-field";
import { SelectFieldFormElement } from "@/components/fields/select-field";
import { SeparatorFieldFormElement } from "@/components/fields/separator-field";
import { SpacingFieldFormElement } from "@/components/fields/spacing-field";
import { SubTitleFieldFormElement } from "@/components/fields/sub-title-field";
import { TextAreaFieldFormElement } from "@/components/fields/textarea-field";
import { TextFieldFormElement } from "@/components/fields/text-field";
import { TitleFieldFormElement } from "@/components/fields/title-field";

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
