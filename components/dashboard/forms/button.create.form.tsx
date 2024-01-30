"use client";

import { Button } from "@/components/ui/button";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ImSpinner2 } from "react-icons/im";
import { toast } from "sonner";
import { BsFileEarmarkPlus } from "react-icons/bs";
import { useRouter } from "next/navigation";
import { createForm } from "@/actions";
import { FormSchema, TFormSchema } from "@/schemas";
import { DialogCreateForm } from "./dialog.create.form";
import { DrawerCreateForm } from "./drawer.create.form";

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
      <DialogCreateForm
        form={form}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onSubmit={onSubmit}
      />
    );
  }

  return (
    <DrawerCreateForm
      form={form}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      onSubmit={onSubmit}
    />
  );
};
