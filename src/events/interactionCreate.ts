import { CommandInteractionOptionResolver } from "discord.js";
import { client } from "../startBot";
import { Event } from "../extensions/Event";
import { ExtendedButtonInteraction, ExtendedInteraction } from "../constants/interactions";

export default new Event("interactionCreate", async (interaction) => {

  if (interaction.isCommand()) {
    const command = client.commands.get(interaction.commandName);
    if (!command)
      return interaction.followUp("`❌` The command doesn't exist!");
    command.run({
      args: interaction.options as CommandInteractionOptionResolver,
      client,
      interaction: interaction as ExtendedInteraction,
    });

  } else if (interaction.isButton()) {
    const args = interaction.customId.split("-");

    const button = client.buttons.get(args[0]);
    if (!button)
      return interaction.reply("`❌` The button doesn't exist!");
    button.run({
      client,
      interaction: interaction as ExtendedButtonInteraction,
      args: args.slice(1),
    });
  }
});
