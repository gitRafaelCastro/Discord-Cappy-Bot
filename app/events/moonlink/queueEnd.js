const { consoleMoonlinkError, consoleTrackPlayer } = require('../../utils/logFormatter');

module.exports = {
	name: "queueEnd",
	execute(client, player) {
		try {
      consoleTrackPlayer(`A fila em ${player.node.identifier} chegou ao fim.`);
    } catch (error) {
      consoleMoonlinkError(error);
    }
	},
};