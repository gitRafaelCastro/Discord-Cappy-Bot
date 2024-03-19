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

const consoleNodelinkLog = (message) => {
  console.log(coloredLog.hex("#f94d84")(`[Nodelink Log] -> `) + coloredLog.white(`${message}`));
}

const consoleNodelinkSuccess = (message) => {
  console.log(coloredLog.greenBright(`[Nodelink Sucesso] -> `) + coloredLog.white(`${message}`));
}

const consoleNodelinkError = (message) => {
  console.error(coloredLog.redBright(`[Nodelink Erro] -> `) + coloredLog.white(`${message}`));
}

const consoleNodelinkWarn = (message) => {
  console.warn(coloredLog.yellow(`[Nodelink Aviso] -> `) + coloredLog.white(`${message}`));
}

const consoleWebSocketLog = (message) => {
  console.log(coloredLog.hex("#f9614d")(`[WebSocket Log] -> `) + coloredLog.white(`${message}`));
}

const consoleWebSocketSuccess = (message) => {
  console.log(coloredLog.greenBright(`[WebSocket Sucesso] -> `) + coloredLog.white(`${message}`));
}

const consoleWebSocketError = (message) => {
  console.error(coloredLog.redBright(`[WebSocket Erro] -> `) + coloredLog.white(`${message}`));
}

const consoleWebSocketWarn = (message) => {
  console.warn(coloredLog.yellow(`[WebSocket Aviso] -> `) + coloredLog.white(`${message}`));
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
  consoleTrackPlayerError,
  consoleNodelinkLog,
  consoleNodelinkError,
  consoleNodelinkSuccess,
  consoleNodelinkWarn,
  consoleWebSocketLog,
  consoleWebSocketError,
  consoleWebSocketSuccess,
  consoleWebSocketWarn,
};


