import { InscricaoEstadual } from "./Piaui";

const VALID_IES = ["247324833", "578921138", "470110902", "465395333"];

const VALID_MASKED_IES = [
	"24732483-3",
	"57892113-8",
	"47011090-2",
	"46539533-3",
];

describe("InscricaoEstadual.Piaui", () => {
	describe("isValid", () => {
		describe("should validate unmasked IEs", () => {
			VALID_IES.forEach((ie) => {
				it(`should validate ${ie} as true`, () => {
					expect(InscricaoEstadual.Piaui.isValid(ie)).toBe(true);
				});
			});
		});

		describe("should validate masked IEs", () => {
			VALID_MASKED_IES.forEach((ie) => {
				it(`should validate masked IE ${ie} as true`, () => {
					expect(InscricaoEstadual.Piaui.isValid(ie)).toBe(true);
				});
			});
		});

		const invalidIEs = ["123111789", "555555555"];
		invalidIEs.forEach((ie) => {
			it(`should validate ${ie} as false`, () => {
				expect(InscricaoEstadual.Piaui.isValid(ie)).toBe(false);
			});
		});
	});

	describe("mask and unmask", () => {
		it("should correctly mask an unmasked IE", () => {
			expect(InscricaoEstadual.Piaui.mask("247324833")).toBe("24732483-3");
		});

		it("should correctly unmask a masked IE", () => {
			expect(InscricaoEstadual.Piaui.unmask("24732483-3")).toBe("247324833");
		});
	});

	describe("generate", () => {
		it("should generate a valid IE", () => {
			const generated = InscricaoEstadual.Piaui.generate();
			expect(InscricaoEstadual.Piaui.isValid(generated)).toBe(true);
		});
	});

	describe("generateMasked", () => {
		it("should generate a valid masked IE", () => {
			const generated = InscricaoEstadual.Piaui.generateMasked();
			expect(InscricaoEstadual.Piaui.isValid(generated)).toBe(true);
		});
	});
});
