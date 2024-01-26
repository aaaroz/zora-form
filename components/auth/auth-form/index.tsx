"use client";

import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import { Logo } from "@/components/globals/logo";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ButtonOauth } from "../button-oauth";
import { AuthErrorDialog } from "./auth-error-dialog";
import { LoginSchema, TLoginSchema } from "@/schemas";
import { ImSpinner2 } from "react-icons/im";

const AuthForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/users/dashboard";
  const urlErrorMessage =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email already in use with different provider!"
      : "";

  const form = useForm<TLoginSchema>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (value: TLoginSchema) => {
    const { email } = value;

    return signIn("email", { email: email, callbackUrl });
  };

  const checkError = useCallback(() => {
    if (urlErrorMessage) {
      setIsOpen(true);
      return;
    }
    return;
  }, [urlErrorMessage]);

  useEffect(() => {
    checkError();
  }, [checkError]);

  return (
    <div className="flex flex-col items-center">
      <AuthErrorDialog
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        errorMessage={urlErrorMessage}
      />
      <Card className="pt-20 flex flex-col w-full max-w-[55dvh] border-none">
        <CardHeader className="flex items-center gap-5">
          <Logo className="p-3 rounded border-2 border-primary" />
          <h1 className="font-semibold text-2xl">Welcome Back!</h1>
        </CardHeader>
        <CardContent className="px-0 py-7 space-y-1">
          <ButtonOauth callbackUrl={callbackUrl} />
          <div className="flex items-center gap-4 pt-3 justify-center">
            <Separator className="w-1/4" />
            <span className="place-items-center text-xs">Or continue with</span>
            <Separator className="w-1/4" />
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-5 px-2"
            >
              <div className="pt-5 space-y-1">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="capitalize text-xs">
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          disabled={form.formState.isSubmitting}
                        />
                      </FormControl>
                      <FormMessage className="capitalize text-xs dark:text-red-500" />
                    </FormItem>
                  )}
                />
              </div>
              <Button
                type="submit"
                size="sm"
                className="w-full text-sm"
                disabled={form.formState.isSubmitting}
              >
                Continue{" "}
                {form.formState.isSubmitting ? (
                  <ImSpinner2 className="ml-3 animate-spin" />
                ) : (
                  ""
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <p className="text-xs text-center">
            By clicking {"“"}Continue{"”"} above, you acknowledge that you have
            read and understood, and agree to Z-form{"'"}s Terms of Use and
            Privacy Policy.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AuthForm;
