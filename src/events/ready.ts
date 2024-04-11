import { Client } from "discord.js";
import BotEvent from "../classes/BotEvent";

const { SUCCESS_PREFIX } = require('../utils/prefixes')

export default {
    name: 'ready',
    exec: async (client: Client) => {
        console.log(`${SUCCESS_PREFIX} Logged in as ${client.user?.tag}!`)
    }
} as BotEvent