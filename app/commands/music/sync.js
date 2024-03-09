const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  cooldown: 5,
  data: new SlashCommandBuilder()
  .setName("sincronizar")
  .setDescription("Reconecta e sincroniza o bot caso tenha dado algum erro."),
  async execute(interaction) {
    const client = interaction.client;

    if (!interaction.guildId) return;

    const VoiceId = (interaction.member)?.voice?.channelId;
    if (!VoiceId) return interaction.reply({
      ephemeral: true,
      content: ":no_entry: `>` Você não está em um canal de voz!"
    });

    const voiceC = interaction.member?.voice?.channel;
    if (!voiceC.joinable) return interaction.reply({
      ephemeral: true,
      content: ":no_entry: `>` Não tenho permissão para entrar nesse canal!"
    });

    const player = client.lavalink.getPlayer(interaction.guildId);

    if (player?.voiceChannelId && player.connected) return interaction.reply({
      ephemeral: true,
      content: ":warning: `>` Eu já estou conectado!"
    });

    if(player) {
      player.voiceChannelId = player?.voiceChannelId || VoiceId;
      await player.connect();
    };

    const newPlayer = await client.lavalink.createPlayer({
      guildId: interaction.guildId, 
      voiceChannelId: VoiceId, 
      textChannelId: interaction.channelId, 
      selfDeaf: true, 
      selfMute: false,
      volume: client.defaultVolume,  // default volume
      instaUpdateFiltersFix: true, // optional
      applyVolumeAsFilter: false, // if true player.setVolume(54) -> player.filters.setVolume(0.54)
    });

    await newPlayer.connect();

    await newPlayer.queue.utils.sync(true, false);

    if(!newPlayer.queue.current && !newPlayer.queue.tracks.length) return await interaction.reply({
      ephemeral: true,
      content: ":warning: `>` Não há faixas para sincronizar!"
    });

    await newPlayer.play();

    return await interaction.reply({
      ephemeral: true,
      content: ":arrows_counterclockwise: `>` Resincronizando!"
    });


  }
}