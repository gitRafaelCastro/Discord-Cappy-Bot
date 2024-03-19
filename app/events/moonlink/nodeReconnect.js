const { consoleNodelinkError, consoleNodelinkSuccess } = require("../../utils/logFormatter")


module.exports = {
  name: "nodeReconnect",
  execute(client, node) {
    try {
      consoleNodelinkSuccess(`Node ${node.identifier} reconectado.`)
    } catch (error) {
      consoleNodelinkError(error)
    }
  }
}