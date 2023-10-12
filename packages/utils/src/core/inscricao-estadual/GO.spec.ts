import { GO } from "./GO";

const VALID_IES = ["109876547", "157532658"];

const VALID_MASKED_IES = ["10.987.654-7", "15.753.265-8"];

describe("GO", () => {
	describe("isValid", () => {
		VALID_IES.forEach((ie) => {
			it(`should validate ${ie} as true`, () => {
				expect(GO.isValid(ie)).toBe(true);
			});
		});

		VALID_MASKED_IES.forEach((ie) => {
			it(`should validate masked IE ${ie} as true`, () => {
				expect(GO.isValid(ie)).toBe(true);
			});
		});

		const invalidIEs = ["123111789", "555555555"];
		invalidIEs.forEach((ie) => {
			it(`should validate ${ie} as false`, () => {
				expect(GO.isValid(ie)).toBe(false);
			});
		});
	});

	describe("mask and unmask", () => {
		it("should correctly mask an unmasked IE", () => {
			expect(GO.mask("109876547")).toBe("10.987.654-7");
		});

		it("should correctly unmask a masked IE", () => {
			expect(GO.unmask("10.987.654-7")).toBe("109876547");
		});
	});

	describe("generate", () => {
		it("should generate a valid IE", () => {
			const generated = GO.generate();
			expect(GO.isValid(generated)).toBe(true);
		});
	});

	describe("generateMasked", () => {
		it("should generate a valid masked IE", () => {
			const generated = GO.generateMasked();
			expect(GO.isValid(generated)).toBe(true);
		});
	});
});
