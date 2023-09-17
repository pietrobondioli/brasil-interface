import { InscricaoEstadual } from "./Tocantins";

const VALID_IES = [
	"61037043744",
	"617043744",
	"04034753616",
	"044753616",
	"99031856058",
	"991856058",
];

const VALID_MASKED_IES = [
	"6103704374-4",
	"61704374-4",
	"0403475361-6",
	"04475361-6",
	"9903185605-8",
	"99185605-8",
];

describe("InscricaoEstadual.Tocantins", () => {
	describe("isValid", () => {
		VALID_IES.forEach((ie) => {
			it(`should validate ${ie} as true`, () => {
				expect(InscricaoEstadual.Tocantins.isValid(ie)).toBe(true);
			});
		});

		VALID_MASKED_IES.forEach((ie) => {
			it(`should validate masked IE ${ie} as true`, () => {
				expect(InscricaoEstadual.Tocantins.isValid(ie)).toBe(true);
			});
		});

		const invalidIEs = ["123111789", "555555555"];
		invalidIEs.forEach((ie) => {
			it(`should validate ${ie} as false`, () => {
				expect(InscricaoEstadual.Tocantins.isValid(ie)).toBe(false);
			});
		});
	});

	describe("mask and unmask", () => {
		it("should correctly mask an unmasked IE", () => {
			expect(InscricaoEstadual.Tocantins.mask("61037043744")).toBe(
				"6103704374-4"
			);
		});

		it("should correctly unmask a masked IE", () => {
			expect(InscricaoEstadual.Tocantins.unmask("6103704374-4")).toBe(
				"61037043744"
			);
		});
	});

	describe("generate", () => {
		it("should generate a valid IE", () => {
			const generated = InscricaoEstadual.Tocantins.generate();
			expect(InscricaoEstadual.Tocantins.isValid(generated)).toBe(true);
		});
	});

	describe("generateMasked", () => {
		it("should generate a valid masked IE", () => {
			const generated = InscricaoEstadual.Tocantins.generateMasked();
			expect(InscricaoEstadual.Tocantins.isValid(generated)).toBe(true);
		});
	});
});
