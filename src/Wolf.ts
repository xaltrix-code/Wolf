import { Client, Collection, SlashCommandBuilder, Routes } from "discord.js";
import { join, dirname } from "path";
import { fileURLToPath, pathToFileURL } from "url";
import { readdirSync } from "fs";
import { config, type Config } from "../config.js";
import type Command from "./classes/Command.js";

class Wolf extends Client {

    config: Config
    commands: Collection<string, Command>;

    constructor() {
        super({
            intents: []
        });

        this.config = config;
        this.commands = new Collection();
    }

    async launch(token: string | undefined) {
        await this.loadEvents();
        await this.loadCommands();
        await this.login(token);
        await this.registerApplicationCommands();

        console.log(`Successfully logged in as ${this.user?.tag} (${this.user?.id})`);
    }

    async loadEvents() {
        const __filname = fileURLToPath(import.meta.url);
        const __dirname = dirname(__filname);

        const eventsPath = join(__dirname, "events");
        const eventFiles = readdirSync(eventsPath)
            .filter(file => file.endsWith(".js"));

            let count: number = 0;

            for (const file of eventFiles) {
                const filePath = join(eventsPath, file);

                const { default: events } = await import(pathToFileURL(filePath).href);
                const eventName = file.split(".")[0];

                this.on(eventName!, events.bind(null, this));

                count++;
            }

            console.log(`Loaded ${count} events`);
    }

    async loadCommands() {
        const __filname = fileURLToPath(import.meta.url);
        const __dirname = dirname(__filname);

        const commandsPath = join(__dirname, "commands");
        const commandFiles = readdirSync(commandsPath)
            .filter(file => file.endsWith(".js"));

            for (const file of commandFiles) {
                const filePath = join(commandsPath, file);

                const { default: commandClass } = await import(pathToFileURL(filePath).href);
                const commandName = file.split(".")[0];

                
                const command: Command = new commandClass();
                this.commands.set(commandName!, command);
            }

            console.log(`Loaded ${this.commands.size} commands`);
    }

    async registerApplicationCommands() {
        const applicationCommands: SlashCommandBuilder[] = new Array();

        for (const command of this.commands) {
            const build: SlashCommandBuilder = new SlashCommandBuilder()
                .setName(command[0])
                .setDescription(command[1].description)
                .setContexts([0, 1, 2]);

            applicationCommands.push(build);
        }

        try {
            await this.rest.put(
                Routes.applicationCommands(
                    this.user!.id
                ),
                {
                    body: applicationCommands
                }
            );

            console.log(`Successfully registered all application commands`);
        } catch (error) {
            console.error(`There was an error registering application commands:\n${error}`);
        }
    }
}

export default Wolf;