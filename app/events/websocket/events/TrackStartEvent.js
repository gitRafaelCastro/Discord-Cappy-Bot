
const logFormatter = require('../../../utils/logFormatter');
const { startTrackEmbed } = require('../../../utils/embedBuilder');

module.exports = async (client, data) => {
  try {
    const player = await client.Moonlink.players.get(data.guildId);
    const current = data.track;

    if (player.get("playerMessage")) {
      const oldReply = player.get("playerMessage");
      try {
        oldReply.delete()
          .then(logFormatter.consoleTrackPlayer(`Antiga reply apagada.`))
          .catch(console.error);
      } catch (error) {
        logFormatter.consoleMoonlinkError(error);
      }
    }
    const playerTextChannel = await client.channels.fetch(player.textChannel)
    const newMessage = await playerTextChannel.send({ embeds: [startTrackEmbed(client, player, current)] })

    player.set("playerMessage", newMessage);
    player.set("trackStartTime", Date.now())

    logFormatter.consoleTrackPlayer(`${current.info.title} começar a tocar em ${player.node.identifier}.`);
  } catch (error) {
    logFormatter.consoleWebSocketError(error);
  }
}
