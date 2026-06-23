import {
  buildOpenAIMessages,
  type ChatParams,
  type ChatResult,
  type ProviderAdapter,
  ProviderError,
  readErrorBody,
  requireApiKey,
} from "@/lib/providers/types";

const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";

export const openaiProvider: ProviderAdapter = {
  name: "openai",

  async chat({ modelId, message, history = [] }: ChatParams): Promise<ChatResult> {
    const apiKey = requireApiKey("OPENAI_API_KEY", "openai");

    const response = await fetch(OPENAI_API_URL, {
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
        `OpenAI request failed: ${detail}`,
        "openai",
        response.status,
      );
    }

    const data = (await response.json()) as {
      choices?: Array<{ message?: { content?: string | null } }>;
    };

    const text = data.choices?.[0]?.message?.content?.trim();

    if (!text) {
      throw new ProviderError("OpenAI returned an empty response.", "openai");
    }

    return { text };
  },
};
