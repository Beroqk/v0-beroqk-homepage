import {
  buildOpenAIMessages,
  type ChatParams,
  type ChatResult,
  type ProviderAdapter,
  ProviderError,
  readErrorBody,
  requireApiKey,
} from "@/lib/providers/types";

const MISTRAL_API_URL = "https://api.mistral.ai/v1/chat/completions";

export const mistralProvider: ProviderAdapter = {
  name: "mistral",

  async chat({ modelId, message, history = [] }: ChatParams): Promise<ChatResult> {
    const apiKey = requireApiKey("MISTRAL_API_KEY", "mistral");

    const response = await fetch(MISTRAL_API_URL, {
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
        `Mistral request failed: ${detail}`,
        "mistral",
        response.status,
      );
    }

    const data = (await response.json()) as {
      choices?: Array<{ message?: { content?: string | null } }>;
    };

    const text = data.choices?.[0]?.message?.content?.trim();

    if (!text) {
      throw new ProviderError("Mistral returned an empty response.", "mistral");
    }

    return { text };
  },
};
