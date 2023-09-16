import { InscricaoEstadual } from "./Pernambuco";

const VALID_IES = ["946697914", "169729451", "357953100", "522520359"];

const VALID_MASKED_IES = [
	"9466979-14",
	"1697294-51",
	"3579531-00",
	"5225203-59",
];

describe("InscricaoEstadual.Pernambuco", () => {
	describe("isValid", () => {
		describe("should validate unmasked IEs", () => {
			VALID_IES.forEach((ie) => {
				it(`should validate ${ie} as true`, () => {
					expect(InscricaoEstadual.Pernambuco.isValid(ie)).toBe(true);
				});
			});
		});

		describe("should validate masked IEs", () => {
			VALID_MASKED_IES.forEach((ie) => {
				it(`should validate masked IE ${ie} as true`, () => {
					expect(InscricaoEstadual.Pernambuco.isValid(ie)).toBe(true);
				});
			});
		});

		const invalidIEs = ["123111789", "555555555"];
		invalidIEs.forEach((ie) => {
			it(`should validate ${ie} as false`, () => {
				expect(InscricaoEstadual.Pernambuco.isValid(ie)).toBe(false);
			});
		});
	});

	describe("mask and unmask", () => {
		it("should correctly mask an unmasked IE", () => {
			expect(InscricaoEstadual.Pernambuco.mask("946697914")).toBe("9466979-14");
		});

		it("should correctly unmask a masked IE", () => {
			expect(InscricaoEstadual.Pernambuco.unmask("9466979-14")).toBe(
				"946697914"
			);
		});
	});

	describe("generate", () => {
		it("should generate a valid IE", () => {
			const generated = InscricaoEstadual.Pernambuco.generate();
			expect(InscricaoEstadual.Pernambuco.isValid(generated)).toBe(true);
		});
	});

	describe("generateMasked", () => {
		it("should generate a valid masked IE", () => {
			const generated = InscricaoEstadual.Pernambuco.generateMasked();
			expect(InscricaoEstadual.Pernambuco.isValid(generated)).toBe(true);
		});
	});
});
