import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import type { ChatCompletionMessageParam } from "openai/resources.mjs";
import { transformStream } from "@crayonai/stream";
import { getMessageStore } from "./messageStore";
import { systemPrompt } from "./systemPrompt";

export async function POST(req: NextRequest) {
  try {
    // Check if API key is configured
    if (!process.env.THESYS_API_KEY) {
      console.error("THESYS_API_KEY environment variable is not set");
      return NextResponse.json(
        { error: "API key not configured. Please set THESYS_API_KEY in your .env.local file." },
        { status: 500 }
      );
    }

    const { prompt, threadId, responseId } = (await req.json()) as {
      prompt: ChatCompletionMessageParam;
      threadId: string;
      responseId: string;
    };

    const client = new OpenAI({
      baseURL: "https://api.thesys.dev/v1/embed",
      apiKey: process.env.THESYS_API_KEY,
    });

    const messageStore = getMessageStore(threadId);
    messageStore.addMessage(prompt);

    const llmStream = await client.chat.completions.create({
      model: "c1-nightly",
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        ...messageStore.getOpenAICompatibleMessageList(),
      ],
      stream: true,
    });

    // Unwrap the OpenAI stream to a C1 stream
    const responseStream = transformStream(
      llmStream,
      (chunk) => {
        return chunk.choices[0].delta.content;
      },
      {
        onEnd: ({ accumulated }) => {
          const message = accumulated.filter((chunk) => chunk).join("");
          messageStore.addMessage({
            id: responseId,
            role: "assistant",
            content: message,
          });
        },
      }
    ) as ReadableStream<string>;

    return new NextResponse(responseStream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache, no-transform",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Failed to process chat request. Please try again." },
      { status: 500 }
    );
  }
}