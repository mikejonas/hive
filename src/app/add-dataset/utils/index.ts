import { LLMResponse } from "@/store";

export const validateLLMResponse = (data: LLMResponse): boolean => {
  if (typeof data !== "object" || !data)
    throw new Error("Response must be an object");

  // Required fields validation
  const requiredFields = [
    "id",
    "timestamp",
    "model",
    "prompt_tokens",
    "response_time_ms",
    "status",
    "cost_usd",
    "temperature",
    "max_tokens",
    "prompt_template",
  ];

  for (const field of requiredFields) {
    if (!(field in data)) {
      throw new Error(`Missing required field: ${field}`);
    }
  }

  // Type validations
  if (typeof data.id !== "string") throw new Error("id must be a string");
  if (typeof data.timestamp !== "string")
    throw new Error("timestamp must be a string");
  if (typeof data.model !== "string") throw new Error("model must be a string");
  if (typeof data.prompt_tokens !== "number")
    throw new Error("prompt_tokens must be a number");
  if (typeof data.response_time_ms !== "number")
    throw new Error("response_time_ms must be a number");
  if (typeof data.status !== "string")
    throw new Error("status must be a string");
  if (typeof data.cost_usd !== "number")
    throw new Error("cost_usd must be a number");
  if (typeof data.temperature !== "number")
    throw new Error("temperature must be a number");
  if (typeof data.max_tokens !== "number")
    throw new Error("max_tokens must be a number");
  if (typeof data.prompt_template !== "string")
    throw new Error("prompt_template must be a string");

  // Optional fields type validation
  if (
    data.completion_tokens !== null &&
    typeof data.completion_tokens !== "number"
  ) {
    throw new Error("completion_tokens must be a number or null");
  }
  if (data.total_tokens !== null && typeof data.total_tokens !== "number") {
    throw new Error("total_tokens must be a number or null");
  }
  if (data.output !== null && typeof data.output !== "string") {
    throw new Error("output must be a string or null");
  }

  // Evaluation metrics validation if present
  if (data.evaluation_metrics !== null) {
    if (typeof data.evaluation_metrics !== "object") {
      throw new Error("evaluation_metrics must be an object or null");
    }
    const metrics = [
      "relevance_score",
      "factual_accuracy",
      "coherence_score",
      "response_quality",
    ] as const;

    for (const metric of metrics) {
      if (!(metric in data.evaluation_metrics)) {
        throw new Error(`Missing evaluation metric: ${metric}`);
      }
      if (typeof data.evaluation_metrics[metric] !== "number") {
        throw new Error(`${metric} must be a number`);
      }
    }
  }

  // Error validation if present
  if (data.error !== null) {
    if (typeof data.error !== "object") {
      throw new Error("error must be an object or null");
    }
    if (!("type" in data.error) || typeof data.error.type !== "string") {
      throw new Error("error.type must be a string");
    }
    if (!("message" in data.error) || typeof data.error.message !== "string") {
      throw new Error("error.message must be a string");
    }
  }

  return true;
};
