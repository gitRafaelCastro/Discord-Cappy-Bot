const { consoleMoonlinkError, consoleMoonlinkSuccess } = require("../../utils/logFormatter")


module.exports = {
  name: "nodeCreate",
  execute(client, node) {
    try {
      consoleMoonlinkSuccess(`Node ${node.identifier} criado com sucesso.`)
    } catch (error) {
      consoleMoonlinkError(error)
    }
  }
}