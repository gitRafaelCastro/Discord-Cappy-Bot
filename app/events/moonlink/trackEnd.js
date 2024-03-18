const { consoleMoonlinkError, consoleTrackPlayer } = require('../../utils/logFormatter');

module.exports = {
	name: "trackEnd",
	execute(client, player, track, payload) {
		try {
      consoleTrackPlayer(`${track.title} terminou de tocar em ${player.node.identifier}.`);
    } catch (error) {
      consoleMoonlinkError(error);
    }
	},
};