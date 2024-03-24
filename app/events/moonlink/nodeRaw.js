const { consoleNodelinkError, consoleNodelinkLog } = require("../../utils/logFormatter")


module.exports = {
  name: "nodeRaw",
  execute(client, node, payload) {
    try {
      
    } catch (error) {
      consoleNodelinkError(error)
    }
  }
}