const { REST, Routes } = require('discord.js');
const fs = require("node:fs");
const path = require("node:path");
const { applicationId, guildId, token } = require('../config.json');
const { consoleLog, consoleWarn, consoleSuccess } = require("../app/utils/logFormatter");

const commands = [];
const foldersPath = path.join(__dirname, '../app/commands');
const commandFiles = fs.readdirSync(foldersPath, { recursive: true }).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const filePath = path.join(foldersPath, file);
  const command = require(filePath);
  if ('data' in command && 'execute' in command) {
    commands.push(command.data.toJSON());
  } else {
    consoleWarn(`O comando em "${filePath}" está sem as propriedades necessárias.`);
  }
}


consoleLog(`Atualizando ${commands.length} comandos.`)

const rest = new REST().setToken(token);

// and deploy your commands!
(async () => {
	try {
		consoleLog(`Atualizando ${commands.length} comandos.`);

		// The put method is used to fully refresh all commands in the guild with the current set
		const data = await rest.put(
			Routes.applicationGuildCommands(applicationId, guildId),
			{ body: commands },
		);

		consoleSuccess(`${data.length} comandos atualizados com sucesso.`);
	} catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(error);
	}
})();


