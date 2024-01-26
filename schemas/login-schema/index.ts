import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "email is required!",
  }),
});

export type TLoginSchema = z.infer<typeof LoginSchema>;
