var moment = require('moment');

module.exports = {

	levels : {
		fatal : 0,
		error : 1,
		warn: 2,
		info: 3,
		debug: 4,
		trace : 5
	},
	colors : {
		fatal : "magenta",
		error : "red",
		warn: "yellow",
		info: "green",
		debug: "blue",
		trace : "gray"
	},
	consoleLogConfig : {
		timestamp : timestampFormat,
		level : "debug",
		colorize : true,
	},
	fileRotateConfig : {
		timestamp : timestampFormat,
		level : "info",
		filename : "loveletter.log",
		datePattern: 'yyyy-MM-dd',
        prepend : true,
		json : false
	}
};

function timestampFormat() {
	return moment().format("YYYY-MM-DD HH:mm:ss:SSS");
}
