const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
  .setName("repetir")
  .setDescription("Define um modo de repetição para a lista de reprodução.")
  .addStringOption(opt => opt
    .setName("modo")
    .setDescription("De qual modo devo repetir a lista de reprodução?")
    .setRequired(true)
    .setChoices(
      {name: "Desligado", value: "off"},
      {name: "Somente esta faixa", value: "track"},
      {name: "Todas as faixas.", value: "queue"},
      )),

  async execute(interaction) {
    const client = interaction.client;
    if(!interaction.guildId) return;

    const vcId = (interaction.member)?.voice?.channelId;

    const player = client.lavalink.getPlayer(interaction.guildId);

    if(!player) return interaction.reply({ ephemeral: true, content: ":no_entry: `>` Eu não estou conectado!" });
    if(!vcId) return interaction.reply({ ephemeral: true, content: ":no_entry: `>` Você não está em um canal de voz!"});
    if(player.voiceChannelId !== vcId) return interaction.reply({ ephemeral: true, content: ":no_entry: `>` Precisamos estar no mesmo canal de voz!" })
    
    const selectedMode = (interaction.options).getString("modo")
    await player.setRepeatMode(selectedMode);

    const localizedResponses = {
      off: "Desligado.",
      track: "Apenas esta faixa.",
      queue: "Todas as faixas."
    }

    await interaction.reply({
        ephemeral: true, content: ":repeat: `>` Modo de reprodução definido para: **"+ localizedResponses[selectedMode] +"**"
    });
  }
}