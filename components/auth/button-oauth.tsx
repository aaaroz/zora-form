"use client";

import { useState } from "react";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { signIn } from "next-auth/react";

import { Button } from "../ui/button";

export const ButtonOauth = ({ callbackUrl }: { callbackUrl: string }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  return (
    <div className="space-y-1">
      <Button
        variant="ghost"
        size="sm"
        className="w-full text-xs"
        disabled={isSubmitting}
        onClick={() => {
          setIsSubmitting((prev) => !prev);
          signIn("github", { callbackUrl });
        }}
      >
        <FaGithub className="w-5 h-5 mr-2" />
        Continue with Github
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className="w-full text-xs"
        disabled={isSubmitting}
        onClick={() => {
          setIsSubmitting((prev) => !prev);
          signIn("google", { callbackUrl });
        }}
      >
        <FaGoogle className="w-5 h-5 mr-2" />
        Continue with Google
      </Button>
    </div>
  );
};
