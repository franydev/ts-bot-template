import chalk from 'chalk';
import discord from 'discord.js';
import { resolve } from 'path'; 
import { readdir } from 'node:fs/promises';
import { MongoClient } from 'mongodb';
import 'dotenv/config';

const { SUCCESS_PREFIX, FAILURE_PREFIX, INFO_PREFIX } = require('./utils/prefixes');

import './classes/Client'

const Client: discord.Client = new discord.Client({
    intents: [

    ]
});

const Main = async () => {
    console.log(`${INFO_PREFIX} Discord Token: ${process.env.D_TOKEN}`)

    /* Execute Handlers */

    const Handlers: string[] = await readdir(resolve(__dirname, 'handlers'));

    for (const FileName of Handlers) {
        if (!FileName.endsWith(".js")) continue;
    
        const data = await import(resolve(__dirname, 'handlers', FileName));

        try {
            data.default(Client)
            console.log(`${SUCCESS_PREFIX} handlers/${FileName} has been executed ${chalk.green('successfully')}!`);
        } catch(e) {
            console.log(`${FAILURE_PREFIX} handlers/${FileName} has ${chalk.red('failed')} to execute.`);
            console.log(`${INFO_PREFIX} └${e}`);
        }
    }

    /* MongoDB Login */
    const MongoCli = new MongoClient(process.env.MONGODB_STR!)

    Client.db = await MongoCli.db(process.env.MONGODB_DB_NAME);

    /* Login */

    Client.login(process.env.D_TOKEN);
}

Main();