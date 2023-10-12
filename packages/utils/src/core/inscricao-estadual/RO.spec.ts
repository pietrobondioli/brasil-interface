import { RO } from "./RO";

const VALID_IES = [
	"78968791851674",
	"05876988247842",
	"83743833801857",
	"20811958422341",
];

const VALID_MASKED_IES = [
	"7896879185167-4",
	"0587698824784-2",
	"8374383380185-7",
	"2081195842234-1",
];

describe("RO", () => {
	describe("isValid", () => {
		VALID_IES.forEach((ie) => {
			it(`should validate ${ie} as true`, () => {
				expect(RO.isValid(ie)).toBe(true);
			});
		});

		VALID_MASKED_IES.forEach((ie) => {
			it(`should validate masked IE ${ie} as true`, () => {
				expect(RO.isValid(ie)).toBe(true);
			});
		});

		const invalidIEs = ["123111789", "555555555"];
		invalidIEs.forEach((ie) => {
			it(`should validate ${ie} as false`, () => {
				expect(RO.isValid(ie)).toBe(false);
			});
		});
	});

	describe("mask and unmask", () => {
		it("should correctly mask an unmasked IE", () => {
			expect(RO.mask("20811958422341")).toBe("2081195842234-1");
		});

		it("should correctly unmask a masked IE", () => {
			expect(RO.unmask("2081195842234-1")).toBe("20811958422341");
		});
	});

	describe("generate", () => {
		it("should generate a valid IE", () => {
			const generated = RO.generate();
			expect(RO.isValid(generated)).toBe(true);
		});
	});

	describe("generateMasked", () => {
		it("should generate a valid masked IE", () => {
			const generated = RO.generateMasked();
			expect(RO.isValid(generated)).toBe(true);
		});
	});
});
