const { Events } = require('discord.js');
const { consoleError, consoleDebug } = require('../utils/logFormatter');
const { guildId } = require("../../config.json")
const { getVoiceConnection } = require('@discordjs/voice');




module.exports = {
	name: Events.Raw,
	once: false,
	execute(client, data) {
		try {
      client.Moonlink.packetUpdate(data);

      if (client.PlayerManager) {
        client.PlayerManager.handleVoiceServerUpdate({session_id: client.moonlinkRest.sessionId, data}, guildId)
      }
      
      //consoleMoonlinkLog("Pacote enviado.")
    } catch (error) {
      consoleError(error);
    }
	},
};
