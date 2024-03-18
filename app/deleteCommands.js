const { REST, Routes } = require('discord.js');
const { applicationId, guildId, token } = require('../config.json');

const rest = new REST().setToken(token);

rest.put(Routes.applicationGuildCommands(applicationId, guildId), { body: [] })
  .then(() => console.log('Todos os comandos de guilda foram apagados.'))
  .catch(console.error);

rest.put(Routes.applicationCommands(applicationId), { body: [] })
  .then(() => console.log('Todos os comandos globais foram apagados.'))
  .catch(console.error);