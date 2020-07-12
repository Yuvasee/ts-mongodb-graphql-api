import express from "express";
import cors from "cors";

import "./service/logger";
import "./service/mongoose";
import config from "./config";
import authMiddleware from "./middleware/auth";
import graphqlMiddleware from "./middleware/graphql";

const app = express();

app.use(
	"/graphql",
	express.json(),
	cors({
		origin: config.app.clientUrl,
		optionsSuccessStatus: 200,
	}),
	// authMiddleware
	graphqlMiddleware
);

app.use("*", (req, res) => {
	res.status(404).send("404 Not Found");
});

app.listen(config.app.port);

console.log(`Listening port ${config.app.port}...`);
