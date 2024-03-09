const { CommandInteractionOptionResolver, GuildMember, SlashCommandBuilder } = require("discord.js")

export default {
    data: new SlashCommandBuilder()
        .setName("pular").setDescription("Pula a faixa atual.")
        .addIntegerOption(o => o.setName("pular para").setDescription("Para qual faixa pular?").setRequired(false)),
    execute: async (client, interaction) => {
        if(!interaction.guildId) return;
        const vcId = (interaction.member)?.voice?.channelId;
        const player = client.lavalink.getPlayer(interaction.guildId);
        if(!player) return interaction.reply({ ephemeral: true, content: ":no_entry: `>` Eu não estou conectado!" });
        if(!vcId) return interaction.reply({ ephemeral: true, content: ":no_entry: `>` Você não está em um canal de voz!"});
        if(player.voiceChannelId !== vcId) return interaction.reply({ ephemeral: true, content: ":no_entry: `>` Precisamos estar no mesmo canal de voz!" })
        
        const current = player.queue.current;
        const nextTrack = player.queue.tracks[0];
        
        if(!nextTrack) return interaction.reply({ ephemeral: true, content: ":no_entry: `>` Sem faixas para pular!"});

        await player.skip((interaction.options).getInteger("pular para") || 0);

        await interaction.reply({
            ephemeral: true, content: current ? 
            `Faixa pulada [\`${current?.info.title}\`](<${current?.info.uri}>) -> [\`${nextTrack?.info.title}\`](<${nextTrack?.info.uri}>)` :
            `Tocando agora [\`${nextTrack?.info.title}\`](<${nextTrack?.info.uri}>)`
        });
    }
};