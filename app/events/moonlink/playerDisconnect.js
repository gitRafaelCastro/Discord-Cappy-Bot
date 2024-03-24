const { consoleMoonlinkError, consoleTrackPlayer } = require('../../utils/logFormatter');
const { guildId } = require("../../../config.json")

module.exports = {
	name: "playerDisconnect",
	execute(client, player) {
		try {
    
      consoleTrackPlayer(`${player.node.identifier} foi desconectado.`);
    } catch (error) {
      consoleMoonlinkError(error);
    }
	},
};