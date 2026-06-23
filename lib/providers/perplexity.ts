import {
  buildOpenAIMessages,
  type ChatParams,
  type ChatResult,
  type ProviderAdapter,
  ProviderError,
  readErrorBody,
  requireApiKey,
} from "@/lib/providers/types";

const PERPLEXITY_API_URL = "https://api.perplexity.ai/chat/completions";

export const perplexityProvider: ProviderAdapter = {
  name: "perplexity",

  async chat({ modelId, message, history = [] }: ChatParams): Promise<ChatResult> {
    const apiKey = requireApiKey("PERPLEXITY_API_KEY", "perplexity");

    const response = await fetch(PERPLEXITY_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: modelId,
        messages: buildOpenAIMessages(message, history),
      }),
    });

    if (!response.ok) {
      const detail = await readErrorBody(response);
      throw new ProviderError(
        `Perplexity request failed: ${detail}`,
        "perplexity",
        response.status,
      );
    }

    const data = (await response.json()) as {
      choices?: Array<{ message?: { content?: string | null } }>;
    };

    const text = data.choices?.[0]?.message?.content?.trim();

    if (!text) {
      throw new ProviderError("Perplexity returned an empty response.", "perplexity");
    }

    return { text };
  },
};
