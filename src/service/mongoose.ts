import mongoose = require("mongoose");
import winston = require("winston");
import config from "../config";

mongoose.connection.on("open", () => winston.info("MongoDB connected"));

const { host, port, db } = config.mongo;
mongoose
	.connect(`mongodb://${host}:${port}/${db}`, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.catch((error) => winston.error(error));

export default mongoose;
