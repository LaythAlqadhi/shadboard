"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import { formatDuration } from "@/lib/utils";

import type { OverviewType } from "../../../../types";
import type {
  ChartConfig,
  ChartTooltipContentProps,
} from "@/components/ui/chart";

import { useRadius } from "@/hooks/use-radius";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

function ModifiedChartTooltipContent(props: ChartTooltipContentProps) {
  if (!props.payload || props.payload.length === 0) return null;

  return (
    <ChartTooltipContent
      {...props}
      payload={props.payload.map((item) => ({
        ...item,
        value: formatDuration(Number(item.value)),
      }))}
    />
  );
}

const chartConfig = {
  value: {
    label: "Duration",
  },
} satisfies ChartConfig;

export function AverageSessionDurationChart({
  data,
}: {
  data: OverviewType["averageSessionDuration"]["perMonth"];
}) {
  const radius = useRadius();

  return (
    <ChartContainer
      config={chartConfig}
      className="h-32 w-full rounded-md overflow-hidden"
    >
      <BarChart accessibilityLayer data={data}>
        <CartesianGrid vertical={false} />
        <ChartTooltip
          cursor={false}
          content={<ModifiedChartTooltipContent />}
        />
        <XAxis dataKey="month" hide />
        <Bar dataKey="value" barSize={44} radius={radius} />
      </BarChart>
    </ChartContainer>
  );
}
