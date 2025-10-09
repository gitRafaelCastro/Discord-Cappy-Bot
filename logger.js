import winston from "winston";
import path from "node:path";
import config from "./config.js";
import 'winston-daily-rotate-file';

const dateISOString = new Date().toISOString().replace(/:/g, '-');
const pathToSaveLogs = path.join('logs', dateISOString);

const winstonFormat = winston.format.printf(
  ({level, message, timestamp}) => {
    return `[${timestamp}] (${level}): ${message}`
  }
);

const transports = []

transports.push(
  new winston.transports.Console({
    format: winston.format.combine(
      winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
      winston.format.colorize(),
      winston.format.align(),
      winstonFormat,
      
    )
  })
);


if (config.saveLogs) {
  const fileRotateTransport = new winston.transports.DailyRotateFile({
    filename: 'logs/combined-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    maxFiles: '14d',
    format: winston.format.combine(
      winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      winston.format.align(),
      winstonFormat
    ),
  })

  transports.push(fileRotateTransport)
}

const logger = winston.createLogger({
  level: "info",
  transports: transports
});

logger.info(`Logger iniciado.`);

if (!config.saveLogs) {
  logger.warn("Salvamento de logs não habilitado!");
}

export default logger;