"use client";

import * as React from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
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

const responseData = [
  {
    id: "resp_01HQ5J2K3N4M5P6R7S8T9U0V1",
    timestamp: "2024-01-01T00:01:23Z",
    model: "gpt-4",
    response_time_ms: 2458,
  },
  {
    id: "resp_01HQ5J2K3N4M5P6R7S8T9U0V2",
    timestamp: "2024-01-01T00:03:45Z",
    model: "gpt-3.5-turbo",
    response_time_ms: 1247,
  },
  {
    id: "resp_01HQ5J2K3N4M5P6R7S8T9U0V3",
    timestamp: "2024-01-01T00:05:12Z",
    model: "claude-3",
    response_time_ms: 3102,
  },
  {
    id: "resp_01HQ5J2K3N4M5P6R7S8T9U0V4",
    timestamp: "2024-01-01T00:08:30Z",
    model: "gpt-4",
    response_time_ms: 1893,
  },
  {
    id: "resp_01HQ5J2K3N4M5P6R7S8T9U0V5",
    timestamp: "2024-01-01T00:10:15Z",
    model: "gpt-3.5-turbo",
    response_time_ms: 876,
  },
];

const formattedData = responseData.map((entry) => ({
  timestamp: new Date(entry.timestamp).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }),
  model: entry.model,
  response_time: entry.response_time_ms,
}));

const chartConfig: ChartConfig = {
  response_time: {
    label: "Response Time (ms)",
    color: "hsl(var(--chart-1))",
  },
};

export const Chart2: React.FC = () => {
  return (
    <Card className="rounded-none">
      <CardHeader className="border-b p-4">
        <CardTitle>Response Time Over Time</CardTitle>
        <CardDescription>
          Showing response time (ms) for different models
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <LineChart
            data={formattedData}
            margin={{ left: 12, right: 12 }}
            width={700}
            height={300}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="timestamp"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
            />
            <YAxis tickLine={false} axisLine={false} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="response_time" stroke="#8884d8" />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
