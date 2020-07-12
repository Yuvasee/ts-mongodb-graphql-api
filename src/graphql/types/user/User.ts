import { composeWithMongoose } from "graphql-compose-mongoose";

import User from "../../../mongoose/schema/User";
import signInResolver from "./User.signIn";

const userType = composeWithMongoose(User);
userType.addResolver(signInResolver);

export default userType;
