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

// Sample data from API responses
const apiResponses = [
  // January 1
  { timestamp: "2024-01-01T00:01:23Z", model: "gpt-4", total_tokens: 557 },
  {
    timestamp: "2024-01-01T00:03:45Z",
    model: "gpt-3.5-turbo",
    total_tokens: 1345,
  },
  { timestamp: "2024-01-01T00:05:12Z", model: "claude-3", total_tokens: 2801 },
  { timestamp: "2024-01-01T00:08:30Z", model: "gpt-4", total_tokens: 0 },
  {
    timestamp: "2024-01-01T00:10:15Z",
    model: "gpt-3.5-turbo",
    total_tokens: 245,
  },

  // January 2
  { timestamp: "2024-01-02T01:15:32Z", model: "gpt-4", total_tokens: 890 },
  {
    timestamp: "2024-01-02T02:45:50Z",
    model: "gpt-3.5-turbo",
    total_tokens: 1567,
  },
  { timestamp: "2024-01-02T03:05:14Z", model: "claude-3", total_tokens: 3201 },
  { timestamp: "2024-01-02T04:21:19Z", model: "gpt-4", total_tokens: 320 },

  // January 3
  { timestamp: "2024-01-03T07:30:55Z", model: "gpt-4", total_tokens: 1023 },
  {
    timestamp: "2024-01-03T08:14:10Z",
    model: "gpt-3.5-turbo",
    total_tokens: 1145,
  },
  { timestamp: "2024-01-03T09:50:45Z", model: "claude-3", total_tokens: 2987 },
  { timestamp: "2024-01-03T11:32:21Z", model: "gpt-4", total_tokens: 560 },

  // January 4
  { timestamp: "2024-01-04T01:20:37Z", model: "gpt-4", total_tokens: 1300 },
  {
    timestamp: "2024-01-04T02:35:49Z",
    model: "gpt-3.5-turbo",
    total_tokens: 1440,
  },
  { timestamp: "2024-01-04T04:42:13Z", model: "claude-3", total_tokens: 2750 },
  { timestamp: "2024-01-04T05:50:55Z", model: "gpt-4", total_tokens: 480 },

  // January 5
  { timestamp: "2024-01-05T10:25:30Z", model: "gpt-4", total_tokens: 910 },
  {
    timestamp: "2024-01-05T11:45:15Z",
    model: "gpt-3.5-turbo",
    total_tokens: 1230,
  },
  { timestamp: "2024-01-05T13:15:40Z", model: "claude-3", total_tokens: 3400 },
  { timestamp: "2024-01-05T14:30:22Z", model: "gpt-4", total_tokens: 1020 },

  // January 6
  { timestamp: "2024-01-06T00:12:10Z", model: "gpt-4", total_tokens: 760 },
  {
    timestamp: "2024-01-06T02:50:33Z",
    model: "gpt-3.5-turbo",
    total_tokens: 1450,
  },
  { timestamp: "2024-01-06T04:45:12Z", model: "claude-3", total_tokens: 2600 },

  // January 7
  { timestamp: "2024-01-07T08:30:55Z", model: "gpt-4", total_tokens: 890 },
  {
    timestamp: "2024-01-07T10:15:40Z",
    model: "gpt-3.5-turbo",
    total_tokens: 1780,
  },
  { timestamp: "2024-01-07T12:50:30Z", model: "claude-3", total_tokens: 3100 },

  // January 8
  { timestamp: "2024-01-08T00:05:10Z", model: "gpt-4", total_tokens: 1123 },
  {
    timestamp: "2024-01-08T02:30:20Z",
    model: "gpt-3.5-turbo",
    total_tokens: 1425,
  },
  { timestamp: "2024-01-08T05:45:35Z", model: "claude-3", total_tokens: 3500 },

  // January 9
  { timestamp: "2024-01-09T07:20:30Z", model: "gpt-4", total_tokens: 1250 },
  {
    timestamp: "2024-01-09T09:35:50Z",
    model: "gpt-3.5-turbo",
    total_tokens: 1380,
  },
  { timestamp: "2024-01-09T11:45:55Z", model: "claude-3", total_tokens: 2700 },

  // January 10
  { timestamp: "2024-01-10T03:50:45Z", model: "gpt-4", total_tokens: 1360 },
  {
    timestamp: "2024-01-10T05:15:55Z",
    model: "gpt-3.5-turbo",
    total_tokens: 1245,
  },
  { timestamp: "2024-01-10T07:42:30Z", model: "claude-3", total_tokens: 2900 },

  // January 11
  { timestamp: "2024-01-11T01:25:12Z", model: "gpt-4", total_tokens: 1400 },
  {
    timestamp: "2024-01-11T03:10:45Z",
    model: "gpt-3.5-turbo",
    total_tokens: 1550,
  },
  { timestamp: "2024-01-11T06:25:30Z", model: "claude-3", total_tokens: 3150 },

  // January 12
  { timestamp: "2024-01-12T02:50:15Z", model: "gpt-4", total_tokens: 1200 },
  {
    timestamp: "2024-01-12T04:35:50Z",
    model: "gpt-3.5-turbo",
    total_tokens: 1455,
  },
  { timestamp: "2024-01-12T08:45:30Z", model: "claude-3", total_tokens: 3200 },

  // January 13
  { timestamp: "2024-01-13T07:10:45Z", model: "gpt-4", total_tokens: 1345 },
  {
    timestamp: "2024-01-13T09:35:22Z",
    model: "gpt-3.5-turbo",
    total_tokens: 1380,
  },
  { timestamp: "2024-01-13T12:20:50Z", model: "claude-3", total_tokens: 3105 },

  // January 14
  { timestamp: "2024-01-14T02:15:33Z", model: "gpt-4", total_tokens: 1500 },
  {
    timestamp: "2024-01-14T04:50:40Z",
    model: "gpt-3.5-turbo",
    total_tokens: 1290,
  },
  { timestamp: "2024-01-14T06:40:25Z", model: "claude-3", total_tokens: 2900 },
];

// Aggregate token usage per model per day
const aggregatedData = apiResponses.reduce((acc, response) => {
  const date = response.timestamp.split("T")[0]; // Extract date (YYYY-MM-DD)
  if (!acc[date]) {
    acc[date] = { date };
  }
  acc[date][response.model] =
    (acc[date][response.model] || 0) + response.total_tokens;
  return acc;
}, {} as Record<string, Record<string, any>>);

const chartData = Object.values(aggregatedData);

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

export const Chart: React.FC = () => {
  const [hiddenModels, setHiddenModels] = React.useState<Set<string>>(
    new Set()
  );

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
      <CardHeader className="flex-none border-b border-gray-800 p-6">
        <CardTitle className="text-gray-100">AI Model Usage</CardTitle>
        <CardDescription className="text-gray-400">
          Token usage per model over time
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 px-4 pt-6 pb-0 min-h-0">
        <ChartContainer config={chartConfig} className="h-full w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
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
                  const date = new Date(value);
                  return date.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  });
                }}
              />
              <YAxis
                tick={{ fill: "#9CA3AF" }}
                tickLine={false}
                axisLine={false}
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
                      return new Date(value).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      });
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
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
