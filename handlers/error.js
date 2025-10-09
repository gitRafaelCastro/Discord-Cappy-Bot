import logger from "../logger.js";

export default {
	execute() {
		const handleError = (type, error) => {
			// console.error(`${type}: ${error.stack || error.message}`);
			logger.error(`${type}: ${error.stack || error.message}`);
		};

		const processEvents = {
			unhandledRejection: "Unhandled promise rejection",
			uncaughtException: "Uncaught exception",
			uncaughtExceptionMonitor: "Uncaught exception monitored",
		};

		for (const [event, message] of Object.entries(processEvents)) {
			process.on(event, (error) => handleError(message, error));
		}
	},
};