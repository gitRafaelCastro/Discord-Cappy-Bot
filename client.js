import { readdirSync } from "node:fs"
import { Client, GatewayIntentBits, Partials } from "discord.js";
import path from "node:path";
import logger from "./logger.js";

export default class BaseClient {
	constructor(token) {
		this.client = new Client({
			intents: Object.values(GatewayIntentBits),
			partials: Object.values(Partials),
			shards: "auto",
		});

		this.token = token
	};

	loadHandlers() {
		readdirSync("./handlers").forEach( async (file) => {
			const handlerFile = await import(`./handlers/${file}`);
			const handler = handlerFile.default;
			logger.info(`Carregando ${file}...`)
			handler.execute(this.client);
		})
	};

	start() {
		this.loadHandlers();
		this.client.login(this.token)
	};
}