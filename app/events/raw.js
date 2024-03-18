const { Events } = require('discord.js');
const { consoleMoonlinkLog, consoleError } = require('../utils/logFormatter');

module.exports = {
	name: Events.Raw,
	once: false,
	execute(client, data) {
		try {
      client.Moonlink.packetUpdate(data);
      //consoleMoonlinkLog("Pacote enviado.")
    } catch (error) {
      consoleError(error);
    }
	},
};
