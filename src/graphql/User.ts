import { ResolverDefinition } from "graphql-compose";
import { composeWithMongoose } from "graphql-compose-mongoose";

import User from "../mongoose/schema/User";

const UserTC = composeWithMongoose(User);

const user: ResolverDefinition<any, any> = {
	name: "user",
	type: "User!",
	resolve: ({ context: { user } }) => user as string | Record<string, unknown>,
};

UserTC.addResolver(user);

export default UserTC;
