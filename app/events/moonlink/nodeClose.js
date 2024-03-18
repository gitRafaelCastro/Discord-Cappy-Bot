const { consoleMoonlinkError, consoleMoonlinkLog } = require("../../utils/logFormatter")


module.exports = {
  name: "nodeClose",
  execute(client, node, code, reason) {
    try {
      consoleMoonlinkLog(`Node ${node.identifier} fechado. Código: ${code}, motivo: ${reason}.`)
    } catch (error) {
      consoleMoonlinkError(error)
    }
  }
}