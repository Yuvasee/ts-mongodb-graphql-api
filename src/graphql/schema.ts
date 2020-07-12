import { schemaComposer } from "graphql-compose";
import userType from "./User";

schemaComposer.Query.addFields({
	userById: userType.getResolver("findById"),
});

schemaComposer.Mutation.addFields({
	signIn: userType.getResolver("signIn"),
});

const schema = schemaComposer.buildSchema();

export default schema;
