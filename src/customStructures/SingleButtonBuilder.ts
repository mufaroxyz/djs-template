import {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    MessageActionRowComponentBuilder,
} from 'discord.js';

export class SingleButtonBuilder extends ButtonBuilder {
    constructor() {
        super();
    }

    public label = (label: string) => {
        this.setLabel(label);
        return this.build();
    };

    public style = (style: ButtonStyle) => {
        this.setStyle(style);
        return this.build();
    };

    public customId = (customId: string) => {
        this.setCustomId(customId);
        return this.build();
    };

    public emoji = (emoji: string) => {
        this.setEmoji(emoji);
        return this.build();
    };

    public url = (url: string) => {
        this.setURL(url);
        return this.build();
    };

    build() {
        const actionRow = new ActionRowBuilder<MessageActionRowComponentBuilder>();
        actionRow.addComponents(this);
        return actionRow;
    }
}
