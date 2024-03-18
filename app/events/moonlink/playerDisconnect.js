const { consoleMoonlinkError, consoleTrackPlayer } = require('../../utils/logFormatter');

module.exports = {
	name: "playerDisconnect",
	execute(client, player) {
		try {
      consoleTrackPlayer(`${player.node.identifier} foi desconectado.`);
      player.destroy();
    } catch (error) {
      consoleMoonlinkError(error);
    }
	},
};