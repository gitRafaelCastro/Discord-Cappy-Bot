const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName('aleatorizar')
    .setDescription('Reproduz a fila de maneira aleatória.'),
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

    if (trackPlayer.queue.size < 2) {
      return interaction.reply({
        ephemeral: true,
        content: ":no_entry: `>` A fila é muito pequena para aleatorizar!",
      })
    }

    trackPlayer.shuffle()
    return interaction.reply({
      ephemeral: false,
      content: ":twisted_rightwards_arrows: `>` Reprodução aleatória!",
    })
  },
};