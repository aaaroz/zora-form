import Link from "next/link";
import { Suspense } from "react";

import { Charts } from "./charts";
import { FormCards } from "../forms/form.cards";
import { FormCardSkeleton } from "../forms/form.card.skeleton";
import { getSubmissionsTotal } from "@/actions";
import { OverviewContent } from "./overview.content";
import { Separator } from "@/components/ui/separator";

const OverviewDashboard = async () => {
  const submissions = await getSubmissionsTotal();
  return (
    <div className="space-y-5 h-[80dvh] overflow-y-auto">
      <section className="space-y-3">
        <h1 className="text-2xl font-bold ">Overview</h1>
        <Separator />
        <OverviewContent />
      </section>
      <section className="space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7">
          <div className="col-span-5 space-y-3 md:p-2 border md:mr-3 rounded">
            <Link href="/users/submissions">
              <h1 className="text-xl font-bold px-3">Submissions</h1>
            </Link>
            <Charts data={submissions} />
          </div>
          <div className="col-span-2 space-y-3">
            <Link href="/users/forms">
              <h1 className="text-xl font-bold px-3">Recent Forms</h1>
            </Link>
            <Separator />
            <div className="grid grid-cols-1 gap-2">
              <Suspense
                fallback={[1].map((i) => (
                  <FormCardSkeleton key={i} />
                ))}
              >
                <FormCards limit={1} />
              </Suspense>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OverviewDashboard;
