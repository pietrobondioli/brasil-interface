import { MG } from "./MG";

const VALID_IES = ["0623079040081", "8495466958477", "6891075173832"];

const VALID_MASKED_IES = [
	"062.307.904/0081",
	"849.546.695/8477",
	"689.107.517/3832",
];

describe("MG", () => {
	describe("isValid", () => {
		VALID_IES.forEach((ie) => {
			it(`should validate ${ie} as true`, () => {
				expect(MG.isValid(ie)).toBe(true);
			});
		});

		VALID_MASKED_IES.forEach((ie) => {
			it(`should validate masked IE ${ie} as true`, () => {
				expect(MG.isValid(ie)).toBe(true);
			});
		});

		const invalidIEs = ["123111789", "555555555"];
		invalidIEs.forEach((ie) => {
			it(`should validate ${ie} as false`, () => {
				expect(MG.isValid(ie)).toBe(false);
			});
		});
	});

	describe("mask and unmask", () => {
		it("should correctly mask an unmasked IE", () => {
			expect(MG.mask("0623079040081")).toBe("062.307.904/0081");
		});

		it("should correctly unmask a masked IE", () => {
			expect(MG.unmask("062.307.904/0081")).toBe("0623079040081");
		});
	});

	describe("generate", () => {
		it("should generate a valid IE", () => {
			const generated = MG.generate();
			expect(MG.isValid(generated)).toBe(true);
		});
	});

	describe("generateMasked", () => {
		it("should generate a valid masked IE", () => {
			const generated = MG.generateMasked();
			expect(MG.isValid(generated)).toBe(true);
		});
	});
});
