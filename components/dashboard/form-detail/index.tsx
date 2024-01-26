import { Form } from "@prisma/client";
import { VisitButton } from "../submissions/visit.button";
import { Input } from "@/components/ui/input";
import { CopyButton } from "../submissions/copy.button";
import { StatsCard } from "../overview/overview.content";
import { EyeIcon } from "lucide-react";
import { FaWpforms } from "react-icons/fa";
import { HiCursorClick } from "react-icons/hi";
import { TbArrowBounce } from "react-icons/tb";
import { SubmissionsTable } from "../submissions/submissions.table";

const FormDetail = ({ form, id }: { form: Form; id: string }) => {
  const { visits, submissions } = form;

  let submissionRate = 0;
  let bounceRate = 0;

  if (visits > 0) {
    submissionRate = (submissions / visits) * 100;
    bounceRate = 100 - submissionRate;
  }

  const formLink = `${process.env.BASE_URL}/submit/${form.shareUrl}`;

  return (
    <div className="space-y-2">
      <div className="py-5 flex justify-between flex-wrap gap-3">
        <h1 className="text-2xl font-bold truncate">{form.name}</h1>
        <VisitButton shareUrl={formLink} />
      </div>
      <div className="flex justify-between flex-wrap md:flex-nowrap border-y border-border py-5 gap-3">
        <Input readOnly value={formLink} />
        <CopyButton shareUrl={formLink} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
        <StatsCard
          title="Total Visits"
          icon={<EyeIcon className="w-5 h-5" />}
          loading={false}
          value={visits.toLocaleString() || "0"}
          helperText="Total visits to this forms"
        />
        <StatsCard
          title="Total Submissions"
          icon={<FaWpforms className="w-5 h-5" />}
          loading={false}
          value={submissions.toLocaleString() || "0"}
          helperText="Total submissions from this forms"
        />
        <StatsCard
          title="Submissions Rate"
          icon={<HiCursorClick className="w-5 h-5" />}
          loading={false}
          value={submissionRate.toLocaleString() + "%" || "0"}
          helperText="Visits that result in form submission"
        />
        <StatsCard
          title="Bounce Rate"
          icon={<TbArrowBounce className="w-5 h-5" />}
          loading={false}
          value={bounceRate.toLocaleString() + "%" || "0"}
          helperText="Visits that leaves without interacting"
        />
      </div>

      <SubmissionsTable id={Number(id)} />
    </div>
  );
};

export default FormDetail;
