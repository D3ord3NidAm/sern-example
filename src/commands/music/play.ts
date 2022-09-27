import {
  Args,
  commandModule,
  CommandType,
  Context,
  SernOptionsData,
} from "@sern/handler";
import {
  ApplicationCommandOptionType,
  GuildMember,
  GuildMemberManager,
} from "discord.js";
import { publish } from "../../plugins/publish";
// import i18next from "i18next";
// const { getLang } = require("../../util/getLangUser");

export default commandModule({
  type: CommandType.Both,
  plugins: [publish()],
  description: "play music",
  options: [
    {
      name: "query",
      description: "keyword search or url",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],
  //alias : [],
  execute: async (ctx: Context, [type, args]) => {
    // getLang(ctx.user.id, ctx.guild.id, i18next);
    // const guildmembercheck = ctx.client.guilds.cache
    //   .get(ctx.guild.id)
    //   ?.members.cache.get(ctx.user.id);
    // const guildmemberid = ctx.client.guilds.cache
    //   .get(ctx.guild.id)
    //   ?.members.cache.get(ctx.user.id)!.voice.channel?.id;
    // if (guildmembercheck?.voice.channel) {
    //   if (guildmemberid === ctx.guild.members.me!.voice.channel!.id) {
    //     ctx.reply({
    //       content: `You can play music!`,
    //       ephemeral: true,
    //     });
    //   } else {
    //     ctx.reply({
    //       content: `NotSameVC <#${ctx.guild.members.me!.voice.channel!.id}>`,
    //       ephemeral: true,
    //     });
    //   }
    // } else {
    //   ctx.reply({ content: `NotInVC`, ephemeral: true });
    // }
  },
});
