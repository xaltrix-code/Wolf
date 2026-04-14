import { Client } from "discord.js";
import { join, dirname } from "path";
import { fileURLToPath, pathToFileURL } from "url";
import { readdirSync } from "fs";

class Wolf extends Client {
    constructor() {
        super({
            intents: []
        })
    }

    async launch(token: string | undefined) {
        await this.login(token);
        await this.loadEvents();

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
}

export default Wolf;