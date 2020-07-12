import { composeWithMongoose } from "graphql-compose-mongoose";

import User from "src/mongoose/schema/User";
import signInResolver from "./User.signIn";
import byTelegramId from "./User.byTelegramId";

const userType = composeWithMongoose(User);
userType.addResolver(signInResolver);
userType.addResolver(byTelegramId);

export default userType;
