import { schemaComposer } from "graphql-compose";
import { composeWithMongoose } from "graphql-compose-mongoose";
import User from "../mongoose/schema/User";

const UserTC = composeWithMongoose(User);
