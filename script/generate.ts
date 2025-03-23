import * as fs from "node:fs/promises";
import * as path from "node:path";
import { SlashCommandBuilder } from "discord.js";

export const TRANSLATE = new SlashCommandBuilder()
  .setName("translate")
  .setDescription("Translation service powered by Gemini Flash 2.0")
  .addStringOption((option) =>
    option
      .setName("source")
      .setDescription("Text to translate")
      .setRequired(true),
  )
  .toJSON();

const outputPath = path.join(import.meta.dirname, "../src", "commands.json");
const json = JSON.stringify({ TRANSLATE }, null, 2);

await fs.writeFile(outputPath, json);
