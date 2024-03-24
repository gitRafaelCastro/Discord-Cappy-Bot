const { Events } = require('discord.js');
const { consoleError, consoleMoonlinkSuccess, consoleSuccess, consoleDebug } = require('../utils/logFormatter');
const { guildId } = require("../../config.json")

module.exports = {
	name: Events.VoiceServerUpdate,
	once: false,
	execute(client, data) {
		try {
      client.Moonlink.packetUpdate(data, "VOICE_SERVER_UPDATE")
    } catch (error) {
      consoleError(error);
    }
	},
};
