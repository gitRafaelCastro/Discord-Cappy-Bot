const { consoleNodelinkLog, consoleNodelinkError } = require("../../utils/logFormatter")


module.exports = {
  name: "nodeClose",
  execute(client, node, code, reason) {
    try {
      consoleNodelinkLog(`Node ${node.identifier} fechado. Código: ${code}, motivo: ${reason}.`)
    } catch (error) {
      consoleNodelinkError(error)
    }
  }
}