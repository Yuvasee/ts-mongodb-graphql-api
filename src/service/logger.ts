import winston = require("winston");
import config from "../config";

const {
	format: { combine, timestamp, json },
} = winston;

winston.configure({
	format: combine(timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), json()),
	transports: [
		new winston.transports.File({
			filename: config.logs.winston,
		}),
		new winston.transports.Console({
			format: winston.format.prettyPrint(),
		}),
	],
});
