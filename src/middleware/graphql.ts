import { graphqlHTTP } from "express-graphql";
import { IncomingMessage } from "http";

import schema from "../graphql/schema";

const graphqlMiddleware = graphqlHTTP((request: IncomingMessage) => ({
	schema,
	graphiql: true,
	context: {
		request,
	},
}));

export default graphqlMiddleware;
