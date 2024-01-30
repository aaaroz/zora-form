import { Button } from "@/components/ui/button";
import { FormElement } from "@/lib/types/form.elements";

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
