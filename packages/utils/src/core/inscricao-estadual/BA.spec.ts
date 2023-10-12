import { BA } from "./BA";

const VALID_MASKED_IES = ["612345-57", "123456-63", "1000003-06", "6000003-11"];

const VALID_IES = ["61234557", "12345663", "100000306", "600000311"];

const INVALID_IES = ["123111789", "555555555"];

describe("BA", () => {
	describe("isValid", () => {
		describe("should validate valid IEs", () => {
			VALID_IES.forEach((ie) => {
				it(`should validate ${ie} as true`, () => {
					expect(BA.isValid(ie)).toBe(true);
				});
			});
		});

		describe("should validate valid masked IEs", () => {
			VALID_MASKED_IES.forEach((ie) => {
				it(`should validate masked IE ${ie} as true`, () => {
					expect(BA.isValid(ie)).toBe(true);
				});
			});
		});

		describe("should validate invalid IEs", () => {
			INVALID_IES.forEach((ie) => {
				it(`should validate ${ie} as false`, () => {
					expect(BA.isValid(ie)).toBe(false);
				});
			});
		});
	});

	describe("mask and unmask", () => {
		it("should correctly mask an unmasked IE", () => {
			expect(BA.mask("993025718")).toBe("9930257-18");
		});

		it("should correctly unmask a masked IE", () => {
			expect(BA.unmask("9930257-18")).toBe("993025718");
		});
	});

	describe("generate", () => {
		it("should generate a valid IE", () => {
			const generated = BA.generate();
			expect(BA.isValid(generated)).toBe(true);
		});
	});

	describe("generateMasked", () => {
		it("should generate a valid masked IE", () => {
			const generated = BA.generateMasked();
			expect(BA.isValid(generated)).toBe(true);
		});
	});
});
