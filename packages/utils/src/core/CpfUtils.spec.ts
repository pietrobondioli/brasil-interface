import { CpfUtils } from "./CpfUtils";

describe("CpfUtils", () => {
	describe("isValid", () => {
		it("should return false for invalid CPFs", () => {
			expect(CpfUtils.isValid("000.000.000-00")).toBe(false);
			expect(CpfUtils.isValid("00000000192")).toBe(false);
		});

		it("should return true for valid CPFs", () => {
			expect(CpfUtils.isValid("000.000.001-91")).toBe(true);
			expect(CpfUtils.isValid("00000000191")).toBe(true);
		});

		it("should return false for blacklisted CPFs", () => {
			expect(CpfUtils.isValid("111.111.111-11")).toBe(false);
		});

		it("should return false for CPFs with invalid length", () => {
			expect(CpfUtils.isValid("000.000.001")).toBe(false);
		});
	});

	describe("mask and unmask", () => {
		it("should correctly mask a CPF", () => {
			expect(CpfUtils.mask("00000000191")).toBe("000.000.001-91");
		});

		it("should correctly unmask a CPF", () => {
			expect(CpfUtils.unmask("000.000.001-91")).toBe("00000000191");
		});
	});

	describe("generate and generateMasked", () => {
		it("should generate a valid CPF", () => {
			const generatedCPF = CpfUtils.generate();
			expect(generatedCPF.length).toBe(11);
			expect(CpfUtils.isValid(generatedCPF)).toBe(true);
		});

		it("should generate a valid masked CPF", () => {
			const generatedCPF = CpfUtils.generateMasked();
			expect(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(generatedCPF)).toBe(true);
			expect(CpfUtils.isValid(CpfUtils.unmask(generatedCPF))).toBe(true);
		});
	});

	describe("maskSensitive", () => {
		it("should correctly mask sensitive parts of a CPF", () => {
			expect(CpfUtils.maskSensitive("00000000191")).toBe("000.000.***-**");
		});
	});
});
