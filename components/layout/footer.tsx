import { cn } from "@/lib/utils";
import { ScrollToTop } from "../globals/scroll.to.top";

export const Footer = ({
  className,
  isScrollable,
}: {
  className?: string;
  isScrollable?: boolean;
}) => {
  return (
    <footer
      className={cn(
        "container px-2.5 md:px-20 py-5 flex flex-col md:flex-row justify-between text-xs md:text-sm text-muted-foreground font-light",
        className
      )}
    >
      <p>Copyright &copy; 2024</p>
      <div className="flex items-center gap-3 justify-between">
        <p>All rights reserved z-form.</p>
        {isScrollable && <ScrollToTop />}
      </div>
    </footer>
  );
};
