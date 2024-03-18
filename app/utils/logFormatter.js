const chalk = require("chalk");

const coloredLog = chalk;

const consoleLog = (message) => {
  console.log(coloredLog.cyan(`[Log] -> `) + coloredLog.white(`${message}`));
};

const consoleDebug = (message) => {
  console.log(coloredLog.blue(`[Debug] -> `) + coloredLog.white(`${message}`));
};

const consoleError = (message) => {
  console.error(coloredLog.redBright(`[Erro] -> `) + coloredLog.white(`${message}`));
}

const consoleWarn = (message) => {
  console.warn(coloredLog.yellow(`[Aviso] -> `) + coloredLog.white(`${message}`));
}

const consoleSuccess = (message) => {
  console.log(coloredLog.greenBright(`[Sucesso] -> `) + coloredLog.white(`${message}`));
}

const consoleMoonlinkLog = (message) => {
  console.log(coloredLog.magenta(`[Moonlink Log] -> `) + coloredLog.white(`${message}`));
}

const consoleMoonlinkSuccess = (message) => {
  console.log(coloredLog.greenBright(`[Moonlink Sucesso] -> `) + coloredLog.white(`${message}`));
}

const consoleMoonlinkError = (message) => {
  console.error(coloredLog.redBright(`[Moonlink Erro] -> `) + coloredLog.white(`${message}`));
}

const consoleMoonlinkWarn = (message) => {
  console.warn(coloredLog.yellow(`[Moonlink Aviso] -> `) + coloredLog.white(`${message}`));
}

const consoleCommandUse = (message) => {
  console.log(coloredLog.hex('#FF8800')(`[Comando Log] -> `) + coloredLog.white(message));
}

const consoleTrackPlayer = (message) => {
  console.log(coloredLog.hex('#00ff99')(`[TrackPlayer Log] -> `) + coloredLog.white(message));
}

const consoleTrackPlayerError = (message) => {
  console.log(coloredLog.redBright(`[TrackPlayer Erro] -> `) + coloredLog.white(message));
}



// Exportar as funções
module.exports = {
  consoleLog,
  consoleDebug,
  consoleError,
  consoleWarn,
  consoleSuccess,
  consoleMoonlinkLog,
  consoleMoonlinkSuccess,
  consoleMoonlinkError,
  consoleMoonlinkWarn,
  consoleCommandUse,
  consoleTrackPlayer,
  consoleTrackPlayerError
};


