const { Events } = require("discord.js");
const { consoleError } = require("../utils/logFormatter");

module.exports = {
  name: Events.Error,
  execute(client, payload) {
    consoleError(payload);
  }
}