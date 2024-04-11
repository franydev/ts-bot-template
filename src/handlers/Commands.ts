import { readdir } from "fs/promises";
import { resolve } from "path";
import { Client, Collection, REST, Routes, SlashCommandBuilder } from "discord.js";
import BotCommand from "../classes/BotCommand";

/*
 * IMPORTANT: To archive a category please make the folder have an underscore ("_") at the start.
 */

const {
  SUCCESS_PREFIX,
  FAILURE_PREFIX,
  INFO_PREFIX,
} = require("../utils/prefixes");

export default async (cli: Client) => {
  cli.cmds = new Collection();

  const CommandCategoriesFolderPath = resolve(__dirname, "..", "commands");

  const CommandCategoriesFolder: string[] = await readdir(
    CommandCategoriesFolderPath
  );

  for (const CategoryFolder of CommandCategoriesFolder) {
    const CommandsFolderPath = resolve(
      CommandCategoriesFolderPath,
      CategoryFolder
    );

    const CommandsFolder: string[] = await readdir(CommandsFolderPath);

    for (const CommandFileName of CommandsFolder) {
      if (!CommandFileName.endsWith(".js")) continue;

      try {
        const data = await import(resolve(CommandsFolderPath, CommandFileName));

        const Command: BotCommand<SlashCommandBuilder> = data.default;

        cli.cmds.set(Command.name, Command);

        console.log(`${SUCCESS_PREFIX} ${CommandFileName} loaded successfully!`)
      } catch (e) {
        console.log(`${FAILURE_PREFIX} There was an error while loading ${CommandFileName}`)
        console.log(`${INFO_PREFIX} └${e}`)
      }
    }
  }

  const cmds = cli.cmds.map(data => data.data.toJSON())

  console.log(cmds)

  const rest: REST = new REST({}).setToken(process.env.D_TOKEN!)

  console.log(await rest.put(Routes.applicationCommands(process.env.D_CLI_ID!), {
    body: cmds
  }))
};
