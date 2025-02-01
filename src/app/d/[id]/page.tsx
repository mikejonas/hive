"use client";

import { useParams } from "next/navigation";
import { useDatasetStore } from "@/store";
import { DataTable } from "../../add-dataset/data-table";
import { columns } from "../../add-dataset/columns";
import { Chart } from "./components/chart";

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
      <div className="flex-none h-[500px]">
        <Chart data={dataset.responses} label={dataset.label} />
      </div>

      <div className="flex-1 min-h-0">
        <div className="h-full overflow-y-auto">
          <DataTable columns={columns} data={dataset.responses} />
        </div>
      </div>
    </div>
  );
}
