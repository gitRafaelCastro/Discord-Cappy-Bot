const { Events } = require('discord.js');
const logFormatter = require('../../utils/logFormatter');
const TrackStartEvent = require('./events/TrackStartEvent');
const { NodeManager } = require('moonlink.js');


module.exports = {
	name: "ready",
	async execute(client, data) {
		try {
      logFormatter.consoleWebSocketSuccess(`Sessão definida para: ${data.sessionId}`)
    } catch (error) {
      logFormatter.consoleWebSocketError(error)
    }
	},
};