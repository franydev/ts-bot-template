import { Client, Interaction } from "discord.js";

export default interface BotCommand<T> {
    name: string;
    data: T;
    exec: (cli: Client, cmd: Interaction) => Promise<void>;
}