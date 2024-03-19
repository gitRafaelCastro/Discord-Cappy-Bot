const { consoleNodelinkError } = require("../../utils/logFormatter")


module.exports = {
  name: "nodeError",
  execute(client, node, error) {
    try {
      consoleNodelinkError(`Node ${node.identifier} sofreu um erro: ${error}.`);
    } catch (error) {
      consoleNodelinkError(error)
    }
  }
}