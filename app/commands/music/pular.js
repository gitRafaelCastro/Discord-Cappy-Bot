const {SlashCommandBuilder} = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('pular')
		.setDescription('Pular para a uma ou mais faixas.')
    .addIntegerOption(opt => opt
      .setName("posição")
      .setDescription("Posição a reproduzir")
      .setRequired(false)),
	async execute(client, interaction) {
		if (!interaction.guildId) return;

    const guildId = interaction.guildId;

    const voiceChannelId = (interaction.member)?.voice?.channelId;
    const skipAmount = interaction.options.getInteger("posição") || 1;
    let trackPlayer = client.Moonlink.players.get(guildId);

    if (!trackPlayer) return interaction.reply({
      ephemeral: true,
      content: ":no_entry: `>` Não estou conectado!",
    })

    if (voiceChannelId !== trackPlayer.voiceChannel) return interaction.reply({
      ephemeral: true,
      content: ":no_entry: `>` Você precisa estar no mesmo canal de voz que eu!",
    })

    if (trackPlayer.queue.size < 2) {
      return interaction.reply({
        ephemeral: true,
        content: ":no_entry: `>` Não há faixas para pular",
      })
    }

    trackPlayer.skip(skipAmount);

    return interaction.reply({
      ephemeral: false,
      content: ":track_next: `>` Faixa pulada!",
    })
	},
};