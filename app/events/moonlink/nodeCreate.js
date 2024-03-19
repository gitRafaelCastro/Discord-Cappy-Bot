const { addEventListener, moonlinkWebSocketHandler } = require("../../handlers/webSocketEventHandler")
const { consoleNodelinkError, consoleNodelinkSuccess } = require("../../utils/logFormatter")


module.exports = {
  name: "nodeCreate",
  execute(client, node) {
    try {
      consoleNodelinkSuccess(`Node ${node.identifier} criado com sucesso.`)

      addEventListener(node.socket, 'open', moonlinkWebSocketHandler.onOpen);
      addEventListener(node.socket, 'close', moonlinkWebSocketHandler.onClose);
      addEventListener(node.socket, 'error', moonlinkWebSocketHandler.onError);
      addEventListener(node.socket, 'message', moonlinkWebSocketHandler.onMessage);
      
    } catch (error) {
      consoleNodelinkError(error)
    }
  }
}