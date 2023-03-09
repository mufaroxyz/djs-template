import { ActionRowBuilder, MessageActionRowComponentBuilder } from "discord.js";

export class ButtonActionRowBuilder extends ActionRowBuilder<MessageActionRowComponentBuilder> {
    addComponents(components: MessageActionRowComponentBuilder[]): this {
        return Object.assign(this, { components })
    }
}