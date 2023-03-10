import { TextInputBuilder } from '@discordjs/builders';
import {
    ActionRowBuilder,
    MessageActionRowComponentBuilder,
    ModalActionRowComponentBuilder,
    RestOrArray,
} from 'discord.js';

export class ButtonActionRowBuilder extends ActionRowBuilder<MessageActionRowComponentBuilder> {
    addComponents(...components: RestOrArray<MessageActionRowComponentBuilder>): this {
        return Object.assign(this, { components });
    }
}

export class ModalActionRowBuilder extends ActionRowBuilder<ModalActionRowComponentBuilder> {
    addComponents(...components: RestOrArray<TextInputBuilder>): this {
        return Object.assign(this, { components });
    }
}
