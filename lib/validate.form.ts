import { MutableRefObject, useCallback } from "react";
import { FormElementInstance } from "./types/form.elements";
import { FormElements } from "./form.elements";

export const validateForm = (
  content: FormElementInstance[],
  formValues: MutableRefObject<{
    [key: string]: string;
  }>,
  formErrors: MutableRefObject<{
    [key: string]: boolean;
  }>
) => {
  return useCallback(() => {
    for (const field of content) {
      const actualValue = formValues.current[field.id] || "";
      const isValid = FormElements[field.type].validate(field, actualValue);
      if (!isValid) formErrors.current[field.id] = true;
    }
    if (Object.keys(formErrors.current).length > 0) return false;
    return true;
  }, [content]);
};
