import { Button } from "../extensions/Button";

export default new Button({
    custom_id: "example", // prefix of the button, arguments can be passed separated by a "-"
    run: async ({interaction}) => {
        await interaction.reply(`Button ${interaction.customId} clicked!`);
    }
})