const { Events } = require('discord.js');
const logFormatter = require('../../utils/logFormatter');
const TrackStartEvent = require('./events/TrackStartEvent');
const WebSocketClosedEvent = require('./events/WebSocketClosedEvent');


module.exports = {
	name: "event",
	async execute(client, data) {
		try {
      switch (data.type) {
            case "TrackStartEvent":
              TrackStartEvent(client, data)
              break;

            case "TrackEndEvent":
              break;

            case "WebSocketClosedEvent":
              WebSocketClosedEvent(client, data);
              break
          
            default:
              logFormatter.consoleWebSocketLog(data);
              break;
          }
    } catch (error) {
      logFormatter.consoleWebSocketError(error)
    }
	},
};