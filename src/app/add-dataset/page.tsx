"use client";

import { useState, useCallback } from "react";
import { useDropzone, FileWithPath } from "react-dropzone";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UploadCloud, X } from "lucide-react";
import { useDatasetStore } from "@/store";
import { useRouter } from "next/navigation";
import { validateLLMResponse } from "./utils";

export default function DemoPage() {
  const [error, setError] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const addDataset = useDatasetStore((state) => state.addDataset);
  const router = useRouter();

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "application/json": [".json"] },
    onDrop: useCallback((acceptedFiles: FileWithPath[]) => {
      setError(null);
      setFile(acceptedFiles[0]);
      if (!title) {
        setTitle(acceptedFiles[0].name.replace(/\.[^/.]+$/, "")); // Remove file extension
      }
    }, []),
  });

  const handleProcessData = async () => {
    setError(null);
    if (!file) return;

    try {
      const text = await file.text();
      const jsonData = JSON.parse(text);

      // Check for responses array in the data
      const responses = jsonData.responses;
      if (!responses || !Array.isArray(responses)) {
        setError('File must contain a "responses" array of LLM responses');
        setFile(null);
        setTitle("");
        return;
      }

      // Validate each response
      for (let index = 0; index < responses.length; index++) {
        try {
          validateLLMResponse(responses[index]);
        } catch (error: unknown) {
          if (error instanceof Error) {
            setError(`Invalid response at index ${index}: ${error.message}`);
          } else {
            setError(`Invalid response at index ${index}: Unknown error`);
          }
          setFile(null);
          setTitle("");
          return;
        }
      }

      // If we get here, validation passed
      const dataset = addDataset(title, responses);
      if (dataset) {
        // Make sure we have the dataset ID
        router.push(`/d/${dataset.id}`); // Use the dataset ID, not the response ID
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(`Failed to process file: ${error.message}`);
      } else {
        setError("Failed to process file: Unknown error");
      }
      setFile(null);
      setTitle("");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Add a dataset</h1>
      <Input
        type="text"
        placeholder="Label"
        value={title}
        onChange={(e) => {
          setError(null); // Clear error when typing
          setTitle(e.target.value);
        }}
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
                setTitle("");
                setError(null); // Clear error when removing file
              }}
              cursor="pointer"
            />{" "}
            <div className="ml-1">
              {file.name} ({(file.size / 1024).toFixed(2)} KB)
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="mt-4 mb-4 text-sm text-red-400 bg-red-950/50 px-3 py-2 rounded-md border border-red-900/50">
          {error}
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
