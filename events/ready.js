import { ActivityType, Events, REST, Routes } from "discord.js";
import config from "../config.js";
import logger from "../logger.js";

export default {
	name: Events.ClientReady,
	once: true,
	async execute(client) {
		const rest = new REST().setToken(client.token);

		client.user.presence.set({
			activities: [
				{name: "Desenvolvido por .rafah_", type: ActivityType.Listening}
			],
		});

		logger.info(`${client.user.username} está ativo!`);

		if (!config.reloadCommands) return

		try {

			logger.warn(`Limpando cache de ${client.slashDatas.length} comando(s) de guilda...`)

			await rest.put(Routes.applicationGuildCommands(config.clientID, config.guildID), {
				body: [],
			}).then(() => {
				rest.put(Routes.applicationGuildCommands(config.clientID, config.guildID), {
					body: client.slashDatas,
				});

				logger.warn(`Recarregando ${client.slashDatas.length} comando(s) de guilda...`)
			});

			logger.warn(`Limpando cache de ${client.slashDatas.length} comando(s) de aplicação...`)
			await rest.put(Routes.applicationCommands(config.clientID), {
				body: [],
			}).then(() => {
				rest.put(Routes.applicationCommands(config.clientID), {
					body: client.slashDatas,
				});
				logger.warn(`Recarregando ${client.slashDatas.length} comando(s) de aplicação...`)
			});

			logger.info(`${client.slashDatas.length} comando(s) carregados!`)
		} catch (error) {
			console.error(error)
			logger.error(`${error}`)
		}
	}
}