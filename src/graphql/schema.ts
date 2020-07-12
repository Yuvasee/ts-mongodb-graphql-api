import { schemaComposer } from "graphql-compose";
import UserTC from "./User";

schemaComposer.Query.addFields({
	// user: UserTC.getResolver("user", [isAuth]),
	user: UserTC.getResolver("user"),
});

const schema = schemaComposer.buildSchema();

export default schema;
