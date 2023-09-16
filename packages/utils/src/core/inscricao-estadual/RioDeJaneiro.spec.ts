import { InscricaoEstadual } from "./RioDeJaneiro";

const VALID_IES = ["96857217", "60437700", "55007772", "49211465"];

const VALID_MASKED_IES = [
	"96.857.21-7",
	"60.437.70-0",
	"55.007.77-2",
	"49.211.46-5",
];

describe("InscricaoEstadual.RioDeJaneiro", () => {
	describe("isValid", () => {
		describe("should validate unmasked IEs", () => {
			VALID_IES.forEach((ie) => {
				it(`should validate ${ie} as true`, () => {
					expect(InscricaoEstadual.RioDeJaneiro.isValid(ie)).toBe(true);
				});
			});
		});

		describe("should validate masked IEs", () => {
			VALID_MASKED_IES.forEach((ie) => {
				it(`should validate masked IE ${ie} as true`, () => {
					expect(InscricaoEstadual.RioDeJaneiro.isValid(ie)).toBe(true);
				});
			});
		});

		const invalidIEs = ["123111789", "555555555"];
		invalidIEs.forEach((ie) => {
			it(`should validate ${ie} as false`, () => {
				expect(InscricaoEstadual.RioDeJaneiro.isValid(ie)).toBe(false);
			});
		});
	});

	describe("mask and unmask", () => {
		it("should correctly mask an unmasked IE", () => {
			expect(InscricaoEstadual.RioDeJaneiro.mask("96857217")).toBe(
				"96.857.21-7"
			);
		});

		it("should correctly unmask a masked IE", () => {
			expect(InscricaoEstadual.RioDeJaneiro.unmask("96.857.21-7")).toBe(
				"96857217"
			);
		});
	});

	describe("generate", () => {
		it("should generate a valid IE", () => {
			const generated = InscricaoEstadual.RioDeJaneiro.generate();
			expect(InscricaoEstadual.RioDeJaneiro.isValid(generated)).toBe(true);
		});
	});

	describe("generateMasked", () => {
		it("should generate a valid masked IE", () => {
			const generated = InscricaoEstadual.RioDeJaneiro.generateMasked();
			expect(InscricaoEstadual.RioDeJaneiro.isValid(generated)).toBe(true);
		});
	});
});
