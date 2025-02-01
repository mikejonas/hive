"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Legend } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { ResponsiveContainer } from "recharts";
import { LLMResponse } from "@/store";

// TODO: It will only work for these specific models for now
const chartConfig: ChartConfig = {
  "gpt-4": {
    label: "GPT-4",
    color: "#8884d8",
  },
  "gpt-3.5-turbo": {
    label: "GPT-3.5 Turbo",
    color: "#4ecdc4",
  },
  "claude-3": {
    label: "Claude 3",
    color: "#ff9a5b",
  },
};

interface ChartProps {
  data: LLMResponse[];
  label: string;
}

export const Chart: React.FC<ChartProps> = ({ data, label }) => {
  // TODO - move this to the parent
  const aggregatedData = React.useMemo(() => {
    const aggregation: Record<string, Record<string, number | string>> = {};
    data.forEach((item: LLMResponse) => {
      const date = new Date(item.timestamp);
      const day = item.timestamp.split("T")[0];
      const hour = date.getHours().toString().padStart(2, "0");
      const key = `${day} ${hour}:00`;

      if (!aggregation[key]) {
        aggregation[key] = { date: key };
      }
      aggregation[key][item.model] =
        ((aggregation[key][item.model] as number) || 0) + (item.cost_usd || 0);
    });
    return Object.values(aggregation);
  }, [data]);

  const [hiddenModels, setHiddenModels] = React.useState<Set<string>>(
    new Set()
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleLegendClick = (e: any) => {
    setHiddenModels((prev) => {
      const newHidden = new Set(prev);
      if (newHidden.has(e.dataKey)) {
        newHidden.delete(e.dataKey);
      } else {
        newHidden.add(e.dataKey);
      }
      return newHidden;
    });
  };

  return (
    <Card className="h-full rounded-none flex flex-col min-h-0">
      <CardHeader className="flex-none border-b text-3xl border-gray-800 p-6">
        <CardTitle className="text-gray-100">{label}</CardTitle>
        <CardDescription className="text-gray-400">
          Cost per model (hourly)
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 px-4 pt-6 pb-0 min-h-0">
        <ChartContainer config={chartConfig} className="h-full w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={aggregatedData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#374151"
                vertical={false}
              />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                tick={{ fill: "#9CA3AF" }}
                tickFormatter={(value) => {
                  const [datePart] = value.split(" ");
                  return datePart;
                }}
              />
              <YAxis
                tick={{ fill: "#9CA3AF" }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${value.toFixed(2)}`}
              />
              <Legend
                verticalAlign="bottom"
                height={36}
                formatter={(value) => chartConfig[value].label}
                iconType="circle"
                iconSize={8}
                onClick={handleLegendClick}
                cursor="pointer"
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    className="w-[150px]"
                    nameKey="tokens"
                    labelFormatter={(value) => {
                      const [datePart, timePart] = value.split(" ");
                      return `${new Date(datePart).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })} ${timePart}`;
                    }}
                  />
                }
              />
              {Object.keys(chartConfig).map((model) => (
                <Bar
                  key={model}
                  dataKey={model}
                  stackId="a"
                  fill={chartConfig[model].color}
                  hide={hiddenModels.has(model)}
                  isAnimationActive={false}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
