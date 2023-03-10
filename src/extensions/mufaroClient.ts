import {
    ApplicationCommandDataResolvable,
    Client,
    ClientEvents,
    Collection,
    GatewayIntentBits,
    Partials,
} from 'discord.js';
import { ButtonType, CommandType, ModalType } from '../constants/interactions';
import glob from 'glob';
import { promisify } from 'util';
import { RegisterCommandsOptions } from '../constants/client';
import { Event } from './Event';
import { Logger } from '../services/logger';
import { HelpService } from '../services';
import { SelectMenuType } from '../constants/interactions';

const globPromise = promisify(glob);

export class MufaroClient extends Client {
    commands: Collection<string, CommandType> = new Collection();
    buttons: Collection<string, ButtonType> = new Collection();
    selectMenus: Collection<string, SelectMenuType> = new Collection();
    modals: Collection<string, ModalType> = new Collection();
    helpService = new HelpService(this, 2);

    private ready = false;

    get clientReady() {
        return this.ready;
    }

    constructor() {
        super({
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.MessageContent,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.GuildMembers,
                GatewayIntentBits.GuildMessageReactions,
                GatewayIntentBits.DirectMessages,
            ],
            partials: [Partials.Message, Partials.User, Partials.Channel, Partials.GuildMember],
        });
    }

    start() {
        this.registerModules();
        this.login(process.env.CLIENT_TOKEN);
    }
    async importFile(filePath: string) {
        return (await import(filePath))?.default;
    }

    async registerCommands({ commands, guildId }: RegisterCommandsOptions) {
        if (guildId) {
            this.guilds.cache.get(guildId)?.commands.set(commands);
            Logger.info(`Registered commands in guild [ ${guildId} ]`);
        } else {
            this.application?.commands.set(commands);
            Logger.info(`Registered commands globally`);
        }
    }

    async commandController() {
        const slashCommands: ApplicationCommandDataResolvable[] = [];
        const commandFiles = await globPromise(`${__dirname}/../handlers/commands/*/*{.ts,.js}`);
        Logger.info(`Found [ ${commandFiles.length} ] commands`);
        commandFiles.forEach(async filePath => {
            const command: CommandType = await this.importFile(filePath);
            if (!command.name) return;
            this.commands.set(command.name, command);
            slashCommands.push(command);
        });

        this.on('ready', () => {
            if (this.ready) return;
            this.ready = true;
            this.registerCommands({
                commands: slashCommands,
                guildId: process.env.guildId,
            });
        });
    }

    async buttonController() {
        const buttonFiles = await globPromise(`${__dirname}/../handlers/buttons/*{.ts,.js}`);
        Logger.info(`Found [ ${buttonFiles.length} ] buttons`);
        buttonFiles.forEach(async filePath => {
            const button: ButtonType = await this.importFile(filePath);
            this.buttons.set(button.custom_id, button);
        });
    }

    async selectMenuController() {
        const selectMenuFiles = await globPromise(
            `${__dirname}/../handlers/selectMenus/*{.ts,.js}`
        );
        Logger.info(`Found [ ${selectMenuFiles.length} ] select menus`);
        selectMenuFiles.forEach(async filePath => {
            const selectMenu: SelectMenuType = await this.importFile(filePath);
            this.selectMenus.set(selectMenu.custom_id, selectMenu);
        });
    }

    async modalController() {
        const modalFiles = await globPromise(`${__dirname}/../handlers/modals/*{.ts,.js}`);
        Logger.info(`Found [ ${modalFiles.length} ] modals`);
        modalFiles.forEach(async filePath => {
            const modal: ModalType = await this.importFile(filePath);
            this.modals.set(modal.custom_id, modal);
        });
    }

    async eventController() {
        const eventFiles = await globPromise(`${__dirname}/../handlers/events/*{.ts,.js}`);
        eventFiles.forEach(async filePath => {
            const event: Event<keyof ClientEvents> = await this.importFile(filePath);
            this.on(event.event, event.run);
        });
    }

    async registerModules() {
        this.commandController();
        this.eventController();
        this.buttonController();
        this.selectMenuController();
        this.modalController();

        this.on('ready', () => {
            this.helpService.syncPagesLocally();
            Logger.info(`Logged in as ${this.user.tag}`);
        });
    }
}
