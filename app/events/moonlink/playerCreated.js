const { PlayerManager } = require('moonlink.js');
const { consoleMoonlinkError, consoleTrackPlayer } = require('../../utils/logFormatter');

module.exports = {
	name: "playerCreated",
	execute(client, guildId) {
		try {
      consoleTrackPlayer(`Novo player criado. GuildID::${guildId}.`);

      
    } catch (error) {
      consoleMoonlinkError(error);
    }
	},
};