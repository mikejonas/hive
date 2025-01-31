"use client";

import { useParams } from "next/navigation";
import { useDatasetStore } from "@/store";
import { DataTable } from "../../add-dataset/data-table";
import { columns } from "../../add-dataset/columns";
import { Chart } from "./components/chart";
import { Chart2 } from "./components/chart2";

export default function DatasetPage() {
  const { id } = useParams();
  const dataset = useDatasetStore((state) =>
    id ? state.getDataset(id as string) : undefined
  );

  if (!dataset) {
    return <p className="text-center text-gray-500">Dataset not found</p>;
  }

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* Top Section - Title */}
      <div className="flex-none p-4">
        <h1 className="text-2xl font-semibold">{dataset.label}</h1>
      </div>

      {/* Chart Section - Fixed size */}
      <div className="flex-none h-[500px]">
        <Chart />
      </div>

      {/* Bottom Half - Fixed container with scrollable content */}
      <div className="flex-1 min-h-0">
        <div className="h-full overflow-y-auto">
          <DataTable columns={columns} data={dataset.responses} />
        </div>
      </div>
    </div>
  );
}
