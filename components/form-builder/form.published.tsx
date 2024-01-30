"use client";
import Confetti from "react-confetti";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "sonner";
import Link from "next/link";
import { Form } from "@prisma/client";

export const FormPublished = ({
  form,
  shareUrl,
}: {
  form: Form;
  shareUrl: string;
}) => {
  return (
    <>
      <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
        recycle={false}
        numberOfPieces={1000}
      />
      <div className="flex flex-col items-center justify-center h-full w-full">
        <div className="max-w-md mt-20">
          <h1 className="text-center text-4xl font-bold text-primary border-b pb-2 mb-10">
            🚀 FORM PUBLISHED! 🚀
          </h1>
          <h2 className="text-2xl">Share this form</h2>
          <h3 className="text-lg text-muted-foreground border-b pb-10">
            Anyone with the link can visit and submit this form.
          </h3>
          <div className="my-4 flex flex-col gap-2 items-center w-full border-b pb-4">
            <Input className="w-full" readOnly value={shareUrl} />
            <Button
              className="w-full mt-2"
              onClick={() => {
                navigator.clipboard.writeText(shareUrl);
                toast.success("Copied to clipboard");
              }}
            >
              Copy to clipboard
            </Button>
          </div>
          <div className="flex justify-between">
            <Button variant="link" asChild>
              <Link href="/users/dashboard"> &larr; Back to dashboard</Link>
            </Button>
            <Button variant="link" asChild>
              <Link href={`/users/submissions/${form.id}`}>
                Go to form details &rarr;
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
