import { AL } from "./AL";

describe("AL class", () => {
	describe("isValid method", () => {
		it("should return true for valid Alagoas state registration numbers", () => {
			const validNumbers = [
				"248440950",
				"248100351",
				"248631535",
				"248452843",
				"248244086",
				"248561618",
			];

			for (const number of validNumbers) {
				expect(AL.isValid(number)).toBe(true);
			}
		});

		it("should return false for invalid Alagoas state registration numbers", () => {
			const invalidNumbers = ["111111111", "248440999", "248100000"];

			for (const number of invalidNumbers) {
				expect(AL.isValid(number)).toBe(false);
			}
		});
	});

	describe("generate method", () => {
		it("should generate a valid Alagoas state registration number", () => {
			const generatedNumber = AL.generate();

			expect(AL.isValid(generatedNumber)).toBe(true);
		});
	});
});
