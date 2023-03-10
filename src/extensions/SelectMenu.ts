import { AnySelectMenuInteraction } from 'discord.js';
import { SelectMenuType } from '../constants/interactions';

export class SelectMenu {
    constructor(selectMenuOptions: SelectMenuType) {
        Object.assign(this, selectMenuOptions);
    }
}
