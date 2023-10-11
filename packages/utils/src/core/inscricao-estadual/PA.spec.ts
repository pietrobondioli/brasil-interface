import { InscricaoEstadual } from "./PA";

const VALID_IES = ["154877905", "155908235", "151130710", "151040591"];

const VALID_MASKED_IES = [
	"15-487790-5",
	"15-590823-5",
	"15-113071-0",
	"15-104059-1",
];

describe("InscricaoEstadual.PA", () => {
	describe("isValid", () => {
		VALID_IES.forEach((ie) => {
			it(`should validate ${ie} as true`, () => {
				expect(InscricaoEstadual.PA.isValid(ie)).toBe(true);
			});
		});

		VALID_MASKED_IES.forEach((ie) => {
			it(`should validate masked IE ${ie} as true`, () => {
				expect(InscricaoEstadual.PA.isValid(ie)).toBe(true);
			});
		});

		const invalidIEs = ["123111789", "555555555"];
		invalidIEs.forEach((ie) => {
			it(`should validate ${ie} as false`, () => {
				expect(InscricaoEstadual.PA.isValid(ie)).toBe(false);
			});
		});
	});

	describe("mask and unmask", () => {
		it("should correctly mask an unmasked IE", () => {
			expect(InscricaoEstadual.PA.mask("154877905")).toBe("15-487790-5");
		});

		it("should correctly unmask a masked IE", () => {
			expect(InscricaoEstadual.PA.unmask("15-487790-5")).toBe("154877905");
		});
	});

	describe("generate", () => {
		it("should generate a valid IE", () => {
			const generated = InscricaoEstadual.PA.generate();
			expect(InscricaoEstadual.PA.isValid(generated)).toBe(true);
		});
	});

	describe("generateMasked", () => {
		it("should generate a valid masked IE", () => {
			const generated = InscricaoEstadual.PA.generateMasked();
			expect(InscricaoEstadual.PA.isValid(generated)).toBe(true);
		});
	});
});
