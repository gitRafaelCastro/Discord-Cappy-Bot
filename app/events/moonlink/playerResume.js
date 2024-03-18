const { consoleMoonlinkError, consoleTrackPlayer } = require('../../utils/logFormatter');

module.exports = {
	name: "playerResume",
	execute(client, player) {
		try {
      consoleTrackPlayer(`${player.node.identifier} retrnou ao último ponto.`);
    } catch (error) {
      consoleMoonlinkError(error);
    }
	},
};