const { consoleMoonlinkError, consoleTrackPlayer } = require('../../utils/logFormatter');

module.exports = {
	name: "trackStart",
	execute(client,player, current) {
		try {
      consoleTrackPlayer(`${current.title} começou.`);
    } catch (error) {
      consoleMoonlinkError(error);
    }
	},
};