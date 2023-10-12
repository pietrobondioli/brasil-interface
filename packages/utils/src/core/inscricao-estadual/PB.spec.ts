import { PB } from "./PB";

const VALID_IES = ["066632285", "362136610", "616069022", "334005272"];

const VALID_MASKED_IES = [
	"06663228-5",
	"36213661-0",
	"61606902-2",
	"33400527-2",
];

describe("PB", () => {
	describe("isValid", () => {
		VALID_IES.forEach((ie) => {
			it(`should validate ${ie} as true`, () => {
				expect(PB.isValid(ie)).toBe(true);
			});
		});

		VALID_MASKED_IES.forEach((ie) => {
			it(`should validate masked IE ${ie} as true`, () => {
				expect(PB.isValid(ie)).toBe(true);
			});
		});

		const invalidIEs = ["123111789", "555555555"];
		invalidIEs.forEach((ie) => {
			it(`should validate ${ie} as false`, () => {
				expect(PB.isValid(ie)).toBe(false);
			});
		});
	});

	describe("mask and unmask", () => {
		it("should correctly mask an unmasked IE", () => {
			expect(PB.mask("066632285")).toBe("06663228-5");
		});

		it("should correctly unmask a masked IE", () => {
			expect(PB.unmask("06663228-5")).toBe("066632285");
		});
	});

	describe("generate", () => {
		it("should generate a valid IE", () => {
			const generated = PB.generate();
			expect(PB.isValid(generated)).toBe(true);
		});
	});

	describe("generateMasked", () => {
		it("should generate a valid masked IE", () => {
			const generated = PB.generateMasked();
			expect(PB.isValid(generated)).toBe(true);
		});
	});
});
