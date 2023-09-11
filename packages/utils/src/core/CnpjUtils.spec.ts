import { CnpjUtils } from "./CnpjUtils";

describe("CnpjUtils", () => {
	describe("isValid", () => {
		it("should return false for empty string", () => {
			expect(CnpjUtils.isValid("")).toBe(false);
		});

		it("should return false for CNPJ with incorrect length", () => {
			expect(CnpjUtils.isValid("0000000000")).toBe(false);
		});

		it("should return false for blacklisted CNPJ values", () => {
			expect(CnpjUtils.isValid("11111111111111")).toBe(false);
		});

		it("should return true for valid CNPJ without mask", () => {
			expect(CnpjUtils.isValid("11444777000161")).toBe(true);
		});

		it("should return true for valid CNPJ with mask", () => {
			expect(CnpjUtils.isValid("11.444.777/0001-61")).toBe(true);
		});

		it("should return false for invalid CNPJ", () => {
			expect(CnpjUtils.isValid("11444777000162")).toBe(false);
		});
	});

	describe("mask", () => {
		it("should correctly mask CNPJ number", () => {
			const cnpj = "11444777000161";
			expect(CnpjUtils.mask(cnpj)).toBe("11.444.777/0001-61");
		});
	});

	describe("maskSensitive", () => {
		it("should correctly mask sensitive CNPJ number", () => {
			const cnpj = "11444777000161";
			expect(CnpjUtils.maskSensitive(cnpj)).toBe("11.444.***/0001-**");
		});
	});

	describe("unmask", () => {
		it("should correctly unmask CNPJ number", () => {
			const cnpj = "11.444.777/0001-61";
			expect(CnpjUtils.unmask(cnpj)).toBe("11444777000161");
		});
	});

	describe("generate", () => {
		it("should generate a valid CNPJ number", () => {
			const cnpj = CnpjUtils.generate();
			expect(CnpjUtils.isValid(cnpj)).toBe(true);
		});
	});
});
