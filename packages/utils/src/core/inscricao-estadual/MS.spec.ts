import { MS } from "./MS";

const VALID_IES = ["280405383", "285922033", "280276320"];

const VALID_MASKED_IES = ["28.040.538-3", "28592203-3", "28027632-0"];

describe("MS", () => {
	describe("isValid", () => {
		VALID_IES.forEach((ie) => {
			it(`should validate ${ie} as true`, () => {
				expect(MS.isValid(ie)).toBe(true);
			});
		});

		VALID_MASKED_IES.forEach((ie) => {
			it(`should validate masked IE ${ie} as true`, () => {
				expect(MS.isValid(ie)).toBe(true);
			});
		});

		const invalidIEs = ["123111789", "555555555"];
		invalidIEs.forEach((ie) => {
			it(`should validate ${ie} as false`, () => {
				expect(MS.isValid(ie)).toBe(false);
			});
		});
	});

	describe("mask and unmask", () => {
		it("should correctly mask an unmasked IE", () => {
			expect(MS.mask("280405383")).toBe("28040538-3");
		});

		it("should correctly unmask a masked IE", () => {
			expect(MS.unmask("28040538-3")).toBe("280405383");
		});
	});

	describe("generate", () => {
		it("should generate a valid IE", () => {
			const generated = MS.generate();
			expect(MS.isValid(generated)).toBe(true);
		});
	});

	describe("generateMasked", () => {
		it("should generate a valid masked IE", () => {
			const generated = MS.generateMasked();
			expect(MS.isValid(generated)).toBe(true);
		});
	});
});
