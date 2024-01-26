import { getFormStats } from "@/actions/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { EyeIcon } from "lucide-react";
import { ReactNode } from "react";
import { FaWpforms } from "react-icons/fa";
import { HiCursorClick } from "react-icons/hi";
import { TbArrowBounce } from "react-icons/tb";

export const OverviewContent = async () => {
  const stats = await getFormStats();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
      <StatsCards loading={false} data={stats} />
    </div>
  );
};

const StatsCards = ({
  data,
  loading,
}: {
  data: Awaited<ReturnType<typeof getFormStats>>;
  loading: boolean;
}) => {
  return (
    <>
      <StatsCard
        title="Total Visits"
        icon={<EyeIcon className="w-5 h-5" />}
        loading={loading}
        value={data?.visits.toLocaleString() || "0"}
        helperText="Total visits to all your forms"
      />
      <StatsCard
        title="Total Submissions"
        icon={<FaWpforms className="w-5 h-5" />}
        loading={loading}
        value={data?.submissions.toLocaleString() || "0"}
        helperText="Total submissions from all your forms"
      />
      <StatsCard
        title="Submissions Rate"
        icon={<HiCursorClick className="w-5 h-5" />}
        loading={loading}
        value={data?.submissionRate.toLocaleString() + "%" || "0"}
        helperText="Visits that result in form submission"
      />
      <StatsCard
        title="Bounce Rate"
        icon={<TbArrowBounce className="w-5 h-5" />}
        loading={loading}
        value={data?.bounceRate.toLocaleString() + "%" || "0"}
        helperText="Visits that leaves without interacting"
      />
    </>
  );
};

export const StatsCard = ({
  title,
  value,
  helperText,
  loading,
  icon,
}: {
  title: string;
  value: string;
  helperText: string;
  loading: boolean;
  icon: ReactNode;
}) => {
  return (
    <Card>
      <CardContent className="p-3 min-h-[15dvh] space-y-3">
        <CardHeader className="p-0 flex flex-row justify-between">
          <CardTitle className="text-lg">{title}</CardTitle>
          {icon}
        </CardHeader>
        <CardDescription className="text-xl font-bold text-foreground">
          {loading ? (
            <Skeleton>
              <span className="opacity-0">0</span>
            </Skeleton>
          ) : (
            <span>{value}</span>
          )}
        </CardDescription>
        <CardDescription>{helperText}</CardDescription>
      </CardContent>
    </Card>
  );
};
