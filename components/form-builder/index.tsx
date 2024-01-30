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
import { FormPublished } from "./form.published";

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
    return <FormPublished form={form} shareUrl={shareUrl} />;
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
      <div className="flex w-full flex-grow items-center justify-center rounded relative h-[90dvh] bg-accent bg-[url(/graph.paper.svg)] dark:bg-[url(/graph.paper.dark.svg)] overflow-y-auto">
        <Designer />
      </div>
      <DragOverlayWrapper />
    </DndContext>
  );
}
