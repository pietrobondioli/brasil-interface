import { InscricaoEstadual } from "./DF";

const VALID_IES = ["0730000100109", "0771328900102"];

const VALID_MASKED_IES = ["07300001001-09", "07713289001-02"];

describe("InscricaoEstadual.DF", () => {
	describe("isValid", () => {
		VALID_IES.forEach((ie) => {
			it(`should validate ${ie} as true`, () => {
				expect(InscricaoEstadual.DF.isValid(ie)).toBe(true);
			});
		});

		VALID_MASKED_IES.forEach((ie) => {
			it(`should validate masked IE ${ie} as true`, () => {
				expect(InscricaoEstadual.DF.isValid(ie)).toBe(true);
			});
		});

		const invalidIEs = ["123111789", "555555555"];
		invalidIEs.forEach((ie) => {
			it(`should validate ${ie} as false`, () => {
				expect(InscricaoEstadual.DF.isValid(ie)).toBe(false);
			});
		});
	});

	describe("mask and unmask", () => {
		it("should correctly mask an unmasked IE", () => {
			expect(InscricaoEstadual.DF.mask("0798568100153")).toBe("07985681001-53");
		});

		it("should correctly unmask a masked IE", () => {
			expect(InscricaoEstadual.DF.unmask("07985681001-53")).toBe(
				"0798568100153"
			);
		});
	});

	describe("generate", () => {
		it("should generate a valid IE", () => {
			const generated = InscricaoEstadual.DF.generate();
			expect(InscricaoEstadual.DF.isValid(generated)).toBe(true);
		});
	});

	describe("generateMasked", () => {
		it("should generate a valid masked IE", () => {
			const generated = InscricaoEstadual.DF.generateMasked();
			expect(InscricaoEstadual.DF.isValid(generated)).toBe(true);
		});
	});
});
