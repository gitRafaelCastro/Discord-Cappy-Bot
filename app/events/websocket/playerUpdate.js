const { Events } = require('discord.js');
const logFormatter = require('../../utils/logFormatter');
const TrackStartEvent = require('./events/TrackStartEvent');
const { NodeManager } = require('moonlink.js');


module.exports = {
	name: "playerUpdate",
	async execute(client, data) {
		try {
      logFormatter.consoleWebSocketLog(`update: ${JSON.stringify(data)}`)
    } catch (error) {
      logFormatter.consoleWebSocketError(error)
    }
	},
};