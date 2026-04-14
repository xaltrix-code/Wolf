import "dotenv/config";
import App from "./src/Wolf.js";

const app = new App();

app.launch(process.env.DISCORD_TOKEN);