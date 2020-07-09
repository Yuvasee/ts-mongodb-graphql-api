import { graphqlHTTP } from "express-graphql";
import { schemaComposer } from "graphql-compose";

const schema = schemaComposer.buildSchema();

export default graphqlHTTP((request) => ({
	schema,
	graphiql: true,
	context: {
		// user: request.user,
	},
}));
