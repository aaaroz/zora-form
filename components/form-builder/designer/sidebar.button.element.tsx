import { Button } from "@/components/ui/button";
import { FormElement } from "@/lib/types/form.elements";
import { useDraggable } from "@dnd-kit/core";
import { cn } from "@/lib/utils";

export const SidebarButtonElement = ({
  formElement,
}: {
  formElement: FormElement;
}) => {
  const { label, icon: Icon } = formElement.designerButtonElement;
  const draggable = useDraggable({
    id: `designer-button-${formElement.type}`,
    data: {
      type: formElement.type,
      isDesignerButtonElement: true,
    },
  });
  return (
    <Button
      id="designer-button"
      ref={draggable.setNodeRef}
      variant="outline"
      className={cn(
        "flex flex-col gap-2 h-[15dvh] w-[15dvh] cursor-grab",
        draggable.isDragging && "ring-2 ring-primary"
      )}
      {...draggable.listeners}
      {...draggable.attributes}
    >
      <Icon className="h-5 w-5" />
      <p className="text-xs">{label}</p>
    </Button>
  );
};

export const SidebarButtonElementDragOverlay = ({
  formElement,
}: {
  formElement: FormElement;
}) => {
  const { label, icon: Icon } = formElement.designerButtonElement;

  return (
    <Button
      variant="outline"
      className="flex flex-col gap-2 h-[15dvh] w-[15dvh] cursor-grab"
    >
      <Icon className="h-5 w-5" />
      <p className="text-xs">{label}</p>
    </Button>
  );
};
