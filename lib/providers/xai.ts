import {
  buildOpenAIMessages,
  type ChatParams,
  type ChatResult,
  type ProviderAdapter,
  ProviderError,
  readErrorBody,
  requireApiKey,
} from "@/lib/providers/types";

const XAI_API_URL = "https://api.x.ai/v1/chat/completions";

export const xaiProvider: ProviderAdapter = {
  name: "xai",

  async chat({ modelId, message, history = [] }: ChatParams): Promise<ChatResult> {
    const apiKey = requireApiKey("XAI_API_KEY", "xai");

    const response = await fetch(XAI_API_URL, {
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
      throw new ProviderError(`xAI request failed: ${detail}`, "xai", response.status);
    }

    const data = (await response.json()) as {
      choices?: Array<{ message?: { content?: string | null } }>;
    };

    const text = data.choices?.[0]?.message?.content?.trim();

    if (!text) {
      throw new ProviderError("xAI returned an empty response.", "xai");
    }

    return { text };
  },
};
