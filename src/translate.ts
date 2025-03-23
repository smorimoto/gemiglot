import { env } from "cloudflare:workers";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { streamText } from "ai";

export async function stream(token: string, input: string) {
  const PATCH_ENDPOINT = `https://discord.com/api/v10/webhooks/${env.DISCORD_APPLICATION_ID}/${token}/messages/@original`;

  const openRouter = createOpenRouter({ apiKey: env.OPENROUTER_API_KEY });
  const { textStream } = streamText({
    model: openRouter.chat("google/gemini-2.0-flash-001"),
    prompt: `Translate the following input text from any language into accurate and natural-sounding English: ${input}`,
  });

  const headers = new Headers();
  headers.set("content-type", "application/json");

  let content = "";
  for await (const chunk of textStream) {
    content += chunk;
    await fetch(PATCH_ENDPOINT, {
      method: "PATCH",
      body: JSON.stringify({ content: content }),
      headers: headers,
    });
  }
}
