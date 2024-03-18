const { consoleMoonlinkError } = require("../../utils/logFormatter")


module.exports = {
  name: "nodeError",
  execute(client, node, error) {
    try {
      consoleMoonlinkError(`Node ${node.identifier} sofreu um erro: ${error}.`);
    } catch (error) {
      consoleMoonlinkError(error)
    }
  }
}