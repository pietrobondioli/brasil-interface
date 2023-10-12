import { PR } from "./PR";

const VALID_IES = ["2923358300", "3528840069", "5358147161", "6792311707"];

const VALID_MASKED_IES = [
	"292.33583-00",
	"352.88400-69",
	"535.81471-61",
	"679.23117-07",
];

describe("PR", () => {
	describe("isValid", () => {
		describe("should validate unmasked IEs", () => {
			VALID_IES.forEach((ie) => {
				it(`should validate ${ie} as true`, () => {
					expect(PR.isValid(ie)).toBe(true);
				});
			});
		});

		describe("should validate masked IEs", () => {
			VALID_MASKED_IES.forEach((ie) => {
				it(`should validate masked IE ${ie} as true`, () => {
					expect(PR.isValid(ie)).toBe(true);
				});
			});
		});

		const invalidIEs = ["123111789", "555555555"];
		invalidIEs.forEach((ie) => {
			it(`should validate ${ie} as false`, () => {
				expect(PR.isValid(ie)).toBe(false);
			});
		});
	});

	describe("mask and unmask", () => {
		it("should correctly mask an unmasked IE", () => {
			expect(PR.mask("2923358300")).toBe("292.33583-00");
		});

		it("should correctly unmask a masked IE", () => {
			expect(PR.unmask("292.33583-00")).toBe("2923358300");
		});
	});

	describe("generate", () => {
		it("should generate a valid IE", () => {
			const generated = PR.generate();
			expect(PR.isValid(generated)).toBe(true);
		});
	});

	describe("generateMasked", () => {
		it("should generate a valid masked IE", () => {
			const generated = PR.generateMasked();
			expect(PR.isValid(generated)).toBe(true);
		});
	});
});
