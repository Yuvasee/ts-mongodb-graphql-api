import { ResolverDefinition } from "graphql-compose";
import User, { UserProps } from "src/mongoose/schema/User";

const byTelegramId: ResolverDefinition<unknown, unknown, { telegramId: number }> = {
	name: "byTelegramId",
	type: "User!",
	resolve: async ({ args: { telegramId } }) => {
		try {
			const user = await User.getByTelegramId(telegramId);

			if (!user) {
				return Promise.reject("No user found");
			}

			return user.toObject() as UserProps;
		} catch (error) {
			return Promise.reject(error);
		}
	},
};

export default byTelegramId;
