const { consoleTrackPlayer, consoleTrackPlayerError } = require('../../utils/logFormatter');

module.exports = {
	name: "autoLeaved",
	execute(client, player, track) {
		try {
      consoleTrackPlayer(`${player.node.identifier} desconectou automaticamente.`);
    } catch (error) {
      consoleTrackPlayerError(error);
    }
	},
};