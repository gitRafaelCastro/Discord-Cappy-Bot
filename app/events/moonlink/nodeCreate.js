const loadWebSocketEvents = require("../../handlers/webSocketEventHandler")
const { consoleNodelinkError, consoleNodelinkSuccess, consoleSuccess } = require("../../utils/logFormatter")
const { MoonlinkRestFul, NodeManager, PlayerManager } = require('moonlink.js');

module.exports = {
  name: "nodeCreate",
  execute(client, node) {
    try {
      
      loadWebSocketEvents(client, node.socket)
      consoleNodelinkSuccess(`Node ${node.identifier} criado com sucesso.`)

    } catch (error) {
      consoleNodelinkError(error)
    }
  }
}