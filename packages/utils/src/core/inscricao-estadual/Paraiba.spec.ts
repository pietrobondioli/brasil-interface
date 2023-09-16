import { InscricaoEstadual } from "./Paraiba";

const VALID_IES = ["066632285", "362136610", "616069022", "334005272"];

const VALID_MASKED_IES = [
	"06663228-5",
	"36213661-0",
	"61606902-2",
	"33400527-2",
];

describe("InscricaoEstadual.Paraiba", () => {
	describe("isValid", () => {
		VALID_IES.forEach((ie) => {
			it(`should validate ${ie} as true`, () => {
				expect(InscricaoEstadual.Paraiba.isValid(ie)).toBe(true);
			});
		});

		VALID_MASKED_IES.forEach((ie) => {
			it(`should validate masked IE ${ie} as true`, () => {
				expect(InscricaoEstadual.Paraiba.isValid(ie)).toBe(true);
			});
		});

		const invalidIEs = ["123111789", "555555555"];
		invalidIEs.forEach((ie) => {
			it(`should validate ${ie} as false`, () => {
				expect(InscricaoEstadual.Paraiba.isValid(ie)).toBe(false);
			});
		});
	});

	describe("mask and unmask", () => {
		it("should correctly mask an unmasked IE", () => {
			expect(InscricaoEstadual.Paraiba.mask("066632285")).toBe("06663228-5");
		});

		it("should correctly unmask a masked IE", () => {
			expect(InscricaoEstadual.Paraiba.unmask("06663228-5")).toBe("066632285");
		});
	});

	describe("generate", () => {
		it("should generate a valid IE", () => {
			const generated = InscricaoEstadual.Paraiba.generate();
			expect(InscricaoEstadual.Paraiba.isValid(generated)).toBe(true);
		});
	});

	describe("generateMasked", () => {
		it("should generate a valid masked IE", () => {
			const generated = InscricaoEstadual.Paraiba.generateMasked();
			expect(InscricaoEstadual.Paraiba.isValid(generated)).toBe(true);
		});
	});
});
