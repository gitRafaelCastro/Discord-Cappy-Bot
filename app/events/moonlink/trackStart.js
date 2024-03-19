const { consoleMoonlinkError, consoleTrackPlayer } = require('../../utils/logFormatter');
const { startTrackEmbed } = require('../../utils/embedBuilder');

module.exports = {
  name: "trackStart",
  async execute(client, player, current) {

    if (player.get("playerMessage")) {
      const oldReply = player.get("playerMessage");
      try {
        oldReply.delete()
          .then(consoleTrackPlayer(`Antiga reply apagada.`))
          .catch(console.error);
      } catch (error) {
        consoleMoonlinkError(error);
      }
    }

    try {
      const playerTextChannel = await client.channels.fetch(player.textChannel)
      const newMessage = await playerTextChannel.send({ embeds: [startTrackEmbed(client, player, current)] })

      player.set("playerMessage", newMessage);
      player.set("trackStartTime", Date.now())
    } catch (error) {
      consoleMoonlinkError(error);
    }

    consoleTrackPlayer(`${current.title} começar a tocar em ${player.node.identifier}.`);
  },
};