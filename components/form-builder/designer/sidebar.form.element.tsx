import { FormElements } from "@/lib/types/form.elements";
import { SidebarButtonElement } from "./sidebar.button.element";
import { Separator } from "@/components/ui/separator";

export const SidebarFormElement = () => {
  return (
    <div>
      <p className="text-sm text-foreground/70">Drag & Drop Elements</p>
      <Separator className="my-2" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 place-items-center">
        <p className="text-sm text-muted-foreground col-span-1 md:col-span-2 my-2">
          Layout Elements
        </p>
        <SidebarButtonElement formElement={FormElements.TitleField} />
        <SidebarButtonElement formElement={FormElements.SubTitleField} />
        <SidebarButtonElement formElement={FormElements.ParagraphField} />
        <SidebarButtonElement formElement={FormElements.SeparatorField} />
        <SidebarButtonElement formElement={FormElements.SpacingField} />
        <p className="text-sm text-muted-foreground col-span-1 md:col-span-2 my-2">
          Layout Elements
        </p>
        <SidebarButtonElement formElement={FormElements.TextField} />
        <SidebarButtonElement formElement={FormElements.NumberField} />
        <SidebarButtonElement formElement={FormElements.TextAreaField} />
        <SidebarButtonElement formElement={FormElements.DateField} />
        <SidebarButtonElement formElement={FormElements.SelectField} />
        <SidebarButtonElement formElement={FormElements.CheckboxField} />
      </div>
    </div>
  );
};
