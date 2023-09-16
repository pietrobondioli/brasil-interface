import { InscricaoEstadual } from "./Bahia";

const VALID_MASKED_IES = ["612345-57", "123456-63", "1000003-06", "6000003-11"];

const VALID_IES = ["61234557", "12345663", "100000306", "600000311"];

const INVALID_IES = ["123111789", "555555555"];

describe("InscricaoEstadual.Bahia", () => {
	describe("isValid", () => {
		describe("should validate valid IEs", () => {
			VALID_IES.forEach((ie) => {
				it(`should validate ${ie} as true`, () => {
					expect(InscricaoEstadual.Bahia.isValid(ie)).toBe(true);
				});
			});
		});

		describe("should validate valid masked IEs", () => {
			VALID_MASKED_IES.forEach((ie) => {
				it(`should validate masked IE ${ie} as true`, () => {
					expect(InscricaoEstadual.Bahia.isValid(ie)).toBe(true);
				});
			});
		});

		describe("should validate invalid IEs", () => {
			INVALID_IES.forEach((ie) => {
				it(`should validate ${ie} as false`, () => {
					expect(InscricaoEstadual.Bahia.isValid(ie)).toBe(false);
				});
			});
		});
	});

	describe("mask and unmask", () => {
		it("should correctly mask an unmasked IE", () => {
			expect(InscricaoEstadual.Bahia.mask("993025718")).toBe("9930257-18");
		});

		it("should correctly unmask a masked IE", () => {
			expect(InscricaoEstadual.Bahia.unmask("9930257-18")).toBe("993025718");
		});
	});

	describe("generate", () => {
		it("should generate a valid IE", () => {
			const generated = InscricaoEstadual.Bahia.generate();
			expect(InscricaoEstadual.Bahia.isValid(generated)).toBe(true);
		});
	});

	describe("generateMasked", () => {
		it("should generate a valid masked IE", () => {
			const generated = InscricaoEstadual.Bahia.generateMasked();
			expect(InscricaoEstadual.Bahia.isValid(generated)).toBe(true);
		});
	});
});
