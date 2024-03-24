const {SlashCommandBuilder} = require("discord.js");
const { consoleMoonlinkLog } = require("../../utils/logFormatter");
const { trackAddedEmbed } = require("../../utils/embedBuilder");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('tocar')
		.setDescription('Adiciona uma faixa na fila de reprodução.')
    .addStringOption(opt => opt
      .setName('query')
      .setDescription("O nome ou link da faixa a reproduzir.")
      .setRequired(true))
    .addStringOption(opt => opt
      .setName('fonte')
      .setDescription('Onde devo procurar a faixa.')
      .setRequired(false)
      .setChoices(
        { name: "Youtube", value: "ytsearch" },
        { name: "Youtube Music", value: "ytmsearch" },
        { name: "Soundcloud", value: "scsearch" },
        { name: "Deezer", value: "dzsearch" },
        { name: "Spotify", value: "spsearch" },
        { name: "Apple Music", value: "amsearch" },
      )),
	async execute(client, interaction) {
		if (!interaction.guildId) return;

    const guildId = interaction.guildId;

    const voiceChannel = interaction.member?.voice?.channel
    const voiceChannelId = (interaction.member)?.voice?.channelId;
    const textChannelId = interaction.channelId;

    const query = interaction.options.getString("query");
    const source = interaction.options.getString("fonte")||"ytsearch";

    if (!voiceChannelId) return interaction.reply({
      ephemeral: true,
      content: ":no_entry: `>` Você precisa estar em um canal de voz!",
    })

    const trackPlayer = client.Moonlink.players.get(guildId) || client.Moonlink.players.create({
      guildId: guildId,
      voiceChannel: voiceChannelId,
      textChannel: textChannelId,
      autoLeave: false
    })  

    if (voiceChannelId !== trackPlayer.voiceChannel && trackPlayer.playing && trackPlayer.connected) return interaction.reply({
      ephemeral: true,
      content: ":no_entry: `>` Eu já estou em outro canal de voz!",
    })

    if (!voiceChannel.joinable) return interaction.reply({
      ephemeral: true,
      content: ":no_entry: `>` Eu não tenho permissão para entrar nesse canal!",
    })
    


    const searchResponse = await client.Moonlink.search({
      query,
      source: source,
      requester: interaction.user.id
    });

    switch (searchResponse.loadType) {
      case "error":
        return interaction.reply({
          ephemeral: true,
          content: ":x: `>` Ocorreu um erro ao buscar a faixa!",
        })

      case "empty":
        return interaction.reply({
          ephemeral: true,
          content: ":x: `>` Infelizmente não encontrei a faixa.",
        })

      case "playlist":
        
        for (const track in searchResponse.tracks) {
          track.requester = interaction.user.id;
          trackPlayer.queue.add(track);
        }

        await interaction.reply({
          ephemeral: false,
          fetchReply: true,
          content: ":cd: `>` " + searchResponse.tracks.length + " faixas da playlist " + searchResponse.playlistInfo.name + " foram adicionadas na fila.",
        })

        break;
    
      default:
        trackPlayer.queue.add(searchResponse.tracks[0]);

        await interaction.reply({
          embeds: [trackAddedEmbed(client, trackPlayer, searchResponse.tracks[0])]
        })
        break;
    }

    if (!trackPlayer.connected) {
      trackPlayer.connect({
        selfDeaf: true,
        selfMute: false,
      })
    }

    if (!trackPlayer.playing) {
      trackPlayer.play();
    }

    
	},
};