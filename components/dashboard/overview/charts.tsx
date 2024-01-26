"use client";

import { FormSubmissions } from "@prisma/client";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface ChartsProps {
  data: FormSubmissions[];
}

interface OriginalData {
  id: number;
  createdAt: Date;
  formId: number;
  content: string;
  userId: string;
}

interface TransformedData {
  month: string;
  total: number;
}

export function Charts({ data }: ChartsProps) {
  function transformData(inputData: OriginalData[]): TransformedData[] {
    const mockData: TransformedData[] = [
      { month: "Jan", total: 0 },
      { month: "Feb", total: 0 },
      { month: "Mar", total: 0 },
      { month: "Apr", total: 0 },
      { month: "May", total: 0 },
      { month: "Jun", total: 0 },
    ];
    const transformedData: TransformedData[] = inputData.reduce(
      (result, item) => {
        const date = new Date(item.createdAt);
        const monthName = new Intl.DateTimeFormat("en-US", {
          month: "short",
        }).format(date);

        const matchingMonth = result.find((entry) => entry.month === monthName);
        const isThisYear = date.getFullYear() === new Date().getFullYear();
        if (matchingMonth && isThisYear) {
          matchingMonth.total += 1;
        }
        return result;
      },
      mockData
    );

    return transformedData;
  }

  const result = transformData(data);

  return (
    <ResponsiveContainer width="100%" height={225}>
      <BarChart data={result}>
        <XAxis
          dataKey="month"
          stroke="#888888"
          fontSize={12}
          tickLine={true}
          axisLine={true}
          tickSize={5}
        />
        <YAxis stroke="#888888" fontSize={12} tickLine={true} axisLine={true} />
        <Tooltip
          cursor={false}
          animationEasing="ease-in-out"
          formatter={(val, name) => [val, name]}
          labelFormatter={(val) => `${val} 2024`}
          contentStyle={{
            backgroundColor: "--background",
            borderRadius: "4px",
            fontSize: "12px",
          }}
        />
        <Bar
          dataKey="total"
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          className="fill-primary"
          barSize={10}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
