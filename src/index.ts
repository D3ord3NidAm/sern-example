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
      commands: "dist/src/commands",
      events: "dist/src/events",
    });
    /*(async () => {
      const acts = [
        {
          name: this.guilds?.cache.size,
          type: 3,
        },
        {
          name: "/commands",
          type: 5,
        },
      ] as any;
      let opt = Math.floor(Math.random() * acts.length);
      await this.login(DISCORD_TOKEN).then(() => {
        setInterval(async () => {
          this.user?.setPresence({
            activities: [
              {
                name: `${acts[opt].name}`,
                type: acts[opt].type,
              },
            ],
            status: `dnd`,
          });
        }, 15000);

        console.log(`[CLIENT]: Logged in as ${this.user?.tag}`);
      });
    })();*/
  }
  async start() {
    this.login();
  }
}
