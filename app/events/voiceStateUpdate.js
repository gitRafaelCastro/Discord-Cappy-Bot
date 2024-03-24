const { Events } = require('discord.js');
const { consoleError, consoleMoonlinkSuccess, consoleSuccess, consoleDebug } = require('../utils/logFormatter');
const { guildId } = require("../../config.json")

module.exports = {
	name: Events.VoiceStateUpdate,
	once: false,
	execute(client, oldState, newState) {
		try {
      client.Moonlink.packetUpdate(newState, "VOICE_STATE_UPDATE")
    } catch (error) {
      consoleError(error);
    }
	},
};
