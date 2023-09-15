import { Transform } from "./Transform";

describe("Transform class", () => {
	describe("applyMask method", () => {
		it("should correctly apply the provided mask using a regex pattern", () => {
			const value = "1234567890";
			const formatRegex = /^(\d{3})(\d{3})(\d{4})$/;
			const formatPattern = "($1) $2-$3";

			const result = Transform.applyMask(value, formatRegex, formatPattern);
			expect(result).toBe("(123) 456-7890");
		});
	});

	describe("clearString method", () => {
		it("should clear string based on provided regex pattern", () => {
			const value = "(123) 456-7890";
			const cutOffRegex = /\D/g; // Remove non-digit characters

			const result = Transform.clearString(value, cutOffRegex);
			expect(result).toBe("1234567890");
		});

		it("should return an empty string if provided value is null", () => {
			const value = null;
			const cutOffRegex = /\D/g;

			const result = Transform.clearString(value, cutOffRegex);
			expect(result).toBe("");
		});

		it("should return an empty string if provided value is undefined", () => {
			const value = undefined;
			const cutOffRegex = /\D/g;

			const result = Transform.clearString(value, cutOffRegex);
			expect(result).toBe("");
		});
	});
});
