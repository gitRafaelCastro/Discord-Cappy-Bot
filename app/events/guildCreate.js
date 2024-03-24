const { Events } = require('discord.js');
const { consoleError, consoleMoonlinkSuccess, consoleSuccess } = require('../utils/logFormatter');

module.exports = {
	name: Events.GuildCreate,
	once: false,
	execute(client, data) {
		try {
      client.Moonlink.packetUpdate(data.voiceStates, "VOICE_STATE_UPDATE");
    } catch (error) {
      consoleError(error);
    }
	},
};
