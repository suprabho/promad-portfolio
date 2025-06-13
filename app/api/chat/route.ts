import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import type { ChatCompletionMessageParam } from "openai/resources.mjs";
import { transformStream } from "@crayonai/stream";
import { getMessageStore } from "./messageStore";

export async function POST(req: NextRequest) {
  const { prompt, threadId, responseId } = (await req.json()) as {
    prompt: ChatCompletionMessageParam;
    threadId: string;
    responseId: string;
  };

  const client = new OpenAI({
    baseURL: "https://api.thesys.dev/v1/embed",
    apiKey: process.env.THESYS_API_KEY, // Use the API key you created in the previous step
  });

  const messageStore = getMessageStore(threadId);
  messageStore.addMessage(prompt);

  const llmStream = await client.chat.completions.create({
    model: "c1-nightly",
    messages: messageStore.getOpenAICompatibleMessageList(),
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
}