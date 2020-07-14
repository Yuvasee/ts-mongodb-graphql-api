import { schemaComposer } from "graphql-compose";
import UserTC from "./types/user/User";
import { guest } from "./middleware/auth";

schemaComposer.Query.addFields({
	userByTelegramId: UserTC.getResolver("byTelegramId"),
});

schemaComposer.Mutation.addFields({
	signIn: UserTC.getResolver("signIn", [guest]),
});

const schema = schemaComposer.buildSchema();

export default schema;
