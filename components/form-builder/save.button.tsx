"use client";

import { useDesigner } from "@/lib/hooks";
import { Button } from "../ui/button";
import { FaSave, FaSpinner } from "react-icons/fa";
import { updateFormContent } from "@/actions/form";
import { toast } from "sonner";
import { Dispatch, SetStateAction, useTransition } from "react";

export const SaveButton = ({
  id,
  setIsSaved,
}: {
  id: number;
  setIsSaved: Dispatch<SetStateAction<boolean>>;
}) => {
  const [loading, startTransition] = useTransition();
  const { elements } = useDesigner();

  const saveFormContent = async () => {
    try {
      const jsonElements = JSON.stringify(elements);
      toast.promise(updateFormContent(id, jsonElements), {
        loading: "Saving...",
        success: "Form saved successfully!",
        error: "Failed to save form content!",
        finally: () => {
          setIsSaved(true);
        },
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to save form content");
    }
  };
  return (
    <Button
      size="sm"
      variant="outline"
      className="gap-2"
      disabled={loading}
      onClick={() => {
        startTransition(saveFormContent);
      }}
    >
      <FaSave className="h-4 w-4" />
      Save
      {loading && <FaSpinner className="animate-spin" />}
    </Button>
  );
};
