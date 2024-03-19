const { consoleWebSocketSuccess, consoleWebSocketError, consoleWebSocketWarn, consoleWebSocketLog } = require("../utils/logFormatter");

// Função para adicionar um listener para um evento específico
function addEventListener(socket, eventName, callback) {
  socket.on(eventName, callback);
}

// Handler para os eventos do MoonlinkWebSocket
const moonlinkWebSocketHandler = {
  // Adiciona um listener para o evento 'open'
  onOpen: () => {
      consoleWebSocketSuccess('Conexão estabelecida com sucesso.');
  },

  // Adiciona um listener para o evento 'close'
  onClose: () => {
    consoleWebSocketLog('Conexão fechada.');
  },

  // Adiciona um listener para o evento 'message'
  onMessage: (data) => {
    consoleWebSocketLog(`Mensagem recebida: ${data}`);
  },

  // Adiciona um listener para o evento 'error'
  onError: (error) => {
    consoleWebSocketError(`Erro na conexão: ${error}`);
  }
};

module.exports = { addEventListener, moonlinkWebSocketHandler };
