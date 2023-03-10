import { SelectMenu } from '../../extensions';

export default new SelectMenu({
    custom_id: 'test',
    type: 'String',
    run: async ({ client, interaction, args }) => {
        interaction.reply;
    },
});
