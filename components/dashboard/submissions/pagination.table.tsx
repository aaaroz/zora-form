import * as React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type Props = {
  totalPages: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
};

export const PaginationTable = ({
  totalPages,
  currentPage,
  setCurrentPage,
}: Props) => {
  return (
    <Pagination className="justify-end">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            size="sm"
            isActive={currentPage !== 1 ? true : false}
            onClick={() => setCurrentPage(currentPage - 1)}
            className={
              currentPage === 1
                ? "pointer-events-none bg-muted text-muted-foreground"
                : "pointer-events-auto hover:bg-neutral-200 dark:hover:bg-neutral-900"
            }
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            size="sm"
            isActive={currentPage !== totalPages ? true : false}
            onClick={() => setCurrentPage(currentPage + 1)}
            className={
              currentPage === totalPages
                ? "pointer-events-none bg-muted text-muted-foreground"
                : "pointer-events-auto hover:bg-neutral-200 dark:hover:bg-neutral-900"
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
