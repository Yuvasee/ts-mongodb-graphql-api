import { createSchema, ExtractDoc, ExtractProps, Type, typedModel } from "ts-mongoose";

const userSchema = createSchema({
	telegramId: Type.number({
		required: true,
		unique: true,
	}),
	firstName: Type.string(),
	lastName: Type.string(),
	lastAuthDate: Type.date({
		default: new Date(),
	}),
});

const User = typedModel("User", userSchema, undefined, undefined, {
	getByTelegramId,
});

function getByTelegramId(this: typeof User, telegramId: number) {
	return this.findOne({ telegramId });
}

export default User;
export type UserDoc = ExtractDoc<typeof userSchema>;
export type UserProps = ExtractProps<typeof userSchema>;
