import { InscricaoEstadual } from "./MT";

const VALID_IES = ["00130000019", "00403752590", "85988420847"];

const VALID_MASKED_IES = ["0013000001-9", "0040375259-0", "8598842084-7"];

describe("InscricaoEstadual.MT", () => {
	describe("isValid", () => {
		VALID_IES.forEach((ie) => {
			it(`should validate ${ie} as true`, () => {
				expect(InscricaoEstadual.MT.isValid(ie)).toBe(true);
			});
		});

		VALID_MASKED_IES.forEach((ie) => {
			it(`should validate masked IE ${ie} as true`, () => {
				expect(InscricaoEstadual.MT.isValid(ie)).toBe(true);
			});
		});

		const invalidIEs = ["123111789", "555555555"];
		invalidIEs.forEach((ie) => {
			it(`should validate ${ie} as false`, () => {
				expect(InscricaoEstadual.MT.isValid(ie)).toBe(false);
			});
		});
	});

	describe("mask and unmask", () => {
		it("should correctly mask an unmasked IE", () => {
			expect(InscricaoEstadual.MT.mask("00130000019")).toBe("0013000001-9");
		});

		it("should correctly unmask a masked IE", () => {
			expect(InscricaoEstadual.MT.unmask("0013000001-9")).toBe("00130000019");
		});
	});

	describe("generate", () => {
		it("should generate a valid IE", () => {
			const generated = InscricaoEstadual.MT.generate();
			expect(InscricaoEstadual.MT.isValid(generated)).toBe(true);
		});
	});

	describe("generateMasked", () => {
		it("should generate a valid masked IE", () => {
			const generated = InscricaoEstadual.MT.generateMasked();
			expect(InscricaoEstadual.MT.isValid(generated)).toBe(true);
		});
	});
});
