import { create } from "zustand";

export interface LLMResponse {
  id: string;
  timestamp: string;
  model: string;
  prompt_tokens: number;
  completion_tokens: number | null;
  total_tokens: number | null;
  response_time_ms: number;
  status: string;
  cost_usd: number;
  temperature: number;
  max_tokens: number;
  prompt_template: string;
  output: string | null;
  evaluation_metrics: {
    relevance_score: number;
    factual_accuracy: number;
    coherence_score: number;
    response_quality: number;
  } | null;
  error: {
    type: string;
    message: string;
  } | null;
}

interface Dataset {
  id: string;
  label: string;
  createdAt: string;
  responses: LLMResponse[];
}

interface DatasetStore {
  datasets: Record<string, Dataset>;
  addDataset: (label: string, responses: LLMResponse[]) => Dataset;
  getDataset: (id: string) => Dataset | undefined;
}

export const useDatasetStore = create<DatasetStore>((set, get) => ({
  datasets: {},

  addDataset: (label, responses) => {
    const newId = crypto.randomUUID();
    const newDataset: Dataset = {
      id: newId,
      label,
      createdAt: new Date().toISOString(),
      responses,
    };

    set((state) => ({
      datasets: {
        ...state.datasets,
        [newId]: newDataset,
      },
    }));

    return newDataset;
  },

  getDataset: (id) => get().datasets[id],
}));
