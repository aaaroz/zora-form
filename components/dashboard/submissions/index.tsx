import { Separator } from "@/components/ui/separator";
import { Suspense } from "react";
import { FormCardSkeleton } from "../forms/form.card.skeleton";
import { FormCards } from "../forms/form.cards";

const SubmissionsDashboard = () => {
  return (
    <div className="space-y-5 pr-3 h-[80dvh] overflow-y-auto">
      <h1 className="text-2xl font-bold ">Your Published Forms</h1>
      <Separator />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
        <Suspense
          fallback={[1, 2, 3].map((i) => (
            <FormCardSkeleton key={i} />
          ))}
        >
          <FormCards published />
        </Suspense>
      </div>
    </div>
  );
};

export default SubmissionsDashboard;
