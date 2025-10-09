import { readdirSync } from "node:fs";
import path from "node:path";
import logger from "../logger.js";

export default {
  async execute(client) {
    const eventFiles = readdirSync("./events")

    Promise.all(
      eventFiles.map(async (file) => {
        logger.info(`Carregando ${file}...`)
        const event = await import(`../events/${file}`).then((x) => x.default);

        if (event.once) {
          client.once(event.name, (...args) => event.execute(...args));
          logger.info(`Evento carregado: ${event.name}`)
        } else {
          client.on(event.name, (...args) => event.execute(...args));
          logger.info(`Evento carregado: ${event.name}`)
        }
        
      })
    )
  }
}