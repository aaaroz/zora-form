"use client";

import { Form } from "@prisma/client";
import { PreviewButton } from "./preview.button";
import { SaveButton } from "./save.button";
import { PublishButton } from "./publish.button";
import { BackButton } from "./back.button";
import Designer from "./designer";
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import DragOverlayWrapper from "./drag.overlay.wrapper";
import { useDesigner } from "@/lib/hooks";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { toast } from "sonner";
import { Button } from "../ui/button";
import Link from "next/link";
import Confetti from "react-confetti";

export default function FormBuilder({ form }: { form: Form }) {
  const [isReady, setIsReady] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const { setElements, setSelectedElement } = useDesigner();

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  });

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 300,
      tolerance: 5,
    },
  });

  const sensor = useSensors(mouseSensor, touchSensor);
  const shareUrl = `${window.location.origin}/submit/${form.shareUrl}`;

  useEffect(() => {
    if (isReady) return;
    const elements = JSON.parse(form.content);
    setElements(elements);
    setSelectedElement(null);
    setIsReady(true);
  }, [form, setElements, setSelectedElement, isReady]);

  if (!isReady) return null;
  if (form.published) {
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
  }
  return (
    <DndContext sensors={sensor}>
      <div className="flex flex-wrap justify-between p-4 gap-3 items-center">
        <BackButton />
        <h2 className="truncate font-medium">
          <span className="text-muted-foreground mr-2">Form :</span> {form.name}{" "}
          {isSaved ? "" : <span className="text-red-500">*</span>}
        </h2>
        <div className="flex flex-wrap items-center gap-2">
          <PreviewButton />
          {!form.published ? (
            <>
              <SaveButton id={form.id} setIsSaved={setIsSaved} />
              <PublishButton id={form.id} />
            </>
          ) : null}
        </div>
      </div>
      <div className="flex w-full flex-grow items-center justify-center rounded relative overflow-y-auto h-[90dvh] bg-accent bg-[url(/graph.paper.svg)] dark:bg-[url(/graph.paper.dark.svg)]">
        <Designer />
      </div>
      <DragOverlayWrapper />
    </DndContext>
  );
}
