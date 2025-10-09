import { Collection, Events, InteractionType, MessageFlags } from "discord.js";
import config from "../config.js";
import logger from "../logger.js";
const cooldown = new Collection();


export default {
  name: Events.InteractionCreate,
  async execute(interaction) {
    const { client } = interaction;

    if (interaction.type == InteractionType.ApplicationCommand) {
      if (interaction.user.bot) return;
    }

    try {
      const command = client.SLASH_COMMANDS.get(interaction.commandName);
      if (command) {
        if (
          command.ownerOnly && !config.owners.includes(interaction.user.id)
        ) {
          return interaction.reply({
            content: "Você não tem permissão para usar este comando!",
            flags: MessageFlags.Ephemeral,
          });
        }

        if (command.cooldown) {
          if (cooldown.has(`${command.name}-${interaction.user.id}`)) {
            const nowDate = interaction.createdTimestamp;
            const waitedDate =
              cooldown.get(`${command.name}-${interaction.user.id}`) - nowDate;

            return interaction
            .reply({
              content: `Tente novamente em <t:${Math.floor(new Date(nowDate + waitedDate).getTime() / 1000,)}:R>.`,
              flags: MessageFlags.Ephemeral,
            })
            .then(() => 
              setTimeout(
                () => interaction.deleteReply(),
                cooldown.get(`${command.name}-${interaction.user.id}`) -
                Date.now() + 100,
              )
            );
          }

          command.slashRun(interaction);

          cooldown.set(
            `${command.name}-${interaction.user.id}`,
            Date.now() + command.cooldown
          );

          setTimeout(() => {
            cooldown.delete(`${command.name}-${interaction.user.id}`);
          }, command.cooldown + 1000);
        } else {
          command.slashRun(interaction);
        }
      }
    } catch (e) {
      logger.error(`Interação: ${interaction}: ${e}`)
      interaction.reply({
        content: "Houve um erro ao executar o comando!",
        flags: MessageFlags.Ephemeral,
      })
    }
  }
}