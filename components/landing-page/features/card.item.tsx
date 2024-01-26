import { ReactNode } from "react";

import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";

export const CardItem = ({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: ReactNode;
}) => {
  return (
    <Card className="py-4 drop-shadow-xl transition-all hover:scale-[1.02] dark:shadow-neutral-500">
      <CardContent className="flex py-3 px-5 gap-3 items-start">
        {icon}
        <div>
          <CardTitle className="text-lg font-bold">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
      </CardContent>
    </Card>
  );
};
