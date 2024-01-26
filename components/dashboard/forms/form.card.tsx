import Link from "next/link";
import { Form } from "@prisma/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FaEdit, FaWpforms } from "react-icons/fa";
import { LuView } from "react-icons/lu";
import { formatDistance } from "date-fns";
import { Button } from "@/components/ui/button";

export const FormCard = ({ form }: { form: Form }) => {
  return (
    <Card>
      <CardContent className="p-3 h-[30dvh] flex flex-col justify-between">
        <CardHeader className="p-0">
          <CardTitle className="flex items-center gap-2 justify-between">
            <span className="truncate font-bold text-lg">{form.name}</span>
            {form.published ? (
              <Badge>Published</Badge>
            ) : (
              <Badge variant="secondary">Draft</Badge>
            )}
          </CardTitle>
          <CardDescription className="flex items-center justify-between text-muted-foreground text-xs">
            {formatDistance(form.createdAt, new Date(), {
              addSuffix: true,
            })}
            {form.published ? (
              <span className="flex items-center gap-2">
                <LuView className="text-muted-foreground" />
                <span>{form.visits.toLocaleString()}</span>
                <FaWpforms className="text-muted-foreground" />
                <span>{form.submissions.toLocaleString()}</span>
              </span>
            ) : null}
          </CardDescription>
        </CardHeader>
        <CardDescription className="line-clamp-3 text-sm text-muted-foreground">
          {form.description || "No description provided"}
        </CardDescription>
        <CardFooter className="p-0">
          {form.published ? (
            <Button asChild>
              <Link
                href={`/users/submissions/${form.id}`}
                className="flex gap-3 w-full"
              >
                View Submissions &rarr;
              </Link>
            </Button>
          ) : (
            <Button asChild>
              <Link href={`/builder/${form.id}`} className="flex gap-3 w-full">
                Edit Form <FaEdit />
              </Link>
            </Button>
          )}
        </CardFooter>
      </CardContent>
    </Card>
  );
};
