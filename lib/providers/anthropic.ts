import {
  type ChatMessage,
  type ChatParams,
  type ChatResult,
  type ProviderAdapter,
  ProviderError,
  readErrorBody,
  requireApiKey,
} from "@/lib/providers/types";

const ANTHROPIC_API_URL = "https://api.anthropic.com/v1/messages";
const ANTHROPIC_VERSION = "2023-06-01";

function buildAnthropicMessages(
  message: string,
  history: ChatMessage[] = [],
): Array<{ role: "user" | "assistant"; content: string }> {
  const conversation = [
    ...history.filter((entry) => entry.role !== "system"),
    { role: "user" as const, content: message },
  ];

  return conversation.map((entry) => ({
    role: entry.role === "assistant" ? "assistant" : "user",
    content: entry.content,
  }));
}

function getSystemPrompt(history: ChatMessage[] = []): string | undefined {
  const systemMessages = history
    .filter((entry) => entry.role === "system")
    .map((entry) => entry.content.trim())
    .filter(Boolean);

  if (systemMessages.length === 0) {
    return undefined;
  }

  return systemMessages.join("\n\n");
}

export const anthropicProvider: ProviderAdapter = {
  name: "anthropic",

  async chat({ modelId, message, history = [] }: ChatParams): Promise<ChatResult> {
    const apiKey = requireApiKey("ANTHROPIC_API_KEY", "anthropic");
    const system = getSystemPrompt(history);

    const response = await fetch(ANTHROPIC_API_URL, {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "anthropic-version": ANTHROPIC_VERSION,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: modelId,
        max_tokens: 4096,
        ...(system ? { system } : {}),
        messages: buildAnthropicMessages(message, history),
      }),
    });

    if (!response.ok) {
      const detail = await readErrorBody(response);
      throw new ProviderError(
        `Anthropic request failed: ${detail}`,
        "anthropic",
        response.status,
      );
    }

    const data = (await response.json()) as {
      content?: Array<{ type?: string; text?: string }>;
    };

    const text = data.content
      ?.filter((block) => block.type === "text")
      .map((block) => block.text ?? "")
      .join("")
      .trim();

    if (!text) {
      throw new ProviderError("Anthropic returned an empty response.", "anthropic");
    }

    return { text };
  },
};
