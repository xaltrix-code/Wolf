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
        const reply: EmbedBuilder = new EmbedBuilder()
            .setTitle("🏓 Pong")
            .setTimestamp(interaction.createdTimestamp)
            .setColor(app.config.color)
            .addFields([
                {
                    name: "Latency",
                    value: `${app.ws.ping}ms`,
                    inline: true
                },
                {
                    name: "Uptime",
                    value: `<t:${Math.round(app.readyTimestamp! / 1000 )}>`,
                    inline: true
                },
            ]);

            interaction.reply({ embeds: [reply] });

    }
}