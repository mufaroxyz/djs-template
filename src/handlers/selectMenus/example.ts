import { SelectMenu } from '../../extensions';

export default new SelectMenu({
    custom_id: 'test',
    type: 'String',
    run: async ({ interaction }) => {
        interaction.reply(`Select menu ${interaction.customId} triggered!`);
    },
});
