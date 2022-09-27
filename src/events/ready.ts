import { eventModule, EventType } from "@sern/handler";
import type { Client } from "discord.js";
import { presences } from "../tools/status";

export default eventModule({
  type: EventType.Discord,
  name: "ready",
  description: "ready",
  async execute(client: Client) {
    console.log(`[CLIENT]: Logged in as ${client.user?.tag}`);
    presences(client);
  },
});
