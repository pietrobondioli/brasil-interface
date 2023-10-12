import { SE } from "./SE";

const VALID_IES = ["585556610", "091982030", "878057935", "343763184"];

const VALID_MASKED_IES = [
	"58555661-0",
	"09198203-0",
	"87805793-5",
	"34376318-4",
];

describe("SE", () => {
	describe("isValid", () => {
		VALID_IES.forEach((ie) => {
			it(`should validate ${ie} as true`, () => {
				expect(SE.isValid(ie)).toBe(true);
			});
		});

		VALID_MASKED_IES.forEach((ie) => {
			it(`should validate masked IE ${ie} as true`, () => {
				expect(SE.isValid(ie)).toBe(true);
			});
		});

		const invalidIEs = ["123111789", "555555555"];
		invalidIEs.forEach((ie) => {
			it(`should validate ${ie} as false`, () => {
				expect(SE.isValid(ie)).toBe(false);
			});
		});
	});

	describe("mask and unmask", () => {
		it("should correctly mask an unmasked IE", () => {
			expect(SE.mask("585556610")).toBe("58555661-0");
		});

		it("should correctly unmask a masked IE", () => {
			expect(SE.unmask("58555661-0")).toBe("585556610");
		});
	});

	describe("generate", () => {
		it("should generate a valid IE", () => {
			const generated = SE.generate();
			expect(SE.isValid(generated)).toBe(true);
		});
	});

	describe("generateMasked", () => {
		it("should generate a valid masked IE", () => {
			const generated = SE.generateMasked();
			expect(SE.isValid(generated)).toBe(true);
		});
	});
});
