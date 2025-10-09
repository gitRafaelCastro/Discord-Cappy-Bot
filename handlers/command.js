import { Collection } from "discord.js"
import { readdirSync } from "node:fs"
import logger from "../logger.js";


export default {
  async execute(client) {
    client.COMMANDS = new Collection();
    client.COMMAND_ALIASES = new Collection();
    client.SLASH_COMMANDS = new Collection();
    client.slashDatas = [];

    const commandFolders = readdirSync("./commands");
    
    await Promise.all(

      commandFolders.map(async (category) => {

        const commandFiles = readdirSync(`./commands/${category}`);
        await Promise.all(

          commandFiles.map(async (file) => {
            logger.info(`Carregando ${file}...`)
            const commands = await import(`../commands/${category}/${file}`);

            if (commands) {
              if (commands.commandBase) {
                if (commands.commandBase.prefixData) {

                  const prefixCommand = commands.commandBase;
                  client.COMMANDS.set(
                    prefixCommand.prefixData.name,
                    prefixCommand
                  );

                  if (
                    prefixCommand.prefixData.aliases && Array.isArray(prefixCommand.prefixData.aliases)
                  ) {
                    prefixCommand.prefixData.aliases.forEach((alias) => {
                      client.COMMAND_ALIASES.set(
                        alias,
                        prefixCommand.prefixData.name,
                      );
                    });
                  }
                }
              }

              if (commands.commandBase?.slashData) {
                const slashCommand = commands.commandBase;
                client.slashDatas.push(slashCommand.slashData.toJSON());
                client.SLASH_COMMANDS.set(
                  slashCommand.slashData.name,
                  slashCommand,
                )
              }

              logger.info(`Comando carregado: ${file}`)

            }
          })
        )
      })

    );

  }
}