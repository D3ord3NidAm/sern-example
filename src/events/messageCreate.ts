import type { Message } from "discord.js";

const { EventType, eventModule } = require("@sern/handler");

export default eventModule({
  type: EventType.Discord,
  name: "messageCreate",
  async execute(message: Message) {
    if (message.author.bot) return;
  },
});
