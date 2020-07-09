import express = require("express");
import cors = require("cors");

import "./service/logger";
import "./service/mongoose";
import config from "./config";

const app = express();

app.use(
	"/graphql",
	express.json(),
	cors({
		origin: config.app.clientUrl,
		optionsSuccessStatus: 200,
	})
);

app.use("*", (req, res) => {
	res.status(404).send("404 Not Found");
});

app.listen(config.app.port);
