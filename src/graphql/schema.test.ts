import schema from "./schema";

describe("graphql/schema", () => {
	it("returns correct GraphQL schema object", () => {
		expect(schema).toBeTruthy();
	});
});
