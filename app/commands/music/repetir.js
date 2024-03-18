const {SlashCommandBuilder} = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('repetir')
		.setDescription('Define o método de repetição da playlist.')
    .addIntegerOption(opt => opt
      .setName("modo")
      .setDescription("Modo de repetição de faixas/playlist.")
      .setRequired(true)
      .setChoices(
        {name: "Nenhuma", value: 0},
        {name: "Apenas a faixa atual", value: 1},
        {name: "Todas as faixas", value: 2}
      )),
	async execute(client, interaction) {
		if (!interaction.guildId) return;

    const guildId = interaction.guildId;

    const voiceChannelId = (interaction.member)?.voice?.channelId;
    let trackPlayer = client.Moonlink.players.get(guildId);
    const loopOpt = interaction.options.getInteger("modo");

    if (!trackPlayer) return interaction.reply({
      ephemeral: true,
      content: ":no_entry: `>` Não estou conectado!",
    })

    if (voiceChannelId !== trackPlayer.voiceChannel) return interaction.reply({
      ephemeral: true,
      content: ":no_entry: `>` Você precisa estar no mesmo canal de voz que eu!",
    })

    trackPlayer.setLoop(loopOpt)

    const modos = ["Nenhuma faixa", "Apenas a faixa atual", "Todas as faixas"]

    return interaction.reply({
      ephemeral: false,
      content: ":repeat: `>` Modo de repetição de playlist definido para `"+ modos[loopOpt] +"`",
    })

	},
};