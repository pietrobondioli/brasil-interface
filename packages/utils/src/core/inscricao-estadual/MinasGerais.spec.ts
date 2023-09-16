import { InscricaoEstadual } from "./MinasGerais";

const VALID_IES = ["0623079040081", "8495466958477", "6891075173832"];

const VALID_MASKED_IES = [
	"062.307.904/0081",
	"849.546.695/8477",
	"689.107.517/3832",
];

describe("InscricaoEstadual.MinasGerais", () => {
	describe("isValid", () => {
		VALID_IES.forEach((ie) => {
			it(`should validate ${ie} as true`, () => {
				expect(InscricaoEstadual.MinasGerais.isValid(ie)).toBe(true);
			});
		});

		VALID_MASKED_IES.forEach((ie) => {
			it(`should validate masked IE ${ie} as true`, () => {
				expect(InscricaoEstadual.MinasGerais.isValid(ie)).toBe(true);
			});
		});

		const invalidIEs = ["123111789", "555555555"];
		invalidIEs.forEach((ie) => {
			it(`should validate ${ie} as false`, () => {
				expect(InscricaoEstadual.MinasGerais.isValid(ie)).toBe(false);
			});
		});
	});

	describe("mask and unmask", () => {
		it("should correctly mask an unmasked IE", () => {
			expect(InscricaoEstadual.MinasGerais.mask("0623079040081")).toBe(
				"062.307.904/0081"
			);
		});

		it("should correctly unmask a masked IE", () => {
			expect(InscricaoEstadual.MinasGerais.unmask("062.307.904/0081")).toBe(
				"0623079040081"
			);
		});
	});

	describe("generate", () => {
		it("should generate a valid IE", () => {
			const generated = InscricaoEstadual.MinasGerais.generate();
			expect(InscricaoEstadual.MinasGerais.isValid(generated)).toBe(true);
		});
	});

	describe("generateMasked", () => {
		it("should generate a valid masked IE", () => {
			const generated = InscricaoEstadual.MinasGerais.generateMasked();
			expect(InscricaoEstadual.MinasGerais.isValid(generated)).toBe(true);
		});
	});
});
