import {
    APIMessageButtonInteractionData,
    ButtonInteraction,
    ChatInputApplicationCommandData,
    CommandInteraction,
    CommandInteractionOptionResolver,
    GuildMember,
    PermissionResolvable
} from "discord.js";
import { MufaroClient } from "../extensions";

// Application command handler

export interface ExtendedInteraction extends CommandInteraction {
    member: GuildMember;
}

interface RunOptions {
    client: MufaroClient;
    interaction: ExtendedInteraction;
    args: CommandInteractionOptionResolver;
}

type RunFunction = (options: RunOptions) => any;

export type CommandType = {
    userPermissions?: PermissionResolvable[];
    run: RunFunction;
} & ChatInputApplicationCommandData;

// Button handler

export interface ExtendedButtonInteraction extends ButtonInteraction {
    member: GuildMember;
}

type ButtonRunFunction = (options: ButtonRunOptions) => any;

interface ButtonRunOptions {
    client: MufaroClient;
    interaction: ExtendedButtonInteraction;
    args: string[];
}

export type ButtonType = {
    custom_id: string;
    run: ButtonRunFunction;
}