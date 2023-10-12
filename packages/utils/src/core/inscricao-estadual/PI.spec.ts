import { PI } from "./PI";

const VALID_IES = ["247324833", "578921138", "470110902", "465395333"];

const VALID_MASKED_IES = [
	"24732483-3",
	"57892113-8",
	"47011090-2",
	"46539533-3",
];

describe("PI", () => {
	describe("isValid", () => {
		describe("should validate unmasked IEs", () => {
			VALID_IES.forEach((ie) => {
				it(`should validate ${ie} as true`, () => {
					expect(PI.isValid(ie)).toBe(true);
				});
			});
		});

		describe("should validate masked IEs", () => {
			VALID_MASKED_IES.forEach((ie) => {
				it(`should validate masked IE ${ie} as true`, () => {
					expect(PI.isValid(ie)).toBe(true);
				});
			});
		});

		const invalidIEs = ["123111789", "555555555"];
		invalidIEs.forEach((ie) => {
			it(`should validate ${ie} as false`, () => {
				expect(PI.isValid(ie)).toBe(false);
			});
		});
	});

	describe("mask and unmask", () => {
		it("should correctly mask an unmasked IE", () => {
			expect(PI.mask("247324833")).toBe("24732483-3");
		});

		it("should correctly unmask a masked IE", () => {
			expect(PI.unmask("24732483-3")).toBe("247324833");
		});
	});

	describe("generate", () => {
		it("should generate a valid IE", () => {
			const generated = PI.generate();
			expect(PI.isValid(generated)).toBe(true);
		});
	});

	describe("generateMasked", () => {
		it("should generate a valid masked IE", () => {
			const generated = PI.generateMasked();
			expect(PI.isValid(generated)).toBe(true);
		});
	});
});
