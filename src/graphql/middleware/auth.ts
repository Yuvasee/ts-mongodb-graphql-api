import { ResolverMiddleware } from "graphql-compose";
import { AuthContext } from "src/middleware/graphql";

export const guest: ResolverMiddleware<unknown, AuthContext> = async (resolve, source, args, context, info) => {
	const { user } = context;

	if (user) {
		return Promise.reject(new Error("User is already authorized."));
	}

	return resolve(source, args, context, info) as unknown;
};

export const authorized: ResolverMiddleware<unknown, AuthContext> = async (resolve, source, args, context, info) => {
	const { user } = context;

	if (!user) {
		return Promise.reject(new Error("User is not authorized."));
	}

	return resolve(source, args, context, info) as unknown;
};
