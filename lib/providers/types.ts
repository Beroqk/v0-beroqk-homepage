export type ProviderName =
  | "openai"
  | "anthropic"
  | "xai"
  | "gemini"
  | "mistral"
  | "perplexity";

export type ChatRole = "user" | "assistant" | "system";

export interface ChatMessage {
  role: ChatRole;
  content: string;
}

export interface ChatParams {
  modelId: string;
  message: string;
  history?: ChatMessage[];
}

export interface ChatResult {
  text: string;
}

export interface ProviderAdapter {
  readonly name: ProviderName;
  chat(params: ChatParams): Promise<ChatResult>;
}

export class ProviderError extends Error {
  readonly provider: ProviderName;
  readonly statusCode: number;

  constructor(message: string, provider: ProviderName, statusCode = 502) {
    super(message);
    this.name = "ProviderError";
    this.provider = provider;
    this.statusCode = statusCode;
  }
}

export function requireApiKey(
  envVar: string,
  provider: ProviderName,
): string {
  const apiKey = process.env[envVar]?.trim();

  if (!apiKey) {
    throw new ProviderError(`${envVar} is not configured.`, provider, 503);
  }

  return apiKey;
}

export async function readErrorBody(response: Response): Promise<string> {
  try {
    const data = (await response.json()) as {
      error?: { message?: string };
      message?: string;
    };

    return data.error?.message ?? data.message ?? response.statusText;
  } catch {
    return response.statusText || "Unknown provider error";
  }
}

export function buildOpenAIMessages(
  message: string,
  history: ChatMessage[] = [],
): Array<{ role: ChatRole; content: string }> {
  return [...history, { role: "user" as const, content: message }];
}
