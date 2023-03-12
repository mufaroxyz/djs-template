import { ButtonBuilder, ButtonStyle } from 'discord.js';
import { Command, ButtonActionRowBuilder } from '../../../extensions';
import { SingleButtonBuilder } from '../../../customStructures/SingleButtonBuilder';

export default new Command({
    name: 'example',
    description: 'Test command',
    run: async ({ interaction }) => {
        await interaction.reply({
            content: 'Test command',
            components: [
                new SingleButtonBuilder().label('Test Button')
            ],
        });
    },
});
