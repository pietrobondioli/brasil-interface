import { PE } from "./PE";

const VALID_IES = ["946697914", "169729451", "357953100", "522520359"];

const VALID_MASKED_IES = [
	"9466979-14",
	"1697294-51",
	"3579531-00",
	"5225203-59",
];

describe("PE", () => {
	describe("isValid", () => {
		describe("should validate unmasked IEs", () => {
			VALID_IES.forEach((ie) => {
				it(`should validate ${ie} as true`, () => {
					expect(PE.isValid(ie)).toBe(true);
				});
			});
		});

		describe("should validate masked IEs", () => {
			VALID_MASKED_IES.forEach((ie) => {
				it(`should validate masked IE ${ie} as true`, () => {
					expect(PE.isValid(ie)).toBe(true);
				});
			});
		});

		const invalidIEs = ["123111789", "555555555"];
		invalidIEs.forEach((ie) => {
			it(`should validate ${ie} as false`, () => {
				expect(PE.isValid(ie)).toBe(false);
			});
		});
	});

	describe("mask and unmask", () => {
		it("should correctly mask an unmasked IE", () => {
			expect(PE.mask("946697914")).toBe("9466979-14");
		});

		it("should correctly unmask a masked IE", () => {
			expect(PE.unmask("9466979-14")).toBe("946697914");
		});
	});

	describe("generate", () => {
		it("should generate a valid IE", () => {
			const generated = PE.generate();
			expect(PE.isValid(generated)).toBe(true);
		});
	});

	describe("generateMasked", () => {
		it("should generate a valid masked IE", () => {
			const generated = PE.generateMasked();
			expect(PE.isValid(generated)).toBe(true);
		});
	});
});
