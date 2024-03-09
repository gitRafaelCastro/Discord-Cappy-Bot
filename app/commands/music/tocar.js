const { SlashCommandBuilder, GuildMember, VoiceChannel } = require("discord.js");
const autocompleteMap = new Map();

module.exports = {
  cooldown: 5,
  data: new SlashCommandBuilder()
  .setName("tocar")
  .setDescription("Adiciona um vídeo/faixa na fila de reprodução.")
  .addStringOption(opt => opt
    .setName("query")
    .setDescription("O que tocar?")
    .setAutocomplete(true)
    .setRequired(true))
  .addStringOption(opt => opt
    .setName("fonte")
    .setDescription("Onde devo procurar?")
    .setRequired(false)
    .setChoices(
      { name: "Youtube", value: "ytsearch" },
      { name: "Youtube Music", value: "ytmsearch" },
      { name: "Soundcloud", value: "scsearch" },
      { name: "Deezer", value: "dzsearch" },
      { name: "Spotify", value: "spsearch" },
      { name: "Apple Music", value: "amsearch" },
    )),

  async execute(interaction) {

    const client = interaction.client;
    if (!interaction.guildId) return;

    const voiceId = (interaction.member)?.voice?.channelId;

    if (!voiceId) return interaction.reply({
      ephemeral: true,
      content: ":no_entry: `>` Você não está em um canal de voz!"
    });

    const voiceC = interaction.member?.voice?.channel;
    if (!voiceC.joinable) return interaction.reply({
      ephemeral: true,
      content: ":no_entry: `>` Não tenho permissão para entrar nesse canal!"
    });

    const src = (interaction.options).getString("fonte")|undefined;
    const query = (interaction.options).getString("query");

    if (query === "nothing_found") return interaction.reply({
      ephemeral: true,
      content: ":mag: `>` Nenhuma faixa/vídeo correspondente foi encontrado!"
    });

    if (query === "join_vc") return interaction.reply({
      ephemeral: true,
      content: ":no_entry: `>` Ops, ocorreu um erro, use o comando de novo."
    });

    const fromAutoComplete = (Number(query.replace("autocomplete_", "")) >= 0 && autocompleteMap.has(`${interaction.user.id}_res`)) && autocompleteMap.get(`${interaction.user.id}_res`);
    if(autocompleteMap.has(`${interaction.user.id}_res`)) {
        if(autocompleteMap.has(`${interaction.user.id}_timeout`)) clearTimeout(autocompleteMap.get(`${interaction.user.id}_timeout`));
        autocompleteMap.delete(`${interaction.user.id}_res`);
        autocompleteMap.delete(`${interaction.user.id}_timeout`);
    }

    const player = client.lavalink.getPlayer(interaction.guildId) || await client.lavalink.createPlayer({
      guildId: interaction.guildId, 
      voiceChannelId: voiceId, 
      textChannelId: interaction.channelId, 
      selfDeaf: true, 
      selfMute: false,
      volume: client.defaultVolume,  // default volume
      instaUpdateFiltersFix: true, // optional
      applyVolumeAsFilter: false, // if true player.setVolume(54) -> player.filters.setVolume(0.54)
    })

    const connected = player.connected;

    if (!connected) await player.connect();

    if (player.voiceChannelId !== voiceId) return interaction.reply({
      ephemeral: true,
      content: ":no_entry: `>` Não estou no mesmo canal que você!"
    });

    const response = (fromAutoComplete || await player.search({query: query, source: src}));
    if (!response || !response.tracks?.length) return interaction.reply({
      ephemeral: true,
      content: ":mag: `>` Nenhuma faixa/vídeo correspondente foi encontrado!"
    });

    await player.queue.add(response.loadType === "playlist" ? response.tracks : response.tracks[fromAutoComplete ? Number(query.replace("autocomplete_", "")) : 0]);

    await interaction.reply({
      content: response.loadType === "playlist" 
        ? `:cd: \`>\` Adicionadas **[${response.tracks.length}]** faixas da playlist **${response.playlist?.title ? `${response.pluginInfo.type || ""}** ${response.playlist.uri ? `[\`${response.playlist.title}\`](<${response.playlist.uri}>)` : `\`${response.playlist.title}\``}` : ""} à fila. \`${player.queue.tracks.length-response.tracks.length}º\`` 
        : `:cd: \`>\` Adicionada **[${response.tracks[0].info.title}](<${response.tracks[0].info.uri}>)** por ${response.tracks[0].info.author} na fila. \`${player.queue.tracks.length}º\`` 
    });

    if (!player.playing) await player.play( connected ? { volume: client.defaultVolume, paused: false } : undefined)
  },

  async autocomplete(interaction) {
    const client = interaction.client; 
    if(!interaction.guildId) return;
    const vcId = (interaction.member)?.voice?.channelId;
    if(!vcId) return interaction.respond([{ name: `:no_entry: \`>\` Join a voice Channel`, value: "join_vc" }]);

    const focussedQuery = interaction.options.getFocused();
    const player = client.lavalink.getPlayer(interaction.guildId) || await client.lavalink.createPlayer({
        guildId: interaction.guildId, voiceChannelId: vcId, textChannelId: interaction.channelId, // in what guild + channel(s)
        selfDeaf: true, selfMute: false, volume: client.defaultVolume, instaUpdateFiltersFix: true // configuration(s)
    });

    if(!player.connected) await player.connect();

    if(player.voiceChannelId !== vcId) return interaction.respond([{ name: `You need to be in my Voice Channel`, value: "join_vc" }]);

    const res = await player.search({ query: focussedQuery, source: interaction.options.getString("source")}, interaction.user);
    
    if(!res.tracks.length) return await interaction.respond([{ name: `No Tracks found`, value: "nothing_found" }]);
    // handle the res
    if(autocompleteMap.has(`${interaction.user.id}_timeout`)) clearTimeout(autocompleteMap.get(`${interaction.user.id}_timeout`));
    autocompleteMap.set(`${interaction.user.id}_res`, res);
    autocompleteMap.set(`${interaction.user.id}_timeout`, setTimeout(() => {
        autocompleteMap.delete(`${interaction.user.id}_res`);
        autocompleteMap.delete(`${interaction.user.id}_timeout`);
    }, 25000));
    await interaction.respond(
        res.loadType === "playlist" ? 
        [{ name: `Playlist [${res.tracks.length} Tracks] - ${res.playlist?.title}`, value: `autocomplete_0`}]
        : res.tracks.map((t, i) => ({ name: `[${formatMS_HHMMSS(t.info.duration)}] ${t.info.title} (by ${t.info.author || "Unknown-Author"})`.substring(0, 100), value: `autocomplete_${i}` })).slice(0, 25)
    );
  }
}