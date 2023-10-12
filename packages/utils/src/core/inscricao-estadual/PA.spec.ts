import { PA } from "./PA";

const VALID_IES = ["154877905", "155908235", "151130710", "151040591"];

const VALID_MASKED_IES = [
	"15-487790-5",
	"15-590823-5",
	"15-113071-0",
	"15-104059-1",
];

describe("PA", () => {
	describe("isValid", () => {
		VALID_IES.forEach((ie) => {
			it(`should validate ${ie} as true`, () => {
				expect(PA.isValid(ie)).toBe(true);
			});
		});

		VALID_MASKED_IES.forEach((ie) => {
			it(`should validate masked IE ${ie} as true`, () => {
				expect(PA.isValid(ie)).toBe(true);
			});
		});

		const invalidIEs = ["123111789", "555555555"];
		invalidIEs.forEach((ie) => {
			it(`should validate ${ie} as false`, () => {
				expect(PA.isValid(ie)).toBe(false);
			});
		});
	});

	describe("mask and unmask", () => {
		it("should correctly mask an unmasked IE", () => {
			expect(PA.mask("154877905")).toBe("15-487790-5");
		});

		it("should correctly unmask a masked IE", () => {
			expect(PA.unmask("15-487790-5")).toBe("154877905");
		});
	});

	describe("generate", () => {
		it("should generate a valid IE", () => {
			const generated = PA.generate();
			expect(PA.isValid(generated)).toBe(true);
		});
	});

	describe("generateMasked", () => {
		it("should generate a valid masked IE", () => {
			const generated = PA.generateMasked();
			expect(PA.isValid(generated)).toBe(true);
		});
	});
});
