const { Events } = require('discord.js');
const { consoleError, consoleMoonlinkSuccess, consoleSuccess } = require('../utils/logFormatter');

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		try {
      client.Moonlink.init(client.user.id);
      consoleSuccess("Cliente inicializado.")
      consoleMoonlinkSuccess("Inicializado.")
    } catch (error) {
      consoleError(error);
    }
	},
};
