"use client";

import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UploadCloud, X } from "lucide-react";
import { useDatasetStore } from "@/store";

export default function DemoPage() {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const addDataset = useDatasetStore((state) => state.addDataset);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "application/json": [".json"] },
    onDrop: (acceptedFiles) => {
      setFile(acceptedFiles[0]);
      if (!title) {
        setTitle(acceptedFiles[0].name.replace(/\.[^/.]+$/, "")); // Remove file extension
      }
    },
  });

  const handleProcessData = async () => {
    if (!file) return;

    const datasetTitle = title.trim();

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const jsonData = JSON.parse(event.target?.result as string);

        if (!jsonData.responses || !Array.isArray(jsonData.responses)) {
          console.error(
            "Invalid JSON format: Expected an object with a 'responses' array"
          );
          return;
        }

        addDataset(datasetTitle, jsonData.responses); // Add all responses at once

        setTitle("");
        setFile(null);
      } catch (error) {
        console.error("Error processing file:", error);
      }
    };

    reader.readAsText(file);
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Add a dataset</h1>
      <Input
        type="text"
        placeholder="Label"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="mb-4"
      />
      <div
        {...getRootProps()}
        className="cursor-pointer p-6 flex flex-col items-center justify-center border border-dashed rounded-lg hover:bg-neutral-900 transition"
      >
        <input {...getInputProps()} />
        <UploadCloud className="h-12 w-12 text-gray-400 mb-2" />
        {isDragActive ? (
          <p className="text-gray-600">Drop the files here...</p>
        ) : (
          <p className="text-gray-600">Drop files here, or click to select</p>
        )}
      </div>

      {file && (
        <div className="mt-4">
          <div className="flex items-center">
            <X
              color="#f57070"
              size={16}
              strokeWidth={2}
              onClick={() => {
                setFile(null);
                setTitle(""); // Clear title when file is removed
              }}
              cursor="pointer"
            />{" "}
            <div className="ml-1">
              {file.name} ({(file.size / 1024).toFixed(2)} KB)
            </div>
          </div>
        </div>
      )}
      <Button
        disabled={!file}
        className="mt-4 w-full"
        onClick={handleProcessData}
      >
        Add data
      </Button>
    </div>
  );
}
