import { InscricaoEstadual } from "./Maranhao";

const VALID_IES = ["121622630", "120340038", "120000385"];

const VALID_MASKED_IES = ["12162263-0", "12034003-8", "12000038-5"];

describe("InscricaoEstadual.Maranhao", () => {
	describe("isValid", () => {
		VALID_IES.forEach((ie) => {
			it(`should validate ${ie} as true`, () => {
				expect(InscricaoEstadual.Maranhao.isValid(ie)).toBe(true);
			});
		});

		VALID_MASKED_IES.forEach((ie) => {
			it(`should validate masked IE ${ie} as true`, () => {
				expect(InscricaoEstadual.Maranhao.isValid(ie)).toBe(true);
			});
		});

		const invalidIEs = ["123111789", "555555555"];
		invalidIEs.forEach((ie) => {
			it(`should validate ${ie} as false`, () => {
				expect(InscricaoEstadual.Maranhao.isValid(ie)).toBe(false);
			});
		});
	});

	describe("mask and unmask", () => {
		it("should correctly mask an unmasked IE", () => {
			expect(InscricaoEstadual.Maranhao.mask("121622630")).toBe("12162263-0");
		});

		it("should correctly unmask a masked IE", () => {
			expect(InscricaoEstadual.Maranhao.unmask("12162263-0")).toBe("121622630");
		});
	});

	describe("generate", () => {
		it("should generate a valid IE", () => {
			const generated = InscricaoEstadual.Maranhao.generate();
			expect(InscricaoEstadual.Maranhao.isValid(generated)).toBe(true);
		});
	});

	describe("generateMasked", () => {
		it("should generate a valid masked IE", () => {
			const generated = InscricaoEstadual.Maranhao.generateMasked();
			expect(InscricaoEstadual.Maranhao.isValid(generated)).toBe(true);
		});
	});
});
