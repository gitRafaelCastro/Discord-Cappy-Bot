const fs = require('node:fs');
const path = require('node:path');
const { consoleWebSocketLog } = require('../utils/logFormatter');

module.exports = (client, socket) => {
  const eventsPath = path.join(__dirname, '../events/websocket');
  const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

  for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);
    
    
    socket.on("message", (...args) => {
      const parsedArgs = JSON.parse(args)
      if (parsedArgs["op"] === event.name)
      
      event.execute(client, parsedArgs)});
    
    consoleWebSocketLog(`Operação ${event.name} registrada.`)
  }
};