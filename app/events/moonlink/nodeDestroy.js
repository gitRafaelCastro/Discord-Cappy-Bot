const { consoleMoonlinkError, consoleMoonlinkSuccess } = require("../../utils/logFormatter")


module.exports = {
  name: "nodeDestroy",
  execute(client, node) {
    try {
      consoleMoonlinkSuccess(`Node ${node.identifier} destruido.`)
    } catch (error) {
      consoleMoonlinkError(error)
    }
  }
}