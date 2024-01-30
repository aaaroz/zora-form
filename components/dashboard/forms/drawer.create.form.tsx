"use client";

import { Dispatch, SetStateAction } from "react";
import { UseFormReturn } from "react-hook-form";

import { TFormSchema } from "@/schemas";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { BsFileEarmarkPlus } from "react-icons/bs";
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
import { ImSpinner2 } from "react-icons/im";

type Props = {
  form: UseFormReturn<
    {
      name: string;
      description?: string | undefined;
    },
    any,
    undefined
  >;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  onSubmit: (values: TFormSchema) => Promise<void>;
};

export const DrawerCreateForm = ({
  form,
  isOpen,
  setIsOpen,
  onSubmit,
}: Props) => {
  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button
          variant="outline"
          className="group w-full h-[30dvh] flex-col gap-2 hover:border-primary hover:cursor-pointer border-dashed"
        >
          <BsFileEarmarkPlus className="h-7 w-7 text-muted-foreground group-hover:text-primary" />
          <span className="text-base text-muted-foreground group-hover:text-primary">
            Create New Form
          </span>
        </Button>
      </DrawerTrigger>
      <DrawerContent className="p-5">
        <DrawerHeader className="p-5">
          <DrawerTitle>Create Form</DrawerTitle>
          <DrawerDescription>
            Start create your form to collect the responses
          </DrawerDescription>
        </DrawerHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="capitalize text-xs">name</FormLabel>
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
            <DrawerFooter>
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
            </DrawerFooter>
          </form>
        </Form>
      </DrawerContent>
    </Drawer>
  );
};
