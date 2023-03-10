import axios from 'axios';
import { MufaroClient } from '../extensions';
import { ButtonActionRowBuilder } from '../customStructures/ActionRowBuilder';
import { ButtonBuilder, ButtonStyle } from 'discord.js';

interface CommandData {
    name: string;
    commandId: string;
    description: string;
}

interface CacheCommandData {
    page: number;
    command: CommandData[];
}

export class HelpService {
    private helpPages: Map<number, CommandData[]>;
    public client: MufaroClient;
    public commandsPerPage: number;

    constructor(client: MufaroClient, commandsPerPage: number) {
        this.helpPages = new Map();
        this.client = client;
        this.commandsPerPage = commandsPerPage;
    }

    public async syncPagesLocally() {
        const cache: CacheCommandData[] = [];
        const commandChunks: CommandData[] = [];
        await axios
            .get(
                `https://discord.com/api/v10/applications/${this.client.user.id}/guilds/${process.env.guildId}/commands`,
                {
                    headers: {
                        Authorization: `Bot ${process.env.CLIENT_TOKEN}`,
                    },
                }
            )
            .then(async (res: any) => {
                for (const command of res.data) {
                    commandChunks.push({
                        name: command.name,
                        commandId: command.id,
                        description: command.description,
                    });
                }
            });

        let counter = 0;
        let page = 0;

        for (const command of commandChunks) {
            if (counter == 0) {
                cache.push({
                    page,
                    command: [],
                });
            }

            cache[page].command.push(command);
            counter++;

            if (counter == this.commandsPerPage) {
                counter = 0;
                page++;
            }
        }

        for (const page of cache) {
            this.helpPages.set(page.page, []);
            for (const command of page.command) {
                this.helpPages
                    .get(page.page)
                    ?.push({
                        name: command.name,
                        commandId: command.commandId,
                        description: command.description,
                    });
            }
        }
    }

    public renderPage(page: number) {
        const commands = this.getHelpPage(page);
        let output = '';
        for (const command of commands) {
            output += `> </${command.name}:${command.commandId}> - ${command.description}\n`;
        }
        return output;
    }

    public renderActionRow(page: number) {
        const actionRow = new ButtonActionRowBuilder();
        const maxPage = this.helpPages.size - 1;
        actionRow.addComponents([
            new ButtonBuilder()
                .setCustomId(`helpChangePage-previous-${page}`)
                .setLabel('Previous')
                .setStyle(ButtonStyle.Primary)
                .setDisabled(page == 0),

            new ButtonBuilder()
                .setCustomId(`helpChangePage-next-${page}`)
                .setLabel('Next')
                .setStyle(ButtonStyle.Primary)
                .setDisabled(page == maxPage),
        ]);
        return actionRow;
    }

    private getHelpPage(page: number) {
        return this.helpPages.get(page);
    }
}
