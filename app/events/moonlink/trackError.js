const { consoleMoonlinkError, consoleTrackPlayerError } = require('../../utils/logFormatter');

module.exports = {
	name: "trackError",
	execute(client, player, track) {
		try {
      consoleTrackPlayerError(`Houve um erro ao tocar ${track.title} em ${player.node.identifier}.`);
    } catch (error) {
      consoleMoonlinkError(error);
    }
	},
};