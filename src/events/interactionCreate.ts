import { Client, Interaction } from "discord.js";
import BotEvent from "../classes/BotEvent";
import BotCommand from "../classes/BotCommand";

export default {
    name: 'interactionCreate',
    exec: async (client: Client, interaction: Interaction) => {
        if (!(
            interaction.isChatInputCommand()
        )) return;

        const data: BotCommand<any> | undefined = client.cmds.get(interaction.commandName);

        if (!data) {
            interaction.reply({
                ephemeral: true,
                content: `Could not find the specified command. Please report this error to franyDev.`
            })
            return;
        }

        try {
            data.exec(client, interaction)
        } catch {
            interaction.reply({
                ephemeral: true,
                content: `There was an error while running this command, please report this to franyDev.`
            })
        }
    }
} as BotEvent