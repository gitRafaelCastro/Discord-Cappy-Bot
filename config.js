import "@dotenvx/dotenvx/config"

export default {
    prefix: "!",
    owners: [337237306006306817],
    token: process.env.BOT_TOKEN,
    clientID: process.env.CLIENT_ID,
    guildID: process.env.GUILD_ID,
    reloadCommands: false,
    saveLogs: false,
}

