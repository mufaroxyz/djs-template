import { EmbedBuilder } from 'discord.js';
import { Command } from '../../../extensions';

export default new Command({
    name: 'help',
    description: 'Shows all commands',
    run: async ({ interaction, client }) => {
        const pages = client.helpService.renderPage(0);
        const actionRow = client.helpService.renderActionRow(0);

        const pagesEmbed = new EmbedBuilder().setTitle('Help').setDescription(pages);
        await interaction.reply({ embeds: [pagesEmbed], components: [actionRow] });
    },
});
