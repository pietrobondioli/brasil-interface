import { TO } from "./TO";

const VALID_IES = [
	"61037043744",
	"617043744",
	"04034753616",
	"044753616",
	"99031856058",
	"991856058",
];

const VALID_MASKED_IES = [
	"6103704374-4",
	"61704374-4",
	"0403475361-6",
	"04475361-6",
	"9903185605-8",
	"99185605-8",
];

describe("TO", () => {
	describe("isValid", () => {
		VALID_IES.forEach((ie) => {
			it(`should validate ${ie} as true`, () => {
				expect(TO.isValid(ie)).toBe(true);
			});
		});

		VALID_MASKED_IES.forEach((ie) => {
			it(`should validate masked IE ${ie} as true`, () => {
				expect(TO.isValid(ie)).toBe(true);
			});
		});

		const invalidIEs = ["123111789", "555555555"];
		invalidIEs.forEach((ie) => {
			it(`should validate ${ie} as false`, () => {
				expect(TO.isValid(ie)).toBe(false);
			});
		});
	});

	describe("mask and unmask", () => {
		it("should correctly mask an unmasked IE", () => {
			expect(TO.mask("61037043744")).toBe("6103704374-4");
		});

		it("should correctly unmask a masked IE", () => {
			expect(TO.unmask("6103704374-4")).toBe("61037043744");
		});
	});

	describe("generate", () => {
		it("should generate a valid IE", () => {
			const generated = TO.generate();
			expect(TO.isValid(generated)).toBe(true);
		});
	});

	describe("generateMasked", () => {
		it("should generate a valid masked IE", () => {
			const generated = TO.generateMasked();
			expect(TO.isValid(generated)).toBe(true);
		});
	});
});
