"use client";

import { createForm } from "@/actions/form";
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
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
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
import { useMediaQuery } from "@/lib/hooks";
import { FormSchema, TFormSchema } from "@/schemas/create-form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ImSpinner2 } from "react-icons/im";
import { toast } from "sonner";
import { BsFileEarmarkPlus } from "react-icons/bs";
import { useRouter } from "next/navigation";

export const ButtonCreateForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const router = useRouter();

  const form = useForm<TFormSchema>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const onSubmit = async (values: TFormSchema) => {
    try {
      const formId = await createForm(values);
      toast.success(`Form created successfully, with name '${values.name}'`);
      router.push(`/builder/${formId}`);
      setIsOpen(false);
      form.reset();
    } catch (error) {
      toast.error("Something went wrong, try again later!");
      console.error(error);
      setIsOpen(false);
    }
  };

  if (isDesktop) {
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
  }

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
