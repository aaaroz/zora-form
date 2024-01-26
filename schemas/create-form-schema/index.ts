import * as z from "zod";

export const FormSchema = z.object({
  name: z.string().min(4),
  description: z.string().optional(),
});

export type TFormSchema = z.infer<typeof FormSchema>;
