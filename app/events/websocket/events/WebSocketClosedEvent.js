const { guildId, clientName } = require("../../../../config.json");
const { consoleDebug, consoleWebSocketLog } = require("../../../utils/logFormatter");

module.exports = async (client, data) => {

  try {
    consoleWebSocketLog(JSON.stringify(data))


  } catch (error) {
    console.error('Erro ao atualizar a sessão:', error.message);
  }
}