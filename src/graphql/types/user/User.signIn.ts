import { ResolverDefinition } from "graphql-compose";
import { sign } from "jsonwebtoken";
import { sha256, hmac } from "hash.js";

import config from "src/config";
import User, { UserProps } from "src/mongoose/schema/User";

interface SingInArgs {
	id: string;
	first_name: string;
	last_name: string;
	auth_date: string;
	hash: string;
}

const signInResolver: ResolverDefinition<unknown, unknown, SingInArgs> = {
	name: "signIn",
	type: "String!",
	args: {
		id: "String!",
		first_name: "String!",
		last_name: "String!",
		auth_date: "String!",
		hash: "String!",
	},
	resolve: async ({ args }) => {
		if (!checkTelegramLoginHash(args)) {
			return Promise.reject(new Error("Invalid Telegram credentials"));
		}

		const { id, first_name, last_name, auth_date } = args;

		try {
			let user = await User.getByTelegramId(Number(id));

			const userUpdate: Partial<UserProps> = {
				telegramId: Number(id),
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

			return Promise.resolve(accessToken);
		} catch (error) {
			return Promise.reject(error);
		}
	},
};

export function checkTelegramLoginHash(signInArgs: SingInArgs): boolean {
	const { hash, ...checkData } = signInArgs;

	const checkString = Object.entries(checkData)
		.map((kv: string[]) => `${kv[0]}=${kv[1]}`)
		.sort()
		.join("\n");

	const secretKey = sha256().update(config.auth.telegramBotToken).digest();

	const checkHash = hmac((sha256 as unknown) as BlockHash<unknown>, secretKey)
		.update(checkString)
		.digest("hex");

	return checkHash === hash;
}

export default signInResolver;
