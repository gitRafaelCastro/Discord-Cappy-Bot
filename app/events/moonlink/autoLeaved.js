const { consoleMoonlinkLog, consoleMoonlinkError } = require('../../utils/logFormatter');

module.exports = {
	name: "autoLeaved",
	execute(client, player, track) {
		try {
      consoleMoonlinkLog(`${player.node.identifier} desconectou automaticamente.`);
    } catch (error) {
      consoleMoonlinkError(error);
    }
	},
};