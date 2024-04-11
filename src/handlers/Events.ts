import { resolve } from 'path';
import { Client } from "discord.js";
import { readdir } from "fs/promises";
import BotEvent from '../classes/BotEvent';

const {
  SUCCESS_PREFIX,
  FAILURE_PREFIX,
  INFO_PREFIX,
} = require("../utils/prefixes");

const EventsFolderPath = resolve(__dirname, '..', 'events')

export default async (cli: Client) => {
    const EventsFolder: string[] = await readdir(EventsFolderPath);

    for (const FileName of EventsFolder) {
        if (!FileName.endsWith(".js")) return;

        try {

            const data: BotEvent = (await import(resolve(EventsFolderPath, FileName))).default

            cli.on(data.name, data.exec.bind(null, cli))

            console.log(`${SUCCESS_PREFIX} Successfully connected event ${FileName}`)
        } catch(e) {
            console.log(`${FAILURE_PREFIX} There was an error while trying to connect event ${FileName}`)
            console.log(`${INFO_PREFIX} └${e}`)
        }
    }
}