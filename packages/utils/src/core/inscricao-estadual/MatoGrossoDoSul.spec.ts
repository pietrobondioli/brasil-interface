import { InscricaoEstadual } from "./MatoGrossoDoSul";

const VALID_IES = ["280405383", "285922033", "280276320"];

const VALID_MASKED_IES = ["28.040.538-3", "28592203-3", "28027632-0"];

describe("InscricaoEstadual.MatoGrossoDoSul", () => {
	describe("isValid", () => {
		VALID_IES.forEach((ie) => {
			it(`should validate ${ie} as true`, () => {
				expect(InscricaoEstadual.MatoGrossoDoSul.isValid(ie)).toBe(true);
			});
		});

		VALID_MASKED_IES.forEach((ie) => {
			it(`should validate masked IE ${ie} as true`, () => {
				expect(InscricaoEstadual.MatoGrossoDoSul.isValid(ie)).toBe(true);
			});
		});

		const invalidIEs = ["123111789", "555555555"];
		invalidIEs.forEach((ie) => {
			it(`should validate ${ie} as false`, () => {
				expect(InscricaoEstadual.MatoGrossoDoSul.isValid(ie)).toBe(false);
			});
		});
	});

	describe("mask and unmask", () => {
		it("should correctly mask an unmasked IE", () => {
			expect(InscricaoEstadual.MatoGrossoDoSul.mask("280405383")).toBe(
				"28040538-3"
			);
		});

		it("should correctly unmask a masked IE", () => {
			expect(InscricaoEstadual.MatoGrossoDoSul.unmask("28040538-3")).toBe(
				"280405383"
			);
		});
	});

	describe("generate", () => {
		it("should generate a valid IE", () => {
			const generated = InscricaoEstadual.MatoGrossoDoSul.generate();
			expect(InscricaoEstadual.MatoGrossoDoSul.isValid(generated)).toBe(true);
		});
	});

	describe("generateMasked", () => {
		it("should generate a valid masked IE", () => {
			const generated = InscricaoEstadual.MatoGrossoDoSul.generateMasked();
			expect(InscricaoEstadual.MatoGrossoDoSul.isValid(generated)).toBe(true);
		});
	});
});
