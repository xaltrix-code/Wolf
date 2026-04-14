import { Client } from "discord.js";

class Wolf extends Client {
    constructor() {
        super({
            intents: []
        })
    }

    async launch(token: string | undefined) {
        await this.login(token);

        console.log(`Successfully logged in as ${this.user?.tag} (${this.user?.id})`);
    }
}

export default Wolf;