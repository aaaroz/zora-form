"use client";
import { Label } from "@/components/ui/label";
import { FormElementInstance, TSubmitValue } from "@/lib/types/form.elements";
import { CustomInstance, DateFieldFormElement } from ".";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { addDays, addYears, format, setYear, startOfYear } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { NavigationProvider, useNavigation } from "react-day-picker";

export const FormComponent = ({
  elementInstance,
  submitValue,
  isInvalid,
  defaultValue,
}: {
  elementInstance: FormElementInstance;
  submitValue?: TSubmitValue;
  isInvalid?: boolean;
  defaultValue?: string;
}) => {
  const [date, setDate] = useState<Date | undefined>(
    defaultValue ? new Date(defaultValue) : undefined
  );
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsError(isInvalid === true);
  }, [isInvalid]);

  const element = elementInstance as CustomInstance;
  const { label, required, helperText, fromYear, toYear } =
    element.extraAttributes;

  return (
    <div className="flex flex-col gap-2 w-full">
      <Label className={cn(isError && "text-red-500")}>
        {label}
        {required ? <span className="text-red-500 text-xs"> *</span> : ""}
      </Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal",
              !date && "text-muted-foreground",
              isError && "border-red-500"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          align="start"
          className="flex w-auto flex-col space-y-2 p-2"
        >
          <SelectYear
            fromYear={fromYear}
            toYear={toYear}
            setDate={setDate}
            date={date}
          />
          <div className="rounded border">
            <Calendar
              mode="single"
              selected={date}
              month={date}
              onMonthChange={setDate}
              onSelect={(date) => {
                setDate(date);

                if (!submitValue) return;
                const value = date?.toUTCString() || "";
                const isValid = DateFieldFormElement.validate(element, value);
                setIsError(!isValid);
                submitValue(element.id, value);
              }}
              initialFocus
            />
          </div>
        </PopoverContent>
      </Popover>
      {helperText ? (
        <p
          className={cn(
            "text-xs text-muted-foreground",
            isError && "text-red-500"
          )}
        >
          {helperText}
        </p>
      ) : null}
    </div>
  );
};

const SelectYear = ({
  fromYear,
  toYear,
  date,
  setDate,
}: {
  fromYear: number;
  toYear: number;
  date: Date | undefined;
  setDate: Dispatch<SetStateAction<Date | undefined>>;
}) => {
  const years: Date[] = [];
  const defaultFromYear = fromYear ?? 1990;
  const defaultToYear = toYear ?? 2100;
  for (let year = defaultFromYear; year <= defaultToYear; year++) {
    years.push(setYear(startOfYear(new Date()), year));
  }

  return (
    <Select
      onValueChange={(value) => setDate(value ? new Date(value) : undefined)}
    >
      <SelectTrigger>
        <SelectValue placeholder="Select Years" />
      </SelectTrigger>
      <SelectContent className="h-56">
        {years.map((year) => (
          <SelectItem key={year.toISOString()} value={year.toISOString()}>
            {format(year, "yyyy")}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
