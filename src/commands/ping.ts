import { commandModule, CommandType } from "@sern/handler";
import { serverOnly } from "../plugins/serverOnly";
import { publish } from "../plugins/publish";

export default commandModule({
  type: CommandType.Both,
  plugins: [publish(), serverOnly([""], "Hello")],
  description: "A ping command",
  execute: async (ctx, args) => {
    await ctx.reply("Pong 🏓");
  },
});
