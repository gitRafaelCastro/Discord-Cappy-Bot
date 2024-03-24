const {SlashCommandBuilder} = require("discord.js");
const { currentTrackEmbed } = require("../../utils/embedBuilder");
const { consoleMoonlinkError, consoleTrackPlayer } = require('../../utils/logFormatter');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('tocando')
		.setDescription('Vê qual faixa está tocando agora'),
	async execute(client, interaction) {
		if (!interaction.guildId) return;

    const guildId = interaction.guildId;

    

    if (!client.Moonlink.players.get(guildId) || !client.Moonlink.players.get(guildId).playing ) return interaction.reply({
      ephemeral: true,
      content: ":no_entry: `>` Não estou conectado!",
    })

    const trackPlayer = client.Moonlink.players.get(guildId);

    if (trackPlayer.get("playingEmbed")) {
      const oldReply = trackPlayer.get("playingEmbed");
      try {
        oldReply.delete()
          .then(consoleTrackPlayer(`Antiga reply tocando apagada.`))
          .catch(console.error);
      } catch (error) {
        consoleMoonlinkError(error);
      }
    }

    const response = await interaction.reply({
      embeds: [currentTrackEmbed(client, trackPlayer, trackPlayer.current)],
    })

    trackPlayer.set("playingEmbed", response);

	},
};