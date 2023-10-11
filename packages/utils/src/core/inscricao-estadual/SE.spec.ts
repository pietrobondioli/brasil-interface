import { InscricaoEstadual } from "./SE";

const VALID_IES = ["585556610", "091982030", "878057935", "343763184"];

const VALID_MASKED_IES = [
	"58555661-0",
	"09198203-0",
	"87805793-5",
	"34376318-4",
];

describe("InscricaoEstadual.SE", () => {
	describe("isValid", () => {
		VALID_IES.forEach((ie) => {
			it(`should validate ${ie} as true`, () => {
				expect(InscricaoEstadual.SE.isValid(ie)).toBe(true);
			});
		});

		VALID_MASKED_IES.forEach((ie) => {
			it(`should validate masked IE ${ie} as true`, () => {
				expect(InscricaoEstadual.SE.isValid(ie)).toBe(true);
			});
		});

		const invalidIEs = ["123111789", "555555555"];
		invalidIEs.forEach((ie) => {
			it(`should validate ${ie} as false`, () => {
				expect(InscricaoEstadual.SE.isValid(ie)).toBe(false);
			});
		});
	});

	describe("mask and unmask", () => {
		it("should correctly mask an unmasked IE", () => {
			expect(InscricaoEstadual.SE.mask("585556610")).toBe("58555661-0");
		});

		it("should correctly unmask a masked IE", () => {
			expect(InscricaoEstadual.SE.unmask("58555661-0")).toBe("585556610");
		});
	});

	describe("generate", () => {
		it("should generate a valid IE", () => {
			const generated = InscricaoEstadual.SE.generate();
			expect(InscricaoEstadual.SE.isValid(generated)).toBe(true);
		});
	});

	describe("generateMasked", () => {
		it("should generate a valid masked IE", () => {
			const generated = InscricaoEstadual.SE.generateMasked();
			expect(InscricaoEstadual.SE.isValid(generated)).toBe(true);
		});
	});
});
