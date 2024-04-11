import { Collection, SlashCommandBuilder } from "discord.js";
import BotCommand from "./BotCommand";
import { Db } from "mongodb";

declare module "discord.js" {
  interface Client {
    cmds: Collection<string, BotCommand<SlashCommandBuilder>>;
    db: Db;
  }
}
