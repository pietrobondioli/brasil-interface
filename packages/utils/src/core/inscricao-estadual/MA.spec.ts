import { InscricaoEstadual } from "./MA";

const VALID_IES = ["121622630", "120340038", "120000385"];

const VALID_MASKED_IES = ["12162263-0", "12034003-8", "12000038-5"];

describe("InscricaoEstadual.MA", () => {
	describe("isValid", () => {
		VALID_IES.forEach((ie) => {
			it(`should validate ${ie} as true`, () => {
				expect(InscricaoEstadual.MA.isValid(ie)).toBe(true);
			});
		});

		VALID_MASKED_IES.forEach((ie) => {
			it(`should validate masked IE ${ie} as true`, () => {
				expect(InscricaoEstadual.MA.isValid(ie)).toBe(true);
			});
		});

		const invalidIEs = ["123111789", "555555555"];
		invalidIEs.forEach((ie) => {
			it(`should validate ${ie} as false`, () => {
				expect(InscricaoEstadual.MA.isValid(ie)).toBe(false);
			});
		});
	});

	describe("mask and unmask", () => {
		it("should correctly mask an unmasked IE", () => {
			expect(InscricaoEstadual.MA.mask("121622630")).toBe("12162263-0");
		});

		it("should correctly unmask a masked IE", () => {
			expect(InscricaoEstadual.MA.unmask("12162263-0")).toBe("121622630");
		});
	});

	describe("generate", () => {
		it("should generate a valid IE", () => {
			const generated = InscricaoEstadual.MA.generate();
			expect(InscricaoEstadual.MA.isValid(generated)).toBe(true);
		});
	});

	describe("generateMasked", () => {
		it("should generate a valid masked IE", () => {
			const generated = InscricaoEstadual.MA.generateMasked();
			expect(InscricaoEstadual.MA.isValid(generated)).toBe(true);
		});
	});
});
