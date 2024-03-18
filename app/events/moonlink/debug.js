const { consoleMoonlinkLog, consoleMoonlinkError } = require('../../utils/logFormatter');

module.exports = {
	name: "debug",
	execute(client, log) {
		try {
      //consoleMoonlinkLog(log);
    } catch (error) {
      consoleMoonlinkError(error);
    }
	},
};