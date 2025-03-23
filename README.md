# Gemiglot

Gemiglot is a translation Discord Bot designed to be hosted on Cloudflare Workers. It leverages Cloudflare's serverless platform with AI SDK and the OpenRouter AI SDK provider to provide translation functionality within Discord.

## Hacking the Bot

1. Clone the repository

   ```
   git clone https://github.com/smorimoto/gemiglot.git
   cd gemiglot
   ```

2. Install dependencies
   ```
   yarn install --immutable
   ```
3. Set up environment variables

   Copy the `.dev.vars.example` file to `.dev.vars` and configure the following items:

   ```
   cp .dev.vars.example .dev.vars
   ```

   ```
   DISCORD_APPLICATION_ID="xxxxxxxxxx"
   DISCORD_PUBLIC_KEY="xxxxxxxxxx"
   DISCORD_TOKEN="xxxxxxxxxx"
   OPENROUTER_API_KEY="xxxxxxxxxx"
   ```

4. Register commands

   Execute the following command to register commands with Discord:

   ```
   yarn register-commands
   ```

5. Start the local development server

   ```
   yarn dev
   ```

6. Set up ngrok (for local development)

   To receive Discord slash commands, you need an endpoint accessible from the outside. During local development, you can create an HTTP tunnel using `ngrok`.

   ```
   yarn ngrok
   ```

   Copy the displayed HTTPS link (e.g. `https://xxxxxxxxxx.ngrok.io`) and set it as the "Interactions Endpoint URL" in the Discord Developer Dashboard.

## Deployment

1. Configure secrets

   ```
   wrangler secret put DISCORD_TOKEN
   wrangler secret put DISCORD_PUBLIC_KEY
   wrangler secret put DISCORD_APPLICATION_ID
   wrangler secret put OPENROUTER_API_KEY
   ```

   You will be prompted to enter the corresponding values for each command.

2. Register commands

   Execute the following command to register commands with Discord:

   ```
   yarn register-commands
   ```

3. Deploy

   ```
   yarn deploy
   ```

   After deployment is complete, set the published Cloudflare Workers URL as the "Interactions Endpoint URL" in the Discord Developer Dashboard.

## Slash Commands

Currently, the following commands are supported:

- `/translate`
  - Translates the specified text.
