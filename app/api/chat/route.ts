import { NextResponse } from "next/server";
import { z } from "zod";

import { providers, ProviderError } from "@/lib/providers";
import type { ProviderName } from "@/lib/providers/types";
import { routeMessage } from "@/lib/router";

const chatMessageSchema = z.object({
  role: z.enum(["user", "assistant", "system"]),
  content: z.string().min(1),
});

const chatRequestSchema = z.object({
  message: z.string().trim().min(1, "message is required"),
  history: z.array(chatMessageSchema).optional(),
});

function isProviderName(value: string): value is ProviderName {
  return value in providers;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = chatRequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Invalid request.",
          details: parsed.error.flatten(),
        },
        { status: 400 },
      );
    }

    const { message, history } = parsed.data;
    const routing = routeMessage(message);
    const { provider, modelId } = routing.model;

    if (!isProviderName(provider)) {
      return NextResponse.json(
        { error: `Unsupported provider: ${provider}` },
        { status: 500 },
      );
    }

    const result = await providers[provider].chat({
      modelId,
      message,
      history,
    });

    return NextResponse.json({
      response: result.text,
      provider,
      modelId,
      reason: routing.reason,
    });
  } catch (error) {
    if (error instanceof ProviderError) {
      return NextResponse.json(
        { error: error.message, provider: error.provider },
        { status: error.statusCode },
      );
    }

    console.error("[chat] Unexpected error:", error);
    return NextResponse.json({ error: "Unexpected server error." }, { status: 500 });
  }
}
