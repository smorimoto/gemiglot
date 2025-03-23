import * as process from "node:process";
import * as dotenv from "dotenv";
import commands from "../src/commands.json" with { type: "json" };

dotenv.config({ path: ".dev.vars" });

const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
const DISCORD_APPLICATION_ID = process.env.DISCORD_APPLICATION_ID;

// Validate environment variables
if (!DISCORD_TOKEN) {
  console.error("DISCORD_TOKEN is not set");
  process.exit(1);
}

if (!DISCORD_APPLICATION_ID) {
  console.error("DISCORD_APPLICATION_ID is not set");
  process.exit(1);
}

const url = `https://discord.com/api/v10/applications/${DISCORD_APPLICATION_ID}/commands`;

const response = await fetch(url, {
  method: "PUT",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bot ${DISCORD_TOKEN}`,
  },
  body: JSON.stringify([commands.TRANSLATE]),
});

if (response.ok) {
  console.log("Registered all commands");
  const json = await response.json();
  console.log(JSON.stringify(json, null, 2));
} else {
  const error = await response.text();
  console.error(error);
}
