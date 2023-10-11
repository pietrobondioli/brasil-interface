import { InscricaoEstadual } from "./RR";

const VALID_IES = ["248229230", "248115545", "240480672", "244399355"];

const VALID_MASKED_IES = [
	"24822923-0",
	"24811554-5",
	"24048067-2",
	"24439935-5",
];

describe("InscricaoEstadual.RR", () => {
	describe("isValid", () => {
		VALID_IES.forEach((ie) => {
			it(`should validate ${ie} as true`, () => {
				expect(InscricaoEstadual.RR.isValid(ie)).toBe(true);
			});
		});

		VALID_MASKED_IES.forEach((ie) => {
			it(`should validate masked IE ${ie} as true`, () => {
				expect(InscricaoEstadual.RR.isValid(ie)).toBe(true);
			});
		});

		const invalidIEs = ["123111789", "555555555"];
		invalidIEs.forEach((ie) => {
			it(`should validate ${ie} as false`, () => {
				expect(InscricaoEstadual.RR.isValid(ie)).toBe(false);
			});
		});
	});

	describe("mask and unmask", () => {
		it("should correctly mask an unmasked IE", () => {
			expect(InscricaoEstadual.RR.mask("248229230")).toBe("24822923-0");
		});

		it("should correctly unmask a masked IE", () => {
			expect(InscricaoEstadual.RR.unmask("24822923-0")).toBe("248229230");
		});
	});

	describe("generate", () => {
		it("should generate a valid IE", () => {
			const generated = InscricaoEstadual.RR.generate();
			expect(InscricaoEstadual.RR.isValid(generated)).toBe(true);
		});
	});

	describe("generateMasked", () => {
		it("should generate a valid masked IE", () => {
			const generated = InscricaoEstadual.RR.generateMasked();
			expect(InscricaoEstadual.RR.isValid(generated)).toBe(true);
		});
	});
});
