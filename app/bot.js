const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const { token, clientId, lavalinkPassword, node } = require('../config.json');
const { LavalinkManager, parseLavalinkConnUrl, LavalinkNode } = require("lavalink-client")

const client = new Client({ intents: [
  GatewayIntentBits.Guilds, 
  GatewayIntentBits.GuildVoiceStates,
  GatewayIntentBits.GuildMembers,
  GatewayIntentBits.GuildMessages] });
  

client.cooldowns = new Collection();
client.commands = new Collection();



client.lavalink = new LavalinkManager({
  nodes: [{
    authorization: lavalinkPassword,
    host: "localhost",
    port: 2333,
    id: "testnode"
  }],
  sendToShard: (guildId, payload) =>
    client.guilds.cache.get(guildId)?.shard?.send(payload),
  client: {
    id: clientId, username: "Cappy Bot",
  },
  autoSkip: true,
  playerOptions: {
    clientBasedPositionUpdateInterval: 150,
    defaultSearchPlatform: "ytsearch",
    volumeDecrementer: 0.75,

    onDisconnect: {
      autoReconnect: false,
      destroyPlayer: true,
    },
    onEmptyQueue: {
      destroyAfterMs: 200_00,
    }
  },
  queueOptions: {
    maxPreviousTracks: 25
  }

});

client.lavalink.nodeManager.createNode({
  authorization: lavalinkPassword,
  host: "localhost",
  port: 2333,
  id: "testnode"
});

parseLavalinkConnUrl(node);

client.on("raw", d => client.lavalink.sendRawData(d));

const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);

    if ('data' in command && 'execute' in command) {
      client.commands.set(command.data.name, command);
    } else {
      console.warn(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`)
    }
  }
}

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}
client.login(token);
