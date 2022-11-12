import { commandModule, CommandType } from "@sern/handler";
import { AttachmentBuilder, GuildMember } from "discord.js";
import { publish } from "../../plugins/publish";
import { emojis } from "../../tools/badges.json";
import axios from "axios";

export default commandModule({
  type: CommandType.MenuUser,
  plugins: [publish({ dmPermission: false })],

  description: "",
  execute: async (ctx) => {
    const member = ctx.targetMember as GuildMember;
    axios
      .get(`https://discord.com/api/users/${member.user.id}`, {
        headers: {
          Authorization: `Bot ${ctx.client.token}`,
        },
      })
      .then(async (res: any) => {
        const { banner, accent_color } = res.data;
        const _premium = member.premiumSince;
        const _nick = member.nickname
          ? member.nickname.toString()
          : member.user.username.toString();
        const flags = member?.user.flags?.toArray() as string[];
        let badges: string[] = [];
        emojis.forEach((e) => {
          if (flags?.includes(e.name)) badges.push(e.emoji);
        });
        if (
          (member.user.avatar && member.user.avatar.startsWith("a_")) ||
          banner !== null
        )
          badges.push(emojis[12].emoji);
        if (_premium) badges.push(emojis[11].emoji);

        ctx
          .reply({
            content:
              _nick + "'s badges: \n" + badges.toString().replace(",", " "),
            ephemeral: true,
          })
          .then(async () => {
            setTimeout(async () => {
              if (banner) {
                const extension = banner.startsWith("a_") ? ".gif" : ".png";
                const url =
                  `https://cdn.discordapp.com/banners/${member.user.id}/${banner}${extension}?size=1024` as string;
                const att = new AttachmentBuilder(url, {
                  name: `attachment${extension}`,
                });
                await ctx.followUp({
                  content: `And here is their banner!`,
                  files: [att],
                  ephemeral: true,
                });
              }
            }, 1000);
          });
      });
  },
});
