import { InscricaoEstadual } from "./Acre";

describe("InscricaoEstadual.Acre", () => {
	describe("isValid method", () => {
		describe("should return true for valid unmasked values", () => {
			const validUnmaskedValues = [
				"0195472653884",
				"0158208588874",
				"0115106634652",
				"0192151210169",
				"0144990825750",
			];

			validUnmaskedValues.forEach((value) => {
				it(`should return true for valid unmasked value ${value}`, () => {
					expect(InscricaoEstadual.Acre.isValid(value)).toBe(true);
				});
			});
		});

		test("should return true for valid masked values", () => {
			const validMaskedValues = [
				"01.983.707/714-24",
				"01.321.402/282-11",
				"01.851.334/006-09",
				"01.486.107/317-78",
				"01.635.683/738-25",
			];

			validMaskedValues.forEach((value) => {
				expect(InscricaoEstadual.Acre.isValid(value)).toBe(true);
			});
		});

		test("should return false if the value is empty, null or undefined", () => {
			const invalidValues = ["", null, undefined];
			invalidValues.forEach((value) => {
				expect(InscricaoEstadual.Acre.isValid(value)).toBe(false);
			});
		});

		test("should return false if ie length is not 13", () => {
			const invalidValues = ["01.983.707/714-2", "01.321.402/282-111"];
			invalidValues.forEach((value) => {
				expect(InscricaoEstadual.Acre.isValid(value)).toBe(false);
			});
		});

		test("should return false if ie doesn't start with 01", () => {
			const invalidValues = ["02.983.707/714-24", "03.321.402/282-11"];
			invalidValues.forEach((value) => {
				expect(InscricaoEstadual.Acre.isValid(value)).toBe(false);
			});
		});

		test("should return false if ie doesn't have valid verifier digits", () => {
			const invalidValues = ["01.983.707/714-25", "01.321.402/282-12"];
			invalidValues.forEach((value) => {
				expect(InscricaoEstadual.Acre.isValid(value)).toBe(false);
			});
		});
	});

	describe("generate method", () => {
		test("should generate a valid unmasked value", () => {
			const generatedValue = InscricaoEstadual.Acre.generate();
			expect(InscricaoEstadual.Acre.isValid(generatedValue)).toBe(true);
		});

		test("should generate a valid masked value", () => {
			const generatedValue = InscricaoEstadual.Acre.generateMasked();
			expect(InscricaoEstadual.Acre.isValid(generatedValue)).toBe(true);
		});
	});

	describe("mask and unmask methods", () => {
		test("should correctly mask an unmasked value", () => {
			const unmaskedValue = "0195472653884";
			const maskedValue = "01.954.726/538-84";
			expect(InscricaoEstadual.Acre.mask(unmaskedValue)).toBe(maskedValue);
		});

		test("should correctly unmask a masked value", () => {
			const maskedValue = "01.954.726/538-84";
			const unmaskedValue = "0195472653884";
			expect(InscricaoEstadual.Acre.unmask(maskedValue)).toBe(unmaskedValue);
		});
	});
});
