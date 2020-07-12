import { graphqlHTTP } from "express-graphql";
import schema from "../graphql/schema";

const graphqlMiddleware = graphqlHTTP((request) => ({
	schema,
	graphiql: true,
	context: {
		// user: request.user,
	},
}));

export default graphqlMiddleware;
