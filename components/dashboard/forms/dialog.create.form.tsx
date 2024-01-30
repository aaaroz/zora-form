"use client";

import * as React from "react";
import { UseFormReturn } from "react-hook-form";
import { BsFileEarmarkPlus } from "react-icons/bs";
import { ImSpinner2 } from "react-icons/im";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { TFormSchema } from "@/schemas";

export const DialogCreateForm = ({
  form,
  isOpen,
  setIsOpen,
  onSubmit,
}: {
  form: UseFormReturn<
    {
      name: string;
      description?: string | undefined;
    },
    any,
    undefined
  >;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit: (values: TFormSchema) => Promise<void>;
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="group w-full h-[30dvh] flex-col gap-2 hover:border-primary hover:cursor-pointer border-dashed"
        >
          <BsFileEarmarkPlus className="h-7 w-7 text-muted-foreground group-hover:text-primary" />
          <span className="text-base text-muted-foreground group-hover:text-primary">
            Create New Form
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Form</DialogTitle>
          <DialogDescription>
            Start create your form to collect the responses
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="capitalize text-xs">
                    name <span className="text-xs text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="name"
                      disabled={form.formState.isSubmitting}
                    />
                  </FormControl>
                  <FormMessage className="capitalize text-xs dark:text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="capitalize text-xs">
                    description
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      rows={5}
                      disabled={form.formState.isSubmitting}
                    />
                  </FormControl>
                  <FormMessage className="capitalize text-xs dark:text-red-500" />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                type="submit"
                disabled={form.formState.isSubmitting}
                className="w-full mt-4"
              >
                {form.formState.isSubmitting ? (
                  <ImSpinner2 className="animate-spin" />
                ) : (
                  "Create"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
