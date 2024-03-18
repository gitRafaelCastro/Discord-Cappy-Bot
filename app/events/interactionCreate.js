const { Events } = require('discord.js');
const { consoleError, consoleLog, consoleCommandUse } = require('../utils/logFormatter');

module.exports = {
	name: Events.InteractionCreate,
	async execute(client, interaction) {
		if (!interaction.isChatInputCommand()) return;

		const command = interaction.client.Commands.get(interaction.commandName);

		if (!command) {
			consoleError(`Comando ${interaction.commandName} não encontrado.`);
			return;
		}

		try {
			await command.execute(client, interaction);
      consoleCommandUse(`Comando ${interaction.commandName} executado por ${interaction.user.globalName} :: ${interaction.user.id}.`)
		} catch (error) {
			consoleError(error);
			if (interaction.replied || interaction.deferred) {
				try {
          interaction.followUp({ content: 'Ocorreu um erro ao usar esse comando!', ephemeral: true })
        } catch (error) {
          consoleError(error);
        };
			} else {
				await interaction.reply({ content: 'Ocorreu um erro ao usar esse comando!', ephemeral: true });
			}
		}
	},
};
