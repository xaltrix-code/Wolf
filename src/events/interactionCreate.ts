import { BaseInteraction } from "discord.js";
import type Command from "../classes/Command.js";
import Wolf from "../Wolf.js";

export default async function(app: Wolf, interaction: BaseInteraction) {
        if (!interaction.isCommand()) return;

        try {
            const command: Command = app.commands.get(interaction.commandName)!;
            await command.execute(app, interaction, interaction.user);
        } catch (error) {
            console.error(`There was an error executing the command ${interaction.commandName}:\n${error}`);
        }
}