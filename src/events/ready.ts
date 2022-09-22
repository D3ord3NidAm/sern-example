import { eventModule, EventType } from "@sern/handler";
import type { Client, PresenceStatusData } from "discord.js";

export default eventModule({
  type: EventType.Discord,
  name: "ready",
  description: "ready",
  async execute(sern: Client) {
    console.log(`[CLIENT]: Logged in as ${sern.user?.tag}`);
    const gCount = sern.guilds?.cache.size.toString();
    let acts = [
      {
        name: `over ${gCount} guild(s).`,
        type: 3,
        status: "online",
      },
      {
        name: "/commands",
        type: 5,
        status: "dnd",
      },
    ];
    setInterval(async () => {
      const currentAct = acts.shift()!; //remove first act
      sern.user?.setPresence({
        activities: [
          {
            name: currentAct.name.toString(),
            type: currentAct.type,
          },
        ],
        status: currentAct.status as PresenceStatusData,
        // status: "dnd"
      });
      acts.push(currentAct); //readd act back to array
    }, 15000);
    // setInterval(async () => {
    //   for (const act of acts) {
    //     sern.user?.setPresence({
    //       activities: [
    //         {
    //           name: act.name.toString(),
    //           type: act.type,
    //         },
    //       ],
    //       status: act.status as PresenceStatusData,
    //       // status: "dnd"
    //     });
    //   }
    // }, 15000);
  },
});
