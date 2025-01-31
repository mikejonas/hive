"use client";

import { useDatasetStore } from "@/store";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const datasetLabels = Object.values(
    useDatasetStore((state) => state.datasets)
  ).map(({ id, label }) => ({ id, label }));

  const pathname = usePathname();

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Datasets</h2>
      <ul>
        {datasetLabels.map(({ id, label }) => (
          <li key={id}>
            <Link
              href={`/d/${id}`}
              className={`block py-2 px-4 rounded-md cursor-pointer ${
                pathname === `/d/${id}`
                  ? "bg-neutral-900 text-white"
                  : "text-neutral-400 hover:bg-gray-700 hover:text-white"
              }`}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
      <Link
        href="/add-dataset"
        className={`block py-2 px-4 rounded-md cursor-pointer mt-2 ${
          pathname === "/add-dataset"
            ? "bg-neutral-900 text-white"
            : "text-neutral-400 hover:bg-gray-700 hover:text-white"
        }`}
      >
        + Add a dataset
      </Link>
    </div>
  );
}
