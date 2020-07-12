import { ResolverDefinition } from "graphql-compose";
import { sign } from "jsonwebtoken";

import config from "src/config";
import User, { UserProps } from "src/mongoose/schema/User";

interface SingInArgs {
	id: number;
	firstName: string;
	lastName: string;
	authDate: number;
	hash: string;
}

const signInResolver: ResolverDefinition<unknown, unknown, SingInArgs> = {
	name: "signIn",
	type: "String!",
	resolve: async ({ args: { id, firstName, lastName, authDate } }) => {
		try {
			let user = await User.getByTelegramId(id);

			const userUpdate: Partial<UserProps> = {
				telegramId: id,
				firstName,
				lastName,
				lastAuthDate: new Date(authDate * 1000),
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

			return { accessToken };
		} catch (error) {
			return Promise.reject(error);
		}
	},
};

export default signInResolver;
