import { createSchema, ExtractDoc, ExtractProps, Type, typedModel } from "ts-mongoose";

const userSchema = createSchema({
	telegramId: Type.number({
		required: true,
		unique: true,
	}),
	firstName: Type.string(),
	lastName: Type.string(),
	lastAuthDate: Type.date({
		default: new Date().getTime(),
	}),
});

export default typedModel("User", userSchema, undefined, undefined, {
	telegramIdExist: function (telegramId: number) {
		return this.findOne({ telegramId });
	},
});

export type UserDoc = ExtractDoc<typeof userSchema>;
export type UserProps = ExtractProps<typeof userSchema>;
