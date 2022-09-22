import { Client, GatewayIntentBits, Partials } from "discord.js";

import { Sern, SernEmitter } from "@sern/handler";
import "dotenv/config";
const { DISCORD_TOKEN, defaultPrefix } = process.env;

export default class sern extends Client {
  constructor() {
    super({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
      ],
      partials: [Partials.GuildMember, Partials.GuildMember, Partials.Message],
      sweepers: {
        messages: {
          interval: 43200,
          lifetime: 21600,
        },
      },
    });
    Sern.addExternal(process);
    Sern.init({
      client: this,
      sernEmitter: new SernEmitter(),
      defaultPrefix,
      commands: "dist/commands",
      events: "dist/events",
    });
  }

  async start() {
    await this.login();
  }
}
