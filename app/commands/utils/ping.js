const {SlashCommandBuilder} = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Checa o delay do bot.'),
	async execute(client, interaction) {
		const sent = await interaction.reply({ content: 'Pingando...', fetchReply: true });
    interaction.editReply(`Latência: ${sent.createdTimestamp - interaction.createdTimestamp}ms`);
	},
};