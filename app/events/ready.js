const { Events } = require('discord.js');

module.exports = {
	name: Events.ClientReady,
	async execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);
		await client.lavalink.init({ ...client.user });
	},
};
