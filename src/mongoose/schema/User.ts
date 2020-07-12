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
	accessToken: Type.string(),
	tokenExpiredOn: Type.date(),
});

const userModel = typedModel("User", userSchema, undefined, undefined, {
	telegramIdExist: function (telegramId: number) {
		return this.findOne({ telegramId });
	},
});

export default userModel;
export type UserDoc = ExtractDoc<typeof userSchema>;
export type UserProps = ExtractProps<typeof userSchema>;
