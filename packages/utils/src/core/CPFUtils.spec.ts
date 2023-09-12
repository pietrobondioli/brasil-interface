import { CPFUtils } from "./CPFUtils";

describe("CPFUtils", () => {
	describe("isValid", () => {
		it("should return false for invalid CPFs", () => {
			expect(CPFUtils.isValid("000.000.000-00")).toBe(false);
			expect(CPFUtils.isValid("00000000192")).toBe(false);
		});

		it("should return true for valid CPFs", () => {
			expect(CPFUtils.isValid("000.000.001-91")).toBe(true);
			expect(CPFUtils.isValid("00000000191")).toBe(true);
		});

		it("should return false for blacklisted CPFs", () => {
			expect(CPFUtils.isValid("111.111.111-11")).toBe(false);
		});

		it("should return false for CPFs with invalid length", () => {
			expect(CPFUtils.isValid("000.000.001")).toBe(false);
		});
	});

	describe("mask and unmask", () => {
		it("should correctly mask a CPF", () => {
			expect(CPFUtils.mask("00000000191")).toBe("000.000.001-91");
		});

		it("should correctly unmask a CPF", () => {
			expect(CPFUtils.unmask("000.000.001-91")).toBe("00000000191");
		});
	});

	describe("generate and generateMasked", () => {
		it("should generate a valid CPF", () => {
			const generatedCPF = CPFUtils.generate();
			expect(generatedCPF.length).toBe(11);
			expect(CPFUtils.isValid(generatedCPF)).toBe(true);
		});

		it("should generate a valid masked CPF", () => {
			const generatedCPF = CPFUtils.generateMasked();
			expect(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(generatedCPF)).toBe(true);
			expect(CPFUtils.isValid(CPFUtils.unmask(generatedCPF))).toBe(true);
		});
	});

	describe("maskSensitive", () => {
		it("should correctly mask sensitive parts of a CPF", () => {
			expect(CPFUtils.maskSensitive("00000000191")).toBe("000.000.***-**");
		});
	});
});
