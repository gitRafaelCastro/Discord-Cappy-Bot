const { SlashCommandBuilder } = require("discord.js");
const { getVoiceConnection } = require("@discordjs/voice");
const { consoleLog, consoleError } = require("../../utils/logFormatter");

module.exports = {
  data: new SlashCommandBuilder()
    .setName('sair')
    .setDescription('Me desconecta do canal de voz atual.'),
  async execute(client, interaction) {
    if (!interaction.guildId) return;

    const voiceChannelId = (interaction.member)?.voice?.channelId;
    let trackPlayer = client.Moonlink.players.get(interaction.guildId);

    if (!trackPlayer || !trackPlayer.connected) {
      const connection = getVoiceConnection(interaction.guildId);
      try {
        connection.disconnect();
        consoleLog("Desconectado via voiceConnection")
      } catch (error) {
        consoleError(error)
      }

      return interaction.reply({
      ephemeral: true,
      content: ":no_entry: `>` Eu não estou conectado!",
    })}

    if (voiceChannelId !== trackPlayer.voiceChannel) return interaction.reply({
      ephemeral: true,
      content: ":no_entry: `>` Você precisa estar no mesmo canal de voz que eu!",
    })

    trackPlayer.destroy();

    return interaction.reply({
      ephemeral: false,
      content: ":stop_button: `>` Desconectado!",
    })

  },
};