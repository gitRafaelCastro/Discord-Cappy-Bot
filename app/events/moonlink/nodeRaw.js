const { consoleMoonlinkError, consoleMoonlinkLog } = require("../../utils/logFormatter")


module.exports = {
  name: "nodeRaw",
  execute(client, node, payload) {
    try {
      //consoleMoonlinkLog(`${node.identifier} :: ${payload}`);
    } catch (error) {
      consoleMoonlinkError(error)
    }
  }
}