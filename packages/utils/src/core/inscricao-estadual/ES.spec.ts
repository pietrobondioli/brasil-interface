import { InscricaoEstadual } from "./ES";

const VALID_IES = ["301188327", "294353313", "300597312"];

const VALID_MASKED_IES = ["30118832-7", "29435331-3", "30059731-2"];

describe("InscricaoEstadual.ES", () => {
	describe("isValid", () => {
		VALID_IES.forEach((ie) => {
			it(`should validate ${ie} as true`, () => {
				expect(InscricaoEstadual.ES.isValid(ie)).toBe(true);
			});
		});

		VALID_MASKED_IES.forEach((ie) => {
			it(`should validate masked IE ${ie} as true`, () => {
				expect(InscricaoEstadual.ES.isValid(ie)).toBe(true);
			});
		});

		const invalidIEs = ["123111789", "555555555"];
		invalidIEs.forEach((ie) => {
			it(`should validate ${ie} as false`, () => {
				expect(InscricaoEstadual.ES.isValid(ie)).toBe(false);
			});
		});
	});

	describe("mask and unmask", () => {
		it("should correctly mask an unmasked IE", () => {
			expect(InscricaoEstadual.ES.mask("301188327")).toBe("30118832-7");
		});

		it("should correctly unmask a masked IE", () => {
			expect(InscricaoEstadual.ES.unmask("30118832-7")).toBe("301188327");
		});
	});

	describe("generate", () => {
		it("should generate a valid IE", () => {
			const generated = InscricaoEstadual.ES.generate();
			expect(InscricaoEstadual.ES.isValid(generated)).toBe(true);
		});
	});

	describe("generateMasked", () => {
		it("should generate a valid masked IE", () => {
			const generated = InscricaoEstadual.ES.generateMasked();
			expect(InscricaoEstadual.ES.isValid(generated)).toBe(true);
		});
	});
});
