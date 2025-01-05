"use client";

import { format } from "date-fns";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import { remToPx } from "@/lib/utils";

import type { SalesTrendType } from "../../../types";

import { useSettings } from "@/hooks/use-settings";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export function SalesTrendChart({
  data,
}: {
  data: SalesTrendType["salesTrends"];
}) {
  const { settings } = useSettings();

  return (
    <ChartContainer config={{}} className="w-full md:h-[200px]">
      <BarChart accessibilityLayer data={data}>
        <CartesianGrid vertical={false} />
        <ChartTooltip
          cursor={false}
          content={
            <ChartTooltipContent
              hideIndicator
              hideLabel
              formatter={(value, name) => (
                <div className="w-full flex justify-between text-xs">
                  <span className="capitalize text-muted-foreground">
                    {name}
                  </span>
                  <span>{"$" + value.toLocaleString()}</span>
                </div>
              )}
            />
          }
        />
        <XAxis
          dataKey="date"
          tickLine={false}
          axisLine={false}
          tickMargin={10}
          tickFormatter={(value) => format(value, "MMM dd")}
        />
        <Bar
          dataKey="sales"
          fill="hsl(var(--primary))"
          radius={remToPx(settings.radius)}
        />
      </BarChart>
    </ChartContainer>
  );
}
