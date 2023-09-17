import { InscricaoEstadual } from "./RioGrandeDoSul";

const VALID_IES = ["6181184450", "8542498958", "2908180647", "7015322855"];

const VALID_MASKED_IES = [
	"618/1184450",
	"854/2498958",
	"290/8180647",
	"701/5322855",
];

describe("InscricaoEstadual.RioGrandeDoSul", () => {
	describe("isValid", () => {
		VALID_IES.forEach((ie) => {
			it(`should validate ${ie} as true`, () => {
				expect(InscricaoEstadual.RioGrandeDoSul.isValid(ie)).toBe(true);
			});
		});

		VALID_MASKED_IES.forEach((ie) => {
			it(`should validate masked IE ${ie} as true`, () => {
				expect(InscricaoEstadual.RioGrandeDoSul.isValid(ie)).toBe(true);
			});
		});

		const invalidIEs = ["123111789", "555555555"];
		invalidIEs.forEach((ie) => {
			it(`should validate ${ie} as false`, () => {
				expect(InscricaoEstadual.RioGrandeDoSul.isValid(ie)).toBe(false);
			});
		});
	});

	describe("mask and unmask", () => {
		it("should correctly mask an unmasked IE", () => {
			expect(InscricaoEstadual.RioGrandeDoSul.mask("7015322855")).toBe(
				"701/5322855"
			);
		});

		it("should correctly unmask a masked IE", () => {
			expect(InscricaoEstadual.RioGrandeDoSul.unmask("701/5322855")).toBe(
				"7015322855"
			);
		});
	});

	describe("generate", () => {
		it("should generate a valid IE", () => {
			const generated = InscricaoEstadual.RioGrandeDoSul.generate();
			expect(InscricaoEstadual.RioGrandeDoSul.isValid(generated)).toBe(true);
		});
	});

	describe("generateMasked", () => {
		it("should generate a valid masked IE", () => {
			const generated = InscricaoEstadual.RioGrandeDoSul.generateMasked();
			expect(InscricaoEstadual.RioGrandeDoSul.isValid(generated)).toBe(true);
		});
	});
});
