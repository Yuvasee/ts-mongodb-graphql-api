export default {
	app: {
		port: process.env.APP_PORT || 21735,
		clientUrl: process.env.CLIENT_URL || "login.local",
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
