"use client";

import { MdOutlinePublish } from "react-icons/md";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { useTransition } from "react";
import { toast } from "sonner";
import { FaSpinner } from "react-icons/fa";
import { publishForm } from "@/actions/form";
import { useRouter } from "next/navigation";

export const PublishButton = ({ id }: { id: number }) => {
  const [loading, startTransition] = useTransition();
  const router = useRouter();
  const publish = async () => {
    try {
      toast.promise(publishForm(id), {
        loading: "Publishing...",
        success: "Form published successfully!",
        error: "Failed to publish form!",
        finally: () => {
          router.refresh();
        },
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to publish form");
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size="sm" className="gap-2">
          <MdOutlinePublish className="h-4 w-4" />
          Publish
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. After publishing you will not be able
            to edit this form.
          </AlertDialogDescription>
          <AlertDialogDescription>
            <span className="font-medium">
              By publishing this form you will make it available to the public
              and you will be able to collect submissions.
            </span>
          </AlertDialogDescription>
          <AlertDialogDescription>
            <span className="font-bold text-foreground">
              Make sure to save your changes before proceeding !
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={loading}
            onClick={(e) => {
              e.preventDefault();
              startTransition(publish);
            }}
          >
            Proceed
            {loading && <FaSpinner className="animate-spin" />}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
