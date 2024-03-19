const { Client, GatewayIntentBits, Collection } = require("discord.js");
const { MoonlinkManager } = require("moonlink.js");
const { token, clientName, applicationId } = require("../config.json");
const loadEventHandler = require("./handlers/eventHandler")
const nodeList = require("../nodes.json");
const moonlinkEventHandler = require("./handlers/moonlinkEventHandler");
const loadCommandHandler = require("./handlers/commandHandler");

const BotClientObj = new Client({intents: [
  GatewayIntentBits.GuildMembers,
  GatewayIntentBits.GuildPresences,
  GatewayIntentBits.GuildMessages,
  GatewayIntentBits.GuildVoiceStates,
  GatewayIntentBits.Guilds,
  GatewayIntentBits.MessageContent
]})

BotClientObj.Commands = new Collection();


BotClientObj.Moonlink = new MoonlinkManager(
  nodeList,
  {
    clientId: applicationId,
    clientName: clientName,
    destroyPlayersStopped: false,
    autoResume: false,
    switchPlayersAnotherNode: false,
    previousTracksInArray: true,
    resume: false,
    
  },

  (id, data) => {
    let guild = BotClientObj.guilds.cache.get(id);
    if (guild) guild.shard.send(JSON.parse(data));
  },
);

loadCommandHandler(BotClientObj);
loadEventHandler(BotClientObj);
moonlinkEventHandler(BotClientObj);

BotClientObj.login(token);