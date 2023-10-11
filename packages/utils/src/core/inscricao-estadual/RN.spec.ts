import { InscricaoEstadual } from "./RN";

const VALID_IES = ["204497868", "204884993", "200845608", "209182210"];

const VALID_MASKED_IES = [
	"20.449.786-8",
	"20.488.499-3",
	"20.084.560-8",
	"20.918.221-0",
	"20.040.040-1",
];

describe("InscricaoEstadual.RN", () => {
	describe("isValid", () => {
		describe("should validate unmasked IEs", () => {
			VALID_IES.forEach((ie) => {
				it(`should validate ${ie} as true`, () => {
					expect(InscricaoEstadual.RN.isValid(ie)).toBe(true);
				});
			});
		});

		describe("should validate masked IEs", () => {
			VALID_MASKED_IES.forEach((ie) => {
				it(`should validate masked IE ${ie} as true`, () => {
					expect(InscricaoEstadual.RN.isValid(ie)).toBe(true);
				});
			});
		});

		const invalidIEs = ["123111789", "555555555"];
		invalidIEs.forEach((ie) => {
			it(`should validate ${ie} as false`, () => {
				expect(InscricaoEstadual.RN.isValid(ie)).toBe(false);
			});
		});
	});

	describe("mask and unmask", () => {
		it("should correctly mask an unmasked IE", () => {
			expect(InscricaoEstadual.RN.mask("204497868")).toBe("20.449.786-8");
		});

		it("should correctly unmask a masked IE", () => {
			expect(InscricaoEstadual.RN.unmask("20.449.786-8")).toBe("204497868");
		});
	});

	describe("generate", () => {
		it("should generate a valid IE", () => {
			const generated = InscricaoEstadual.RN.generate();
			expect(InscricaoEstadual.RN.isValid(generated)).toBe(true);
		});
	});

	describe("generateMasked", () => {
		it("should generate a valid masked IE", () => {
			const generated = InscricaoEstadual.RN.generateMasked();
			expect(InscricaoEstadual.RN.isValid(generated)).toBe(true);
		});
	});
});
