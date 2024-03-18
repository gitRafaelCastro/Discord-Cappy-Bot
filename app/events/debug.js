const { Events } = require('discord.js');
const { consoleDebug, consoleError } = require('../utils/logFormatter');

module.exports = {
	name: Events.Debug,
	once: false,
	execute(client, log) {
		try {
      //consoleDebug(log);
    } catch (error) {
      consoleError(error);
    }
	},
};