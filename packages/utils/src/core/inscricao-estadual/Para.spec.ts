import { InscricaoEstadual } from "./Para";

const VALID_IES = ["154877905", "155908235", "151130710", "151040591"];

const VALID_MASKED_IES = [
	"15-487790-5",
	"15-590823-5",
	"15-113071-0",
	"15-104059-1",
];

describe("InscricaoEstadual.Para", () => {
	describe("isValid", () => {
		VALID_IES.forEach((ie) => {
			it(`should validate ${ie} as true`, () => {
				expect(InscricaoEstadual.Para.isValid(ie)).toBe(true);
			});
		});

		VALID_MASKED_IES.forEach((ie) => {
			it(`should validate masked IE ${ie} as true`, () => {
				expect(InscricaoEstadual.Para.isValid(ie)).toBe(true);
			});
		});

		const invalidIEs = ["123111789", "555555555"];
		invalidIEs.forEach((ie) => {
			it(`should validate ${ie} as false`, () => {
				expect(InscricaoEstadual.Para.isValid(ie)).toBe(false);
			});
		});
	});

	describe("mask and unmask", () => {
		it("should correctly mask an unmasked IE", () => {
			expect(InscricaoEstadual.Para.mask("154877905")).toBe("15-487790-5");
		});

		it("should correctly unmask a masked IE", () => {
			expect(InscricaoEstadual.Para.unmask("15-487790-5")).toBe("154877905");
		});
	});

	describe("generate", () => {
		it("should generate a valid IE", () => {
			const generated = InscricaoEstadual.Para.generate();
			expect(InscricaoEstadual.Para.isValid(generated)).toBe(true);
		});
	});

	describe("generateMasked", () => {
		it("should generate a valid masked IE", () => {
			const generated = InscricaoEstadual.Para.generateMasked();
			expect(InscricaoEstadual.Para.isValid(generated)).toBe(true);
		});
	});
});
