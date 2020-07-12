import { ResolverDefinition } from "graphql-compose";
import { sign } from "jsonwebtoken";

import config from "src/config";
import User, { UserProps } from "src/mongoose/schema/User";

interface SingInArgs {
	telegramId: number;
	firstName: string;
	lastName: string;
	authDate: string;
	hash: string;
}

const signInResolver: ResolverDefinition<unknown, unknown, SingInArgs> = {
	name: "signIn",
	type: "String!",
	args: {
		telegramId: "Int!",
		firstName: "String!",
		lastName: "String!",
		authDate: "String!",
		hash: "String!",
	},
	resolve: async ({ args: { telegramId, firstName, lastName, authDate } }) => {
		try {
			let user = await User.getByTelegramId(telegramId);

			const userUpdate: Partial<UserProps> = {
				telegramId,
				firstName,
				lastName,
				lastAuthDate: new Date(Number(authDate) * 1000),
			};

			if (!user) {
				user = await User.create(userUpdate);
			} else {
				await user.update(userUpdate);
			}
			await user.save();

			const accessToken = sign({ userId: user._id as string }, config.auth.jwtSecret, {
				expiresIn: config.auth.jwtExpiration,
			});

			return accessToken;
		} catch (error) {
			return Promise.reject(error);
		}
	},
};

export default signInResolver;
