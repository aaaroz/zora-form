"use client";

import { useState } from "react";
import { FormElementInstance, FormElements } from "@/lib/types/form.elements";
import { useDraggable, useDroppable } from "@dnd-kit/core";
import { Button } from "@/components/ui/button";
import { BiSolidTrash } from "react-icons/bi";
import { useDesigner } from "@/lib/hooks";
import { cn } from "@/lib/utils";

export const DesignerElementWrapper = ({
  element,
}: {
  element: FormElementInstance;
}) => {
  const [isMouseOver, setIsMouseOver] = useState(false);
  const { removeElement, setSelectedElement } = useDesigner();
  const DesignerELement = FormElements[element.type].designerComponent;
  const topHalf = useDroppable({
    id: element.id + "-top",
    data: {
      type: element.type,
      elementId: element.id,
      isTopHalfDesignerElement: true,
    },
  });

  const bottomHalf = useDroppable({
    id: element.id + "-bottom",
    data: {
      type: element.type,
      elementId: element.id,
      isBottomHalfDesignerElement: true,
    },
  });

  const draggable = useDraggable({
    id: element.id + "-drag-handler",
    data: {
      type: element.type,
      elementId: element.id,
      isDesignerElement: true,
    },
  });

  if (draggable.isDragging) return null;
  return (
    <div
      ref={draggable.setNodeRef}
      {...draggable.listeners}
      {...draggable.attributes}
      onMouseEnter={() => setIsMouseOver(true)}
      onMouseLeave={() => setIsMouseOver(false)}
      onClick={(e) => {
        e.stopPropagation();
        setSelectedElement(element);
      }}
      className="relative h-[17dvh] max-h-[17dvh] flex flex-col text-foreground hover:cursor-pointer rounded-md ring-1 ring-accent ring-inset border"
    >
      <div
        ref={topHalf.setNodeRef}
        className="absolute w-full h-1/2 rounded-t-md"
      ></div>
      <div
        ref={bottomHalf.setNodeRef}
        className="absolute w-full bottom-0 h-1/2 rounded-b-md"
      ></div>
      {isMouseOver ? (
        <>
          <div className="absolute right-0 h-full">
            <Button
              variant="outline"
              onClick={(e) => {
                e.stopPropagation();
                removeElement(element.id);
              }}
              className="flex justify-center items-center h-full border rounded-md rounded-l-none bg-destructive text-destructive-foreground hover:text-destructive hover:bg-destructive-foreground"
            >
              <BiSolidTrash className="h-5 w-5" />
            </Button>
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse">
            <p className="text-muted-foreground text-sm">
              Click for properties or drag to move
            </p>
          </div>
        </>
      ) : null}
      {topHalf.isOver ? (
        <div className="absolute top-0 w-full rounded-md h-2 bg-primary rounded-b-none" />
      ) : null}
      <div
        className={cn(
          "flex w-full h-[17dvh] max-h-[17dvh] items-center rounded-md bg-accent/60 px-4 py-2 pointer-events-none",
          isMouseOver ? "opacity-30" : "opacity-100"
        )}
      >
        <DesignerELement elementInstance={element} />
      </div>
      {bottomHalf.isOver ? (
        <div className="absolute bottom-0 w-full rounded-md h-2 bg-primary rounded-t-none" />
      ) : null}
    </div>
  );
};
