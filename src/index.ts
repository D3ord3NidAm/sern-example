import { Client } from "discord.js";
import { Sern, SernEmitter } from "@sern/handler";
import "dotenv/config";
import { connection } from "mongoose";
const { defaultPrefix } = process.env;
import { Util } from "./tools/Utils";
import { DisTube, DisTubeEvents, DisTubeHandler } from "distube";
import { SpotifyPlugin } from "@distube/spotify";

export default class sern extends Client {
  utils: Util;
  player: DisTube;
  constructor() {
    super({
      intents: 131071,
      sweepers: {
        messages: {
          interval: 43200,
          lifetime: 21600,
        },
      },
    });
    this.player = new DisTube(this, { directLink: true });

    Sern.addExternal(process);
    Sern.addExternal(connection);

    Sern.init({
      client: this,
      sernEmitter: new SernEmitter(),
      defaultPrefix,
      commands: "dist/commands",
      events: "dist/events",
    });
    this.utils = new Util(this);
  }

  async start() {
    await this.login();
  }
}
