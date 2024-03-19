const {SlashCommandBuilder} = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('pausar')
		.setDescription('Pausa ou despausa a reprodução.'),
	async execute(client, interaction) {
		if (!interaction.guildId) return;

    const guildId = interaction.guildId;

    const voiceChannelId = (interaction.member)?.voice?.channelId;
    let trackPlayer = client.Moonlink.players.get(guildId);

    if (!trackPlayer) return interaction.reply({
      ephemeral: true,
      content: ":no_entry: `>` Não estou conectado!",
    })

    if (voiceChannelId !== trackPlayer.voiceChannel) return interaction.reply({
      ephemeral: true,
      content: ":no_entry: `>` Você precisa estar no mesmo canal de voz que eu!",
    })

    if (!trackPlayer.playing) return interaction.reply({
      ephemeral: true,
      content: ":no_entry: `>` Não estou tocando nada!",
    })

    if (trackPlayer.paused) {
      trackPlayer.resume()
      return interaction.reply({
        ephemeral: false,
        content: ":play_pause: `>` Reprodução despausada!",
      })
    } else {
      trackPlayer.pause()
      return interaction.reply({
        ephemeral: false,
        content: ":pause_button: `>` Reprodução pausada!",
      })
    }
	},
};