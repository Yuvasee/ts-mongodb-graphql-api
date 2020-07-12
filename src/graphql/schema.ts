import { schemaComposer } from "graphql-compose";
import userType from "./types/user/User";

schemaComposer.Query.addFields({
	userById: userType.getResolver("findById"),
});

schemaComposer.Mutation.addFields({
	signIn: userType.getResolver("signIn"),
});

const schema = schemaComposer.buildSchema();

export default schema;
