const { consoleMoonlinkError, consoleTrackPlayer } = require('../../utils/logFormatter');

module.exports = {
	name: "playerMove",
	execute(client, player, newVoiceChannel, oldVoiceChannel) {
		try {
      consoleTrackPlayer(`${player.node.identifier} foi movido do canal ${oldVoiceChannel} para ${newVoiceChannel}.`);
    } catch (error) {
      consoleMoonlinkError(error);
    }
	},
};