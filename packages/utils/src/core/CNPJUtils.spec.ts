import { CNPJUtils } from "./CNPJUtils";

describe("CNPJUtils", () => {
	describe("isValid", () => {
		it("should return false for empty string", () => {
			expect(CNPJUtils.isValid("")).toBe(false);
		});

		it("should return false for CNPJ with incorrect length", () => {
			expect(CNPJUtils.isValid("0000000000")).toBe(false);
		});

		it("should return false for blacklisted CNPJ values", () => {
			expect(CNPJUtils.isValid("11111111111111")).toBe(false);
		});

		it("should return true for valid CNPJ without mask", () => {
			expect(CNPJUtils.isValid("11444777000161")).toBe(true);
		});

		it("should return true for valid CNPJ with mask", () => {
			expect(CNPJUtils.isValid("11.444.777/0001-61")).toBe(true);
		});

		it("should return false for invalid CNPJ", () => {
			expect(CNPJUtils.isValid("11444777000162")).toBe(false);
		});
	});

	describe("mask", () => {
		it("should correctly mask CNPJ number", () => {
			const cnpj = "11444777000161";
			expect(CNPJUtils.mask(cnpj)).toBe("11.444.777/0001-61");
		});
	});

	describe("maskSensitive", () => {
		it("should correctly mask sensitive CNPJ number", () => {
			const cnpj = "11444777000161";
			expect(CNPJUtils.maskSensitive(cnpj)).toBe("11.444.***/0001-**");
		});
	});

	describe("unmask", () => {
		it("should correctly unmask CNPJ number", () => {
			const cnpj = "11.444.777/0001-61";
			expect(CNPJUtils.unmask(cnpj)).toBe("11444777000161");
		});
	});

	describe("generate", () => {
		it("should generate a valid CNPJ number", () => {
			const cnpj = CNPJUtils.generate();
			expect(CNPJUtils.isValid(cnpj)).toBe(true);
		});
	});
});
