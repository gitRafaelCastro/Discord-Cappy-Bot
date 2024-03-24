const { Events } = require('discord.js');
const logFormatter = require('../../utils/logFormatter');
const TrackStartEvent = require('./events/TrackStartEvent');
const { NodeManager } = require('moonlink.js');


module.exports = {
	name: "stats",
	async execute(client, data) {
		try {
      logFormatter.consoleWebSocketLog(`${JSON.stringify(data)}`)
    } catch (error) {
      logFormatter.consoleWebSocketError(error)
    }
	},
};