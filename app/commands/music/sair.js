const { SlashCommandBuilder } = require("discord.js");
const { getVoiceConnection } = require("@discordjs/voice");
const { consoleLog, consoleError, consoleDebug } = require("../../utils/logFormatter");
const { trackAddedEmbed } = require("../../utils/embedBuilder");

module.exports = {
  data: new SlashCommandBuilder()
    .setName('sair')
    .setDescription('Me desconecta do canal de voz atual.'),
  async execute(client, interaction) {
    if (!interaction.guildId) return;

    const voiceChannelId = (interaction.member)?.voice?.channelId;
    

    if (!client.Moonlink.players.has(interaction.guildId)) {

      return interaction.reply({
      ephemeral: true,
      content: ":no_entry: `>` Eu não estou conectado!",
    })}

    const trackPlayer = client.Moonlink.players.get(interaction.guildId);

    if (voiceChannelId !== trackPlayer.voiceChannel) return interaction.reply({
      ephemeral: true,
      content: ":no_entry: `>` Você precisa estar no mesmo canal de voz que eu!",
    })
    

    const stopCall = await trackPlayer.stop()

    if (stopCall) trackPlayer.destroy()

    
    return interaction.reply({
      ephemeral: false,
      content: ":stop_button: `>` Desconectado!",
    })

  },
};