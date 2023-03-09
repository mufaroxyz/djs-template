import dotenv from "dotenv";
import { MufaroClient } from "./extensions/";
import { Logger } from "./services/logger";

export const client = new MufaroClient();
dotenv.config();

async function start(): Promise<void> {
    await client.start();
}

process.on("unhandledRejection", (error) => {
    Logger.error("Unhandled promise rejection", error);
});

start().catch(error => {
    Logger.error("Failed to start the bot", error);
})

