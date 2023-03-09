import { ButtonBuilder, ButtonStyle } from "discord.js";
import { Command, ButtonActionRowBuilder } from "../../extensions";

export default new Command({
    name: "example",
    description: "Test command",
    run: async ({interaction}) => {
        await interaction.reply({content: "Test command", components: [
            new ButtonActionRowBuilder()
                .addComponents([
                    new ButtonBuilder()
                        .setCustomId(`example-${interaction.user.id}`)
                        .setLabel("Example Button")
                        .setStyle(ButtonStyle.Primary)
                ])
        ]});
    }
})