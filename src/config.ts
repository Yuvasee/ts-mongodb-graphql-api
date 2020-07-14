import dotenv from "dotenv";

dotenv.config();

if (!process.env.JWT_SECRET || !process.env.TELEGRAM_BOT_TOKEN) {
	throw new Error("Env values not found");
}

export default {
	app: {
		port: process.env.APP_PORT || 21735,
		clientUrl: process.env.CLIENT_URL || "login.local",
	},
	auth: {
		jwtSecret: process.env.JWT_SECRET,
		jwtExpiration: process.env.JWT_EXPIRATION || "1d",
		telegramBotToken: process.env.TELEGRAM_BOT_TOKEN,
	},
	logs: {
		winston: process.env.WINSTON_LOG_PATH || "./logs/winston.log",
	},
	mongo: {
		host: process.env.MONGO_HOST || "localhost",
		port: process.env.MONGO_PORT || "27017",
		db: process.env.MONGO_DB_NAME || "local",
	},
};
