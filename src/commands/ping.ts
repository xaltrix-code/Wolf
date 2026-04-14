import { CommandInteraction, EmbedBuilder } from "discord.js";
import Wolf from "../Wolf.js";
import type Command from "../classes/Command.js";

export default class Ping implements Command {
    name: string;
    description: string;

    constructor() {
        this.name = "ping";
        this.description = "Displays the ping and uptime of the bot";
    }

    async execute(app: Wolf, interaction: CommandInteraction) {

    }
}