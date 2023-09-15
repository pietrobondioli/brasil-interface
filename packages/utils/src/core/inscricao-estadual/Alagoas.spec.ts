import { InscricaoEstadual } from "./Alagoas";

describe("InscricaoEstadual.Alagoas class", () => {
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
				expect(InscricaoEstadual.Alagoas.isValid(number)).toBe(true);
			}
		});

		it("should return false for invalid Alagoas state registration numbers", () => {
			const invalidNumbers = ["111111111", "248440999", "248100000"];

			for (const number of invalidNumbers) {
				expect(InscricaoEstadual.Alagoas.isValid(number)).toBe(false);
			}
		});
	});

	describe("generate method", () => {
		it("should generate a valid Alagoas state registration number", () => {
			const generatedNumber = InscricaoEstadual.Alagoas.generate();

			expect(InscricaoEstadual.Alagoas.isValid(generatedNumber)).toBe(true);
		});
	});
});
