import { env } from "cloudflare:workers";
import { InteractionResponseType, InteractionType } from "discord-interactions";
import { Hono } from "hono";
import commands from "./commands.json" with { type: "json" };
import { verify } from "./discord.js";
import { stream } from "./translate.js";

const app = new Hono();

app.get("/", (ctx) => {
  return ctx.text(`👋 ${env.DISCORD_APPLICATION_ID}`);
});

app.post("/", async (ctx) => {
  const { isValid, interaction } = await verify(ctx);
  if (!isValid || !interaction) {
    console.error("Bad request signature");
    return ctx.text("Bad request signature", { status: 401 });
  }

  if (interaction.type === InteractionType.PING) {
    return ctx.json({ type: InteractionResponseType.PONG });
  }

  if (interaction.type !== InteractionType.APPLICATION_COMMAND) {
    console.error("Unknown Type");
    return ctx.json({ error: "Unknown Type" }, { status: 400 });
  }

  switch (interaction.data.name.toLowerCase()) {
    case commands.TRANSLATE.name.toLowerCase(): {
      const input = interaction.data.options.at(0).value;
      ctx.executionCtx.waitUntil(stream(interaction.token, input));
      return ctx.json({
        type: InteractionResponseType.DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE,
      });
    }
    default: {
      return ctx.text("Unknown Type", { status: 400 });
    }
  }
});

app.all("*", (ctx) => ctx.text("Not Found", { status: 404 }));

export default app satisfies ExportedHandler<Env>;
