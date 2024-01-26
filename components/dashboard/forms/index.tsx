import { Suspense } from "react";

import { Separator } from "@/components/ui/separator";
import { ButtonCreateForm } from "./button.create.form";
import { FormCardSkeleton } from "./form.card.skeleton";
import { FormCards } from "./form.cards";

const FormsDashboard = () => {
  return (
    <div className="space-y-5 pr-3 h-[80dvh] overflow-y-auto">
      <h1 className="text-2xl font-bold ">Your Forms</h1>
      <Separator />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
        <ButtonCreateForm />
        <Suspense
          fallback={[1, 2, 3].map((i) => (
            <FormCardSkeleton key={i} />
          ))}
        >
          <FormCards />
        </Suspense>
      </div>
    </div>
  );
};

export default FormsDashboard;
