
const fs = require("node:fs");
const path = require("node:path");
const { consoleLog, consoleWarn } = require("../utils/logFormatter");

module.exports = async (client) => {


  const foldersPath = path.join(__dirname, '../commands');
  const commandFiles = fs.readdirSync(foldersPath, { recursive: true }).filter(file => file.endsWith('.js'));

  for (const file of commandFiles) {
    const filePath = path.join(foldersPath, file);
    const command = require(filePath);
    if ('data' in command && 'execute' in command) {
      client.Commands.set(command.data.name, command);
      consoleLog(`Comando: ${command.data.name} adicionado a coleção.`)
    } else {
      consoleWarn(`O comando em "${filePath}" está sem as propriedades necessárias.`);
    }
  }
}