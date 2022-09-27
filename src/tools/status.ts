import type { Client, ClientPresenceStatus } from "discord.js";

export function presences(client: Client) {
  const gCount = client.guilds?.cache.size.toString();
  const uCount = client.users.cache.filter((m) => !m.bot).size;
  let acts = [
    {
      name: `over ${gCount} guild(s).`,
      type: 3,
      status: "online",
    },
    {
      name: `over ${uCount} user(s).`,
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
    client.user!.setPresence({
      activities: [
        {
          name: currentAct.name.toString(),
          type: currentAct.type,
        },
      ],
      status: currentAct.status as ClientPresenceStatus,
    });
    acts.push(currentAct); //readd act back to array
  }, 15000);
}
