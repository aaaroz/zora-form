import { cn } from "@/lib/utils";

export const Container = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div className={cn("mx-auto w-full max-w-screen-xl min-h-screen px-2.5 md:px-20", className)}>
      {children}
    </div>
  );
};
