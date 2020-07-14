import { composeWithMongoose } from "graphql-compose-mongoose";

import User from "src/mongoose/schema/User";
import signInResolver from "./User.signIn";
import byTelegramId from "./User.byTelegramId";

const UserTC = composeWithMongoose(User);
UserTC.addResolver(signInResolver);
UserTC.addResolver(byTelegramId);

export default UserTC;
