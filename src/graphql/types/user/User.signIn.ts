import { ResolverDefinition } from "graphql-compose";
import { sign } from "jsonwebtoken";

import config from "src/config";
import User, { UserProps } from "src/mongoose/schema/User";

interface SingInArgs {
	id: number;
	first_name: string;
	last_name: string;
	auth_date: string;
	hash: string;
}

const signInResolver: ResolverDefinition<unknown, unknown, SingInArgs> = {
	name: "signIn",
	type: "String!",
	args: {
		id: "Int!",
		first_name: "String!",
		last_name: "String!",
		auth_date: "String!",
		hash: "String!",
	},
	resolve: async ({ args }) => {
		const { id, first_name, last_name, auth_date, hash } = args;

		try {
			let user = await User.getByTelegramId(id);

			const userUpdate: Partial<UserProps> = {
				telegramId: id,
				firstName: first_name,
				lastName: last_name,
				lastAuthDate: new Date(Number(auth_date) * 1000),
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
