import { Event } from "../extensions/Event";
import { client } from "../startBot";
import { ActivityType } from "discord.js";

export default new Event("ready", () => {
  client.user.setActivity(`/help | ${client.user.tag}`, {
    type: ActivityType.Playing,
  }); // feel free to remove that and do whatever you want

});