import { InscricaoEstadual } from "./Amapa";

describe("InscricaoEstadual.Amapa", () => {
	describe("isValid", () => {
		const validIEs = ["036171000", "030040227", "031473989", "031597947"];
		validIEs.forEach((ie) => {
			it(`should validate ${ie} as true`, () => {
				expect(InscricaoEstadual.Amapa.isValid(ie)).toBe(true);
			});
		});

		const invalidIEs = ["123456789", "555555555"];
		invalidIEs.forEach((ie) => {
			it(`should validate ${ie} as false`, () => {
				expect(InscricaoEstadual.Amapa.isValid(ie)).toBe(false);
			});
		});
	});

	describe("mask", () => {
		it("should correctly mask an unmasked IE", () => {
			expect(InscricaoEstadual.Amapa.mask("476178410")).toBe("47.617.841-0");
		});
	});

	describe("clear", () => {
		it("should correctly clear a masked IE", () => {
			expect(InscricaoEstadual.Amapa.clear("35.399.910-5")).toBe("353999105");
		});
	});

	describe("generate", () => {
		it("should generate a valid IE", () => {
			const generated = InscricaoEstadual.Amapa.generate();
			expect(InscricaoEstadual.Amapa.isValid(generated)).toBe(true);
		});
	});

	describe("generateMasked", () => {
		it("should generate a valid masked IE", () => {
			const generated = InscricaoEstadual.Amapa.generateMasked();
			expect(InscricaoEstadual.Amapa.isValid(generated)).toBe(true);
		});
	});
});
