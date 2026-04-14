import Wolf from "../Wolf.js";
import { CommandInteraction } from "discord.js";

export default interface Command {
    name: string;
    description: string;
    execute: (app: Wolf, interaction: CommandInteraction, user: any) => Promise<any>;
}