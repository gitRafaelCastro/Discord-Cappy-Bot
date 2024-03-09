const NodesEvents = require("./Nodes")
const PlayerEvents = require("./Player")

module.exports.loadLavalinkEvents = function (client) {
    NodesEvents.NodesEvents(client);
    PlayerEvents.PlayerEvents(client);
}