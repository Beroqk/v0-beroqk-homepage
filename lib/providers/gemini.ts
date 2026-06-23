import {
  type ChatMessage,
  type ChatParams,
  type ChatResult,
  type ProviderAdapter,
  ProviderError,
  readErrorBody,
  requireApiKey,
} from "@/lib/providers/types";

function getSystemInstruction(history: ChatMessage[] = []): string | undefined {
  const systemMessages = history
    .filter((entry) => entry.role === "system")
    .map((entry) => entry.content.trim())
    .filter(Boolean);

  if (systemMessages.length === 0) {
    return undefined;
  }

  return systemMessages.join("\n\n");
}

function buildGeminiContents(
  message: string,
  history: ChatMessage[] = [],
): Array<{ role: "user" | "model"; parts: Array<{ text: string }> }> {
  const conversation = history.filter((entry) => entry.role !== "system");

  const contents = conversation.map((entry) => ({
    role: entry.role === "assistant" ? ("model" as const) : ("user" as const),
    parts: [{ text: entry.content }],
  }));

  contents.push({
    role: "user",
    parts: [{ text: message }],
  });

  return contents;
}

export const geminiProvider: ProviderAdapter = {
  name: "gemini",

  async chat({ modelId, message, history = [] }: ChatParams): Promise<ChatResult> {
    const apiKey = requireApiKey("GEMINI_API_KEY", "gemini");
    const systemInstruction = getSystemInstruction(history);
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelId}:generateContent`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "x-goog-api-key": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...(systemInstruction
          ? { systemInstruction: { parts: [{ text: systemInstruction }] } }
          : {}),
        contents: buildGeminiContents(message, history),
      }),
    });

    if (!response.ok) {
      const detail = await readErrorBody(response);
      throw new ProviderError(
        `Gemini request failed: ${detail}`,
        "gemini",
        response.status,
      );
    }

    const data = (await response.json()) as {
      candidates?: Array<{
        content?: { parts?: Array<{ text?: string }> };
      }>;
    };

    const text = data.candidates?.[0]?.content?.parts
      ?.map((part) => part.text ?? "")
      .join("")
      .trim();

    if (!text) {
      throw new ProviderError("Gemini returned an empty response.", "gemini");
    }

    return { text };
  },
};
