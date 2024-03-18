const { consoleMoonlinkError, consoleTrackPlayer, consoleMoonlinkLog } = require('../../utils/logFormatter');

module.exports = {
	name: "playerUpdate",
	execute(client, payload) {
		consoleMoonlinkLog(payload)
	},
};