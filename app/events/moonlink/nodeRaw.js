const { consoleNodelinkError, consoleNodelinkLog } = require("../../utils/logFormatter")


module.exports = {
  name: "nodeRaw",
  execute(client, node, payload) {
    try {
      consoleNodelinkLog(`${node.identifier} :: ${payload}`);
    } catch (error) {
      consoleNodelinkError(error)
    }
  }
}