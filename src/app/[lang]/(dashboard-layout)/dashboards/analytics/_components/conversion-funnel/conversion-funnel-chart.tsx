"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import { chartConfig } from "@/configs/chart-config";

import { remToPx } from "@/lib/utils";

import type { ConversionFunnelType } from "../../types";

import { useSettings } from "@/hooks/use-settings";

import { ChartContainer } from "@/components/ui/chart";
import { Badge } from "@/components/ui/badge";
import { DynamicIcon } from "@/components/dynamic-icon";

export function ConversionFunnelChart({
  data,
}: {
  data: ConversionFunnelType;
}) {
  const { settings } = useSettings();

  return (
    <div className="flex flex-col justify-center items-center gap-6 md:flex-row">
      <ul className="shrink-0 grid grid-cols-2 gap-4 md:grid-cols-1">
        {data.map((stage) => (
          <li key={stage.name} className="flex gap-x-2">
            <Badge
              style={{
                backgroundColor: stage.fill,
              }}
              className="size-12 aspect-square shadow-none"
              aria-hidden
            >
              <DynamicIcon name={stage.iconName} className="size-full" />
            </Badge>
            <div>
              <p className="text-2xl">{stage.value.toLocaleString()}</p>
              <h4 className="text-xs">{stage.name}</h4>
            </div>
          </li>
        ))}
      </ul>

      <ChartContainer
        config={chartConfig}
        className="grow aspect-square w-full max-h-[250px]"
      >
        <BarChart accessibilityLayer data={data}>
          <CartesianGrid vertical={false} />
          <XAxis dataKey="name" type="category" hide />
          <Bar dataKey="value" radius={remToPx(settings.radius) - 2} />
        </BarChart>
      </ChartContainer>
    </div>
  );
}
