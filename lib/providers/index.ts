import { anthropicProvider } from "@/lib/providers/anthropic";
import { geminiProvider } from "@/lib/providers/gemini";
import { mistralProvider } from "@/lib/providers/mistral";
import { openaiProvider } from "@/lib/providers/openai";
import { perplexityProvider } from "@/lib/providers/perplexity";
import type { ProviderAdapter, ProviderName } from "@/lib/providers/types";
import { xaiProvider } from "@/lib/providers/xai";

export const providers: Record<ProviderName, ProviderAdapter> = {
  openai: openaiProvider,
  anthropic: anthropicProvider,
  xai: xaiProvider,
  gemini: geminiProvider,
  mistral: mistralProvider,
  perplexity: perplexityProvider,
};

export function getProvider(name: ProviderName): ProviderAdapter {
  return providers[name];
}

export type {
  ChatMessage,
  ChatParams,
  ChatResult,
  ProviderAdapter,
  ProviderName,
} from "@/lib/providers/types";

export { ProviderError } from "@/lib/providers/types";
