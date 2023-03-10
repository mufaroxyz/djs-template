import { Modal } from '../../extensions/Modal';

export default new Modal({
    custom_id: 'example',
    run: async ({ interaction }) => {
        await interaction.reply('Modal example');
    },
});
