const { consoleNodelinkError, consoleNodelinkSuccess } = require("../../utils/logFormatter")


module.exports = {
  name: "nodeDestroy",
  execute(client, node) {
    try {
      consoleNodelinkSuccess(`Node ${node.identifier} destruido.`)
    } catch (error) {
      consoleNodelinkError(error)
    }
  }
}