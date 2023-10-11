import { InscricaoEstadual } from "./SP";

const VALID_IES = [
	"447746234481",
	"003331940010",
	"303648495572",
	"815818456667",
	"P011004243002",
];

const VALID_MASKED_IES = [
	"447.746.234.481",
	"003.331.940.010",
	"303.648.495.572",
	"815.818.456.667",
	"P-01100424.3/002",
];

describe("InscricaoEstadual.SP", () => {
	describe("isValid", () => {
		VALID_IES.forEach((ie) => {
			it(`should validate ${ie} as true`, () => {
				expect(InscricaoEstadual.SP.isValid(ie)).toBe(true);
			});
		});

		VALID_MASKED_IES.forEach((ie) => {
			it(`should validate masked IE ${ie} as true`, () => {
				expect(InscricaoEstadual.SP.isValid(ie)).toBe(true);
			});
		});

		const invalidIEs = ["123111789", "555555555"];
		invalidIEs.forEach((ie) => {
			it(`should validate ${ie} as false`, () => {
				expect(InscricaoEstadual.SP.isValid(ie)).toBe(false);
			});
		});
	});

	describe("mask and unmask", () => {
		it("should correctly mask an unmasked IE", () => {
			expect(InscricaoEstadual.SP.mask("447746234481")).toBe("447.746.234.481");
		});

		it("should correctly unmask a masked IE", () => {
			expect(InscricaoEstadual.SP.unmask("447.746.234.481")).toBe(
				"447746234481"
			);
		});
	});

	describe("generate", () => {
		it("should generate a valid IE", () => {
			const generated = InscricaoEstadual.SP.generate();
			expect(InscricaoEstadual.SP.isValid(generated)).toBe(true);
		});
	});

	describe("generateMasked", () => {
		it("should generate a valid masked IE", () => {
			const generated = InscricaoEstadual.SP.generateMasked();
			expect(InscricaoEstadual.SP.isValid(generated)).toBe(true);
		});
	});
});
