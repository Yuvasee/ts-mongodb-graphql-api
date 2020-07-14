import { graphqlHTTP } from "express-graphql";
import { IncomingMessage } from "http";

import schema from "../graphql/schema";
import { UserProps } from "src/mongoose/schema/User";

export interface AuthContext {
	user?: UserProps;
	accessToken?: string;
}

const graphqlMiddleware = graphqlHTTP((request: IncomingMessage & AuthContext) => ({
	schema,
	graphiql: true,
	context: {
		user: request.user,
		headers: request.headers,
		accessToken: request.accessToken,
	},
}));

export default graphqlMiddleware;
