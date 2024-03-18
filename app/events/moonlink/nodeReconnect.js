const { consoleMoonlinkError, consoleMoonlinkSuccess } = require("../../utils/logFormatter")


module.exports = {
  name: "nodeReconnect",
  execute(client, node) {
    try {
      consoleMoonlinkSuccess(`Node ${node.identifier} reconectado.`)
    } catch (error) {
      consoleMoonlinkError(error)
    }
  }
}