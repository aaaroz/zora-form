import { FormElements } from "@/lib/types/form.elements";
import { SidebarButtonElement } from "./sidebar.button.element";
import { useDesigner } from "@/lib/hooks";
import { SidebarFormElement } from "./sidebar.form.element";
import { PropertiesFormSidebar } from "./properties.form.sidebar";

export const DesignerSidebar = () => {
  const { selectedElement } = useDesigner();
  return (
    <aside className="border-t w-[400px] max-w-[400px] flex flex-col flex-grow gap-2 border-l-2 border-muted p-4 overflow-y-auto bg-background">
      {selectedElement ? <PropertiesFormSidebar /> : <SidebarFormElement />}
    </aside>
  );
};
