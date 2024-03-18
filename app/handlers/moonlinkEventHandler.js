const fs = require('node:fs');
const path = require('node:path');
const { consoleLog } = require('../utils/logFormatter');

module.exports = (client) => {
  const eventsPath = path.join(__dirname, '../events/moonlink');
  const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

  for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);
    
    client.Moonlink.on(event.name, (...args) => event.execute(client, ...args));
    consoleLog(`Evento ${event.name} registrado.`)
  }
};