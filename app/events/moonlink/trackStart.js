const { consoleMoonlinkError, consoleTrackPlayer } = require('../../utils/logFormatter');

module.exports = {
	name: "trackStart",
	execute(client, player, current) {
		try {
      consoleTrackPlayer(`${current.title} começar a tocar em ${player.node.identifier}.`);
    } catch (error) {
      consoleMoonlinkError(error);
    }
	},
};