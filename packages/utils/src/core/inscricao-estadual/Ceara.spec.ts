import { InscricaoEstadual } from "./Ceara";

const VALID_IES = ["996868895", "431680590", "868483508", "110380860"];

const VALID_MASKED_IES = [
	"30130465-3",
	"20987049-4",
	"17459526-3",
	"12241095-5",
];

describe("InscricaoEstadual.Ceara", () => {
	describe("isValid", () => {
		VALID_IES.forEach((ie) => {
			it(`should validate ${ie} as true`, () => {
				expect(InscricaoEstadual.Ceara.isValid(ie)).toBe(true);
			});
		});

		VALID_MASKED_IES.forEach((ie) => {
			it(`should validate masked IE ${ie} as true`, () => {
				expect(InscricaoEstadual.Ceara.isValid(ie)).toBe(true);
			});
		});

		const invalidIEs = ["123111789", "555555555"];
		invalidIEs.forEach((ie) => {
			it(`should validate ${ie} as false`, () => {
				expect(InscricaoEstadual.Ceara.isValid(ie)).toBe(false);
			});
		});
	});

	describe("mask and unmask", () => {
		it("should correctly mask an unmasked IE", () => {
			expect(InscricaoEstadual.Ceara.mask("301304653")).toBe("30130465-3");
		});

		it("should correctly unmask a masked IE", () => {
			expect(InscricaoEstadual.Ceara.unmask("30130465-3")).toBe("301304653");
		});
	});

	describe("generate", () => {
		it("should generate a valid IE", () => {
			const generated = InscricaoEstadual.Ceara.generate();
			expect(InscricaoEstadual.Ceara.isValid(generated)).toBe(true);
		});
	});

	describe("generateMasked", () => {
		it("should generate a valid masked IE", () => {
			const generated = InscricaoEstadual.Ceara.generateMasked();
			expect(InscricaoEstadual.Ceara.isValid(generated)).toBe(true);
		});
	});
});
