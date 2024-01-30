"use client";

import { Active, DragOverlay, useDndMonitor } from "@dnd-kit/core";
import { useState } from "react";
import { useDesigner } from "@/lib/hooks";
import { FormElements } from "@/lib/form.elements";
import { SidebarButtonElementDragOverlay } from "./designer/sidebar.button.element.drag.overlay";

const DragOverlayWrapper = () => {
  const { elements } = useDesigner();
  const [draggedItem, setDraggedItem] = useState<Active | null>(null);
  useDndMonitor({
    onDragStart: (event) => {
      setDraggedItem(event.active);
    },
    onDragCancel: () => {
      setDraggedItem(null);
    },
    onDragEnd: () => {
      setDraggedItem(null);
    },
  });

  let node = <div>No drag overlay</div>;

  const isSidebarButtonElement =
    draggedItem && draggedItem.data.current?.isDesignerButtonElement;

  if (isSidebarButtonElement) {
    const type = draggedItem.data.current?.type as keyof typeof FormElements;
    node = <SidebarButtonElementDragOverlay formElement={FormElements[type]} />;
  }

  const isDesignerElement = draggedItem?.data?.current?.isDesignerElement;
  if (isDesignerElement) {
    const elementId = draggedItem.data?.current?.elementId;
    const element = elements.find((el) => el.id === elementId);
    if (!element) node = <div>Element not found!</div>;
    else {
      const DesignerElementComponent =
        FormElements[element.type].designerComponent;

      node = (
        <div className="flex bg-accent border rounded-md h-[16dvh] w-full py-2 px-4 opacity-80 pointer pointer-events-none">
          <DesignerElementComponent elementInstance={element} />
        </div>
      );
    }
  }

  return <DragOverlay>{node}</DragOverlay>;
};
export default DragOverlayWrapper;
