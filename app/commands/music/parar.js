const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
  .setName("parar")
  .setDescription("Para a reprodução de faixas."),
  
  async execute(interaction) {
    const client = interaction.client;
    if (!interaction.guildId) return;

    const voiceId = (interaction.member)?.voice?.channelId;
    const player = client.lavalink.getPlayer(interaction.guildId);

    if(!voiceId) return interaction.reply({ 
      ephemeral: true, 
      content: ":no_entry: `>` Você não está em um canal de voz!"
    });

    if(player.voiceChannelId !== voiceId) return interaction.reply({ 
      ephemeral: true, 
      content: ":no_entry: `>` Precisamos estar no mesmo canal de voz!" 
    })

    if(!player.queue.current) return interaction.reply({ 
      ephemeral: true, 
      content: ":no_entry: `>` Eu não estou reproduzindo nada!" 
    });

    if (!player) return interaction.reply({
      ephemeral: true,
      content: ":no_entry: `>` Eu não estou conectado!"
    });

    await player.stopPlaying(true, false);

    interaction.reply({content: ":octagonal_sign: `>` Lista de reprodução parada!"})
  }
}