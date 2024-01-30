"use client";
import { FormElementInstance } from "@/lib/types/form.elements";
import { Button } from "../ui/button";
import { FaPaperPlane } from "react-icons/fa";
import { useRef, useState, useTransition } from "react";
import { toast } from "sonner";
import { ImSpinner2 } from "react-icons/im";
import { submitForm } from "@/actions";
import { FormElements } from "@/lib/form.elements";
import { validateForm } from "@/lib/validate.form";

const FormSubmitComponent = ({
  formUrl,
  userId,
  content,
}: {
  formUrl: string;
  userId: string;
  content: FormElementInstance[];
}) => {
  const formValues = useRef<{ [key: string]: string }>({});
  const formErrors = useRef<{ [key: string]: boolean }>({});
  const [renderKey, setRenderKey] = useState(Math.random());
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, startTransition] = useTransition();

  const submitValue = (key: string, value: string) => {
    formValues.current[key] = value;
  };

  const handleSubmit = async () => {
    formErrors.current = {};
    const formIsValid = validateForm(content, formValues, formErrors);
    if (!formIsValid) {
      setRenderKey(Math.random());
      toast.error("Form is invalid");
      return;
    }

    try {
      const jsonContent = JSON.stringify(formValues.current);
      await submitForm(formUrl, jsonContent, userId);
    } catch (err) {
      toast.error("Something went wrong" + err);
      console.error(err);
    } finally {
      setIsSubmitted(true);
    }
  };

  if (isSubmitted) {
    return (
      <div className="flex justify-center w-full h-[90dvh] items-center p-2 md:p-8">
        <div className="max-w-xl flex flex-col gap-4 flex-grow bg-background w-full p-8 overflow-y-auto border shadow-lg rounded">
          <h1 className="text-2xl font-bold">Form submitted!</h1>
          <p className="text-muted-foreground">
            Thank you for your submission, you can close this page now!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center w-full items-center p-2 md:p-8">
      <div
        key={renderKey}
        className="max-w-xl flex flex-col gap-4 flex-grow bg-background w-full p-8 overflow-y-auto border shadow-lg rounded"
      >
        {content.map((element) => {
          const FormElement = FormElements[element.type].formComponent;
          return (
            <FormElement
              key={element.id}
              elementInstance={element}
              submitValue={submitValue}
              isInvalid={formErrors.current[element.id]}
              defaultValue={formValues.current[element.id]}
            />
          );
        })}
        <Button
          className="gap-3"
          onClick={() => startTransition(handleSubmit)}
          disabled={loading}
        >
          {loading ? <ImSpinner2 className="animate-spin" /> : <FaPaperPlane />}
          <span>Submit</span>
        </Button>
      </div>
    </div>
  );
};

export default FormSubmitComponent;
