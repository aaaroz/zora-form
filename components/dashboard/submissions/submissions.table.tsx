"use client";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TElements } from "@/lib/types/form.elements";
import { format, formatDistance } from "date-fns";
import { ReactNode, useRef, useState } from "react";
import type { Columns, Row } from "./submissions";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useDownloadExcel } from "react-export-table-to-excel";
import { Label } from "@/components/ui/label";
import { PaginationTable } from "./pagination.table";

interface Props {
  columns: Columns[];
  rows: Row[];
}
export const SubmissionsTable = ({ columns, rows }: Props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const submissionPerPage = 10;

  const submissionRef = useRef(null);
  const { onDownload } = useDownloadExcel({
    currentTableRef: submissionRef.current,
    filename: "Submissions table",
    sheet: "Submissions",
  });

  const lastPostIndex = currentPage * submissionPerPage;
  const firstPostIndex = lastPostIndex - submissionPerPage;
  const currentSubmissions = rows.slice(firstPostIndex, lastPostIndex);
  return (
    <>
      <div className="my-3 flex justify-between flex-wrap">
        <h1 className="text-2xl font-bold">Form Submissions</h1>
        <Button
          variant="default"
          size="sm"
          className="px-5"
          onClick={onDownload}
        >
          Export to .xls
        </Button>
      </div>
      <Separator />
      <Table ref={submissionRef} className="border rounded">
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead key={column.id} className="uppercase">
                {column.label}
              </TableHead>
            ))}
            <TableHead className="text-muted-foreground text-right uppercase">
              Submitted at
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentSubmissions.map((row, index) => (
            <TableRow key={index}>
              {columns.map((column) => (
                <RowCell
                  key={column.id}
                  type={column.type}
                  value={row[column.id]}
                />
              ))}
              <TableCell className="text-muted-foreground text-right">
                {formatDistance(row.submitted_at, new Date(), {
                  addSuffix: true,
                })}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <PaginationTable
        totalPages={Math.ceil(rows.length / submissionPerPage)}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
};

const RowCell = ({ type, value }: { type: TElements; value: string }) => {
  let node: ReactNode = value;

  switch (type) {
    case "DateField":
      if (!value) break;
      const date = new Date(value);
      node = <Badge variant="outline">{format(date, "dd/MM/yyyy")}</Badge>;
      break;
    case "CheckboxField":
      const checked = value === "true";
      node = (
        <div className="flex items-center gap-2">
          <Label htmlFor="checkbox">{checked ? "Checked" : "Unchecked"}</Label>
          <Checkbox
            id="checkbox"
            checked={checked}
            className="cursor-default pointer-events-none"
          />
        </div>
      );
      break;
  }

  return <TableCell>{node}</TableCell>;
};
