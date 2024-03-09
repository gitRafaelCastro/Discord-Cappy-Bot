const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const { token, clientId, lavalinkPassword, node } = require('../config.json');
const { LavalinkManager, parseLavalinkConnUrl } = require("lavalink-client");
const loadLavalinkEvents = require("./events/lavalink/loader");
const { requesterTransformer, autoPlayFunction } = require("./Utils/OptimalFunctions")

const client = new Client({ intents: [
  GatewayIntentBits.Guilds, 
  GatewayIntentBits.GuildVoiceStates,
  GatewayIntentBits.GuildMembers,
  GatewayIntentBits.GuildMessages,
  GatewayIntentBits.MessageContent] });
  

client.cooldowns = new Collection();
client.commands = new Collection();

client.lavalink = new LavalinkManager({
  nodes: [{
    authorization: lavalinkPassword,
    host: "localhost",
    port: 2333,
    id: "default node"
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
    requesterTransformer: requesterTransformer,

    onDisconnect: {
      autoReconnect: true,
      destroyPlayer: false,
    },
    onEmptyQueue: {
      destroyAfterMs: 200_00,
      autoPlayFunction: autoPlayFunction
      
    },


    useUnresolvedData: true,
  },
  queueOptions: {
    maxPreviousTracks: 25,
    
  }

});

client.lavalink.nodeManager.createNode({
  authorization: lavalinkPassword,
  host: "localhost",
  port: 2333,
  id: "default node"
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

loadLavalinkEvents.loadLavalinkEvents(client);
client.login(token);
