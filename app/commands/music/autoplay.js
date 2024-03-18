const {SlashCommandBuilder} = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('auto-tocar')
		.setDescription('Eu deveria adicionar faixas relacionadas no fim da playlist?.')
    .addBooleanOption(opt => opt
      .setName("modo")
      .setDescription("Modo de reprodução automática.")
      .setRequired(true)),
	async execute(client, interaction) {
		if (!interaction.guildId) return;

    const guildId = interaction.guildId;

    const voiceChannelId = (interaction.member)?.voice?.channelId;
    let trackPlayer = client.Moonlink.players.get(guildId);
    const autoPlayOpt = interaction.options.getBoolean("modo");

    if (!trackPlayer) {
      
      return interaction.reply({
      ephemeral: true,
      content: ":no_entry: `>` Não estou conectado!",
    })}

    if (voiceChannelId !== trackPlayer.voiceChannel) return interaction.reply({
      ephemeral: true,
      content: ":no_entry: `>` Você precisa estar no mesmo canal de voz que eu!",
    })

    trackPlayer.setAutoPlay(autoPlayOpt)

    const modos = {
      true : "Ativada",
      false : "Desativada"
    }

    return interaction.reply({
      ephemeral: false,
      content: ":notes: `>` Modo de reprodução automatica `"+ modos[autoPlayOpt] +"`",
    })

	},
};