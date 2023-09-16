import { InscricaoEstadual } from "./Amazonas";

const VALID_IES = ["438873483", "621453862", "143431560", "562608877"];

const VALID_MASKED_IES = [
	"43.887.348-3",
	"62.145.386-2",
	"14.343.156-0",
	"56.260.887-7",
];

describe("InscricaoEstadual.Amazonas", () => {
	describe("isValid", () => {
		VALID_IES.forEach((ie) => {
			it(`should validate ${ie} as true`, () => {
				expect(InscricaoEstadual.Amazonas.isValid(ie)).toBe(true);
			});
		});

		VALID_MASKED_IES.forEach((ie) => {
			it(`should validate masked IE ${ie} as true`, () => {
				expect(InscricaoEstadual.Amazonas.isValid(ie)).toBe(true);
			});
		});

		const invalidIEs = ["123111789", "555555555"];
		invalidIEs.forEach((ie) => {
			it(`should validate ${ie} as false`, () => {
				expect(InscricaoEstadual.Amazonas.isValid(ie)).toBe(false);
			});
		});
	});

	describe("mask and unmask", () => {
		it("should correctly mask an unmasked IE", () => {
			expect(InscricaoEstadual.Amazonas.mask("476178410")).toBe("47617841-0");
		});

		it("should correctly unmask a masked IE", () => {
			expect(InscricaoEstadual.Amazonas.unmask("47617841-0")).toBe("476178410");
		});
	});

	describe("generate", () => {
		it("should generate a valid IE", () => {
			const generated = InscricaoEstadual.Amazonas.generate();
			expect(InscricaoEstadual.Amazonas.isValid(generated)).toBe(true);
		});
	});

	describe("generateMasked", () => {
		it("should generate a valid masked IE", () => {
			const generated = InscricaoEstadual.Amazonas.generateMasked();
			expect(InscricaoEstadual.Amazonas.isValid(generated)).toBe(true);
		});
	});
});
