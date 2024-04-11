import { ChatInputCommandInteraction, Client, EmbedBuilder, SlashCommandBuilder } from "discord.js";
import BotCommand from "../../classes/BotCommand";

export default {
    name: 'ping',
    data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Pong!')
    ,
    exec: async (cli: Client, Interaction: ChatInputCommandInteraction) => {
        Interaction.reply({
            content: "Pong!"
        })
    }
} as BotCommand<SlashCommandBuilder>