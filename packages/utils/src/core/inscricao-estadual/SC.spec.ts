import { SC } from "./SC";

const VALID_IES = ["081210825", "448668386", "086236067", "695449338"];

const VALID_MASKED_IES = [
	"081.210.825",
	"448.668.386",
	"086.236.067",
	"695.449.338",
];

describe("SC", () => {
	describe("isValid", () => {
		VALID_IES.forEach((ie) => {
			it(`should validate ${ie} as true`, () => {
				expect(SC.isValid(ie)).toBe(true);
			});
		});

		VALID_MASKED_IES.forEach((ie) => {
			it(`should validate masked IE ${ie} as true`, () => {
				expect(SC.isValid(ie)).toBe(true);
			});
		});

		const invalidIEs = ["123111789", "555555555"];
		invalidIEs.forEach((ie) => {
			it(`should validate ${ie} as false`, () => {
				expect(SC.isValid(ie)).toBe(false);
			});
		});
	});

	describe("mask and unmask", () => {
		it("should correctly mask an unmasked IE", () => {
			expect(SC.mask("081210825")).toBe("081.210.825");
		});

		it("should correctly unmask a masked IE", () => {
			expect(SC.unmask("081.210.825")).toBe("081210825");
		});
	});

	describe("generate", () => {
		it("should generate a valid IE", () => {
			const generated = SC.generate();
			expect(SC.isValid(generated)).toBe(true);
		});
	});

	describe("generateMasked", () => {
		it("should generate a valid masked IE", () => {
			const generated = SC.generateMasked();
			expect(SC.isValid(generated)).toBe(true);
		});
	});
});
