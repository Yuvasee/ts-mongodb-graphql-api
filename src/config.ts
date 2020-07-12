/* eslint-disable max-len */
export default {
	app: {
		port: process.env.APP_PORT || 21735,
		clientUrl: process.env.CLIENT_URL || "login.local",
	},
	auth: {
		jwtSecret:
			process.env.JWT_SECRET ||
			"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImp0aSI6IjM1OTU5YWU4LTY5OTItNGI0YS04MTVhLTM3YTQ1ZGNjYzgwZSIsImlhdCI6MTU5NDU0OTExMCwiZXhwIjoxNTk0NTUyNzEwfQ.8h2tV3ZA1oXaBExInAu2hecKQwzYAM5yCXQOC3YKt0Y",
		jwtExpiration: process.env.JWT_EXPIRATION || "1d",
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
