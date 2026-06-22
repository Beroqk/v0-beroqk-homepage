export type ModelTier =
  | "cheap_fast_model"
  | "coding_model"
  | "reasoning_model"
  | "research_model";

export interface ModelConfig {
  tier: ModelTier;
  provider: string;
  modelId: string;
  displayName: string;
  description: string;
  maxTokens: number;
  supportsStreaming: boolean;
}

export const MODELS: Record<ModelTier, ModelConfig> = {
  cheap_fast_model: {
    tier: "cheap_fast_model",
    provider: "openai",
    modelId: "gpt-4o-mini",
    displayName: "Fast",
    description: "Low-latency responses for simple, everyday tasks.",
    maxTokens: 4096,
    supportsStreaming: true,
  },
  coding_model: {
    tier: "coding_model",
    provider: "anthropic",
    modelId: "claude-sonnet-4-20250514",
    displayName: "Code",
    description: "Optimized for programming, debugging, and technical work.",
    maxTokens: 8192,
    supportsStreaming: true,
  },
  reasoning_model: {
    tier: "reasoning_model",
    provider: "openai",
    modelId: "o3-mini",
    displayName: "Reason",
    description: "Deep analysis for complex logic, math, and multi-step problems.",
    maxTokens: 16384,
    supportsStreaming: true,
  },
  research_model: {
    tier: "research_model",
    provider: "perplexity",
    modelId: "sonar-pro",
    displayName: "Research",
    description: "Grounded answers with broad, up-to-date knowledge retrieval.",
    maxTokens: 8192,
    supportsStreaming: true,
  },
};

export function getModel(tier: ModelTier): ModelConfig {
  return MODELS[tier];
}
