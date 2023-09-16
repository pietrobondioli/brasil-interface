import { InscricaoEstadual } from "./Parana";

const VALID_IES = ["2923358300", "3528840069", "5358147161", "6792311707"];

const VALID_MASKED_IES = [
	"292.33583-00",
	"352.88400-69",
	"535.81471-61",
	"679.23117-07",
];

describe("InscricaoEstadual.Parana", () => {
	describe("isValid", () => {
		describe("should validate unmasked IEs", () => {
			VALID_IES.forEach((ie) => {
				it(`should validate ${ie} as true`, () => {
					expect(InscricaoEstadual.Parana.isValid(ie)).toBe(true);
				});
			});
		});

		describe("should validate masked IEs", () => {
			VALID_MASKED_IES.forEach((ie) => {
				it(`should validate masked IE ${ie} as true`, () => {
					expect(InscricaoEstadual.Parana.isValid(ie)).toBe(true);
				});
			});
		});

		const invalidIEs = ["123111789", "555555555"];
		invalidIEs.forEach((ie) => {
			it(`should validate ${ie} as false`, () => {
				expect(InscricaoEstadual.Parana.isValid(ie)).toBe(false);
			});
		});
	});

	describe("mask and unmask", () => {
		it("should correctly mask an unmasked IE", () => {
			expect(InscricaoEstadual.Parana.mask("2923358300")).toBe("292.33583-00");
		});

		it("should correctly unmask a masked IE", () => {
			expect(InscricaoEstadual.Parana.unmask("292.33583-00")).toBe(
				"2923358300"
			);
		});
	});

	describe("generate", () => {
		it("should generate a valid IE", () => {
			const generated = InscricaoEstadual.Parana.generate();
			expect(InscricaoEstadual.Parana.isValid(generated)).toBe(true);
		});
	});

	describe("generateMasked", () => {
		it("should generate a valid masked IE", () => {
			const generated = InscricaoEstadual.Parana.generateMasked();
			expect(InscricaoEstadual.Parana.isValid(generated)).toBe(true);
		});
	});
});
