const {SlashCommandBuilder} = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('parar')
		.setDescription('Para a reprodução e limpa a fila.'),
	async execute(client, interaction) {
		if (!interaction.guildId) return;

    const guildId = interaction.guildId;

    const voiceChannelId = (interaction.member)?.voice?.channelId;
    let trackPlayer = client.Moonlink.players.get(guildId);

    if (!trackPlayer) {
      
      return interaction.reply({
      ephemeral: true,
      content: ":no_entry: `>` Não estou conectado!",
    })}

    if (voiceChannelId !== trackPlayer.voiceChannel) return interaction.reply({
      ephemeral: true,
      content: ":no_entry: `>` Você precisa estar no mesmo canal de voz que eu!",
    })

    trackPlayer.stop(true);

    return interaction.reply({
      ephemeral: false,
      content: ":fire: `>` Fila de reprodução limpa!",
    })

	},
};