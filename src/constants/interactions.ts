import {
    APIMessageButtonInteractionData,
    AnySelectMenuInteraction,
    BaseSelectMenuBuilder,
    ButtonInteraction,
    ChannelSelectMenuInteraction,
    ChatInputApplicationCommandData,
    CommandInteraction,
    CommandInteractionOptionResolver,
    GuildMember,
    MentionableSelectMenuInteraction,
    ModalSubmitFields,
    ModalSubmitInteraction,
    PermissionResolvable,
    RoleSelectMenuBuilder,
    StringSelectMenuBuilder,
    StringSelectMenuInteraction,
    UserSelectMenuInteraction,
} from 'discord.js';
import { MufaroClient } from '../extensions';

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
};

// Select menu handler (Currently AnySelectMenuInteraction)
type SelectMenuRunFunction = (options: SelectMenuRunOptions) => any;

interface SelectMenuRunOptions {
    client: MufaroClient;
    interaction: AnySelectMenuInteraction;
    args: string[];
}

export type SelectMenuType = {
    custom_id: string;
    type: 'String' | 'Role' | 'User' | 'Channel';
    run: SelectMenuRunFunction;
};

// Modal handler

type ModalRunFunction = (options: ModalRunOptions) => any;

interface ModalRunOptions {
    client: MufaroClient;
    interaction: ModalSubmitInteraction;
    args: ModalSubmitFields;
}

export type ModalType = {
    custom_id: string;
    run: ModalRunFunction;
};
