import type { HexColorString } from "discord.js";

export interface Config {
    mainGuildID: string;
    color: HexColorString;
}

export const config: Config = {
    mainGuildID: "1493539021278941214",
    color: "#0F3D2E"
}