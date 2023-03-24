import { ButtonStyle } from 'discord.js';
import { Command, ButtonActionRowBuilder } from '../../../extensions';
import { ButtonBuilder } from '../../../customStructures/SingleButtonBuilder';

export default new Command({
    name: 'example',
    description: 'Test command',
    run: async ({ interaction }) => {
        await interaction.reply({
            content: 'Test command',
            components: [
                new ButtonBuilder().label('Test Button')
            ],
        });
    },
});
