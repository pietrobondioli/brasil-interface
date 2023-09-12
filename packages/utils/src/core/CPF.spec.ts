import { CPF } from "./CPF";

const VALID_CPF = "20993685030";
const VALID_CPF_MASKED = "209.936.850-30";
const VALID_CPF_MASKED_SENSITIVE = "209.936.***-**";

const INVALID_CPF = "122.111.111-11";

const CPF_REPEATED_DIGITS = "11111111111";

const CPF_INVALID_LENGTH = "2099368503";

const MASKED_CPF_REGEX = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;

describe("CPF", () => {
	describe("isValid", () => {
		it("should return false for invalid CPFs", () => {
			expect(CPF.isValid(INVALID_CPF)).toBe(false);
		});

		it("should return true for valid CPFs", () => {
			expect(CPF.isValid(VALID_CPF)).toBe(true);
			// expect(CPF.isValid(VALID_CPF_MASKED)).toBe(true);
		});

		it("should return false for blacklisted CPFs", () => {
			expect(CPF.isValid(CPF_REPEATED_DIGITS)).toBe(false);
		});

		it("should return false for CPFs with invalid length", () => {
			expect(CPF.isValid(CPF_INVALID_LENGTH)).toBe(false);
		});
	});

	describe("mask and unmask", () => {
		it("should correctly mask a CPF", () => {
			expect(CPF.mask(VALID_CPF)).toBe(VALID_CPF_MASKED);
		});

		it("should correctly unmask a CPF", () => {
			expect(CPF.unmask(VALID_CPF_MASKED)).toBe(VALID_CPF);
		});
	});

	describe("generate and generateMasked", () => {
		it("should generate a valid CPF", () => {
			const generatedCPF = CPF.generate();
			expect(CPF.isValid(generatedCPF)).toBe(true);
		});

		it("should generate a valid masked CPF", () => {
			const generatedCPF = CPF.generateMasked();
			expect(MASKED_CPF_REGEX.test(generatedCPF)).toBe(true);
			expect(CPF.isValid(CPF.unmask(generatedCPF))).toBe(true);
		});
	});

	describe("maskSensitive", () => {
		it("should correctly mask sensitive parts of a CPF", () => {
			expect(CPF.maskSensitive(VALID_CPF)).toBe(VALID_CPF_MASKED_SENSITIVE);
		});
	});
});
