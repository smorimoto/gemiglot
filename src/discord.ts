import { env } from "cloudflare:workers";
import { verifyKey } from "discord-interactions";
import type { Context } from "hono";

export async function verify(ctx: Context) {
  const signature = ctx.req.header("x-signature-ed25519");
  const timestamp = ctx.req.header("x-signature-timestamp");
  const body = await ctx.req.text();
  const isValidRequest =
    signature &&
    timestamp &&
    (await verifyKey(body, signature, timestamp, env.DISCORD_PUBLIC_KEY));
  if (!isValidRequest) {
    return { isValid: false };
  }
  return { interaction: JSON.parse(body), isValid: true };
}
