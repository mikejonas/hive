"use client";

import { ColumnDef } from "@tanstack/react-table";
import { LLMResponse } from "@/store"; // Ensure this path is correct

export const columns: ColumnDef<LLMResponse>[] = [
  {
    accessorKey: "timestamp",
    header: "Timestamp",
    enableSorting: true,
    sortingFn: (rowA, rowB) => {
      const dateA = new Date(rowA.getValue("timestamp"));
      const dateB = new Date(rowB.getValue("timestamp"));
      return dateA.getTime() - dateB.getTime();
    },
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        {row.original.status === "error" && (
          <span className="w-2 h-2 bg-red-500 rounded-full" />
        )}
        {new Date(row.original.timestamp).toLocaleString()}
      </div>
    ),
  },

  {
    accessorKey: "model",
    header: "Model",
    enableSorting: true,
    sortingFn: "alphanumeric",
  },
  {
    accessorKey: "prompt_tokens",
    header: "Prompt Tokens",
    enableSorting: true,
    sortingFn: "alphanumeric",
  },
  {
    accessorKey: "completion_tokens",
    header: "Completion Tokens",
  },
  {
    accessorKey: "total_tokens",
    header: "Total Tokens",
  },
  {
    accessorKey: "response_time_ms",
    header: "Response Time (ms)",
  },
  {
    accessorKey: "cost_usd",
    header: "Cost (USD)",
    cell: ({ row }) => `$${row.original.cost_usd.toFixed(4)}`,
  },
  {
    accessorKey: "temperature",
    header: "Temperature",
  },
  {
    accessorKey: "max_tokens",
    header: "Max Tokens",
  },
  {
    accessorKey: "prompt_template",
    header: "Prompt Template",
    cell: ({ row }) => (
      <span className="truncate block max-w-xs">
        {row.original.prompt_template}
      </span>
    ),
  },
  {
    accessorKey: "output",
    header: "Output",
    cell: ({ row }) => (
      <span className="truncate block max-w-xs min-w-xxs">
        {row.original.error ? (
          <span className="text-red-500">
            {row.original.error.type}: {row.original.error.message}
          </span>
        ) : (
          row.original.output || "No Output"
        )}
      </span>
    ),
  },
  // Separate Evaluation Metrics into Individual Columns
  {
    accessorKey: "evaluation_metrics.relevance_score",
    header: "Relevance",
    cell: ({ row }) =>
      row.original.evaluation_metrics
        ? row.original.evaluation_metrics.relevance_score
        : "N/A",
  },
  {
    accessorKey: "evaluation_metrics.factual_accuracy",
    header: "Accuracy",
    cell: ({ row }) =>
      row.original.evaluation_metrics
        ? row.original.evaluation_metrics.factual_accuracy
        : "N/A",
  },
  {
    accessorKey: "evaluation_metrics.coherence_score",
    header: "Coherence",
    cell: ({ row }) =>
      row.original.evaluation_metrics
        ? row.original.evaluation_metrics.coherence_score
        : "N/A",
  },
  {
    accessorKey: "evaluation_metrics.response_quality",
    header: "Quality",
    cell: ({ row }) =>
      row.original.evaluation_metrics
        ? row.original.evaluation_metrics.response_quality
        : "N/A",
  },
  // Uncomment if you need an Error column
  // {
  //   accessorKey: "error",
  //   header: "Error",
  //   cell: ({ row }) =>
  //     row.original.error ? (
  //       <span className="text-red-500">
  //         {row.original.error.type}: {row.original.error.message}
  //       </span>
  //     ) : (
  //       "No Error"
  //     ),
  // },
];
