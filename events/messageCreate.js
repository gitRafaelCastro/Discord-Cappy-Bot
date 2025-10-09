import { ChannelType, Collection, Events, MessageFlags } from "discord.js";
import config from "../config.js";
const cooldown = new Collection()

export default {
  name: Events.MessageCreate,
  async execute(message) {
    const { client } = message;

    if (message.author.bot) return;
    if (message.channel.type == ChannelType.DM) return;
    
    const { prefix } = config;
    if (!message.content.startsWith(prefix)) return;
    
    const args = message.content.slice(prefix.length).trim().split(/ +g/);
    const cmd = args.shift().toLowerCase();

    if (cmd.length === 0) return;

    let command = client.COMMANDS.get(cmd);
    command ||= client.COMMANDS.get(client.COMMANDS_ALIASES.get(cmd));

    if (command) {

      if (command.ownerOnly && !config.owners.includes(message.author.id)) {
        return message.reply({
          content: "Você não tem permissão para usar este comando!",
          flags: MessageFlags.Ephemeral,
        });
      };

      if (command.cooldown) {
				if (cooldown.has(`${command.name}-${message.author.id}`)) {
					const nowDate = message.createdTimestamp;
					const waitedDate =
						cooldown.get(`${command.name}-${message.author.id}`) - nowDate;
					return message
						.reply({
							content: `Tente novamente em <t:${Math.floor(
								new Date(nowDate + waitedDate).getTime() / 1000,
							)}:R>.`,
              flags: MessageFlags.Ephemeral,
						})
						.then((msg) =>
							setTimeout(
								() => msg.delete(),
								cooldown.get(`${command.name}-${message.author.id}`) -
									Date.now() +
									100,
							),
						);
				}

				command.prefixRun(message, args);

				cooldown.set(
					`${command.name}-${message.author.id}`,
					Date.now() + command.cooldown,
				);

				setTimeout(() => {
					cooldown.delete(`${command.name}-${message.author.id}`);
				}, command.cooldown);
			} else {
				command.prefixRun(message, args);
			}
    }


  }
}