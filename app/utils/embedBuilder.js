const { EmbedBuilder } = require("discord.js");
const { consoleError, consoleDebug } = require("./logFormatter");
const { getUser } = require("./getters");
const { stringLimiter, randomRGB } = require("./otherUtils");
const convertToDuration = require("./durationFormatter");



const startTrackEmbed = function (client, player, current) {
  const requester = getUser(client, player.current.requester);
  return new EmbedBuilder()
    .setTitle(stringLimiter(`${current.info.title}`, 48))
    .setDescription(`:bust_in_silhouette: Por \`${current.info.author}\``)
    .setURL(current.info.uri)
    .setThumbnail(current.info.artworkUrl)
    .setColor(randomRGB())
    .addFields(
      { name: "Posição na fila", value: `:dvd: \`1 de ${player.queue.size + 1}\``, inline: true },
      { name: "Duração da faixa", value: `:hourglass: \`${convertToDuration(current.info.length)}\``, inline: true }
    )
    .setAuthor({
      name: "▶️ Tocando agora:"
    })
    .setFooter({
      text: `Adicionado por ${requester ? requester.username : "Auto-Play"}`, iconURL: `${requester ? requester.avatarURL() : client.user.avatarURL()}`
    })
}

const trackAddedEmbed = function (client, player, current) {
  const requester = getUser(client, current.requester);
  return new EmbedBuilder()
    .setTitle(stringLimiter(`${current.title}`, 48))
    .setDescription(`:bust_in_silhouette: Por \`${current.author}\``)
    .setURL(current.url)
    .setThumbnail(current.artworkUrl)
    .setColor(randomRGB())
    .addFields(
      { name: "Posição na fila", value: `:dvd: \`${player.queue.size } de ${player.queue.size }\``, inline: true },
      { name: "Duração da faixa", value: `:hourglass: \`${convertToDuration(current.duration)}\``, inline: true }
    )
    .setAuthor({
      name: "💿 Adicionado à fila:"
    })
    .setFooter({
      text: `Adicionado por ${requester ? requester.username : "Auto-Player"}`, iconURL: `${requester ? requester.avatarURL() : client.user.avatarURL()}`
    })
}

const currentTrackEmbed = function (client, player, current) {
  const requester = getUser(client, player.current.requester);

  const currentTime = Date.now();
  const elapsed = currentTime - player.get("trackStartTime");
  const remainingTime = current.duration - elapsed;

  const progressPercentage = (elapsed / current.duration) * 100;
  const progressBar = "▬".repeat(Math.floor(progressPercentage / 10)) + "🔘" + "▬".repeat(10 - Math.floor(progressPercentage / 10)) || "Erro!";
  return new EmbedBuilder()
    .setTitle(stringLimiter(`${current.title}`, 48))
    .setDescription(`:bust_in_silhouette: Por \`${current.author}\`\n\n\`-${convertToDuration(remainingTime)}\`  ${progressBar}  \`${convertToDuration(elapsed)}\` / \`${convertToDuration(current.duration)}\``)
    .setURL(current.url)
    .setThumbnail(current.artworkUrl)
    .setColor(randomRGB())
    .addFields(
      { name: "Posição na fila", value: `:dvd: \`1 de ${player.queue.size + 1}\``, inline: true },
      { name: "Duração da faixa", value: `:hourglass: \`${convertToDuration(current.duration)}\``, inline: true }
    )
    .setAuthor({
      name: "▶️ Tocando agora:"
    })
    .setFooter({
      text: `Adicionado por ${requester ? requester.username : "Auto-Player"}`, iconURL: `${requester ? requester.avatarURL() : client.user.avatarURL()}`
    })
}

module.exports = {
  startTrackEmbed,
  trackAddedEmbed,
  currentTrackEmbed
}