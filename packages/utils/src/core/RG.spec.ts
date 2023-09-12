import { RG } from "./RG";

const VALID_RG = "203361040";
const VALID_RG_MASKED = "20.336.104-0";
const VALID_RG_WITH_X = "30001046X";
const VALID_RG_MASKED_SENSITIVE = "20.336.***-*";

const INVALID_RG = "000000000";
const INVALID_RG_MASKED = "00.000.000-0";

const RG_INVALID_LENGTH = "00.000.00";
const RG_REPEATED_DIGITS = "111111111";

const MASKED_RG_REGEX = /^\d{2}\.\d{3}\.\d{3}-[\dX]{1}$/;

describe("RG.SP", () => {
	describe("isValid", () => {
		it("should return false for empty string", () => {
			expect(RG.SP.isValid("")).toBe(false);
		});

		it("should return false for undefined or null RG", () => {
			expect(RG.SP.isValid(undefined as any)).toBe(false);
			expect(RG.SP.isValid(null as any)).toBe(false);
		});

		it("should return false for invalid RG", () => {
			expect(RG.SP.isValid(INVALID_RG)).toBe(false);
			expect(RG.SP.isValid(INVALID_RG_MASKED)).toBe(false);
		});

		it("should return true for valid RG", () => {
			expect(RG.SP.isValid(VALID_RG)).toBe(true);
			expect(RG.SP.isValid(VALID_RG_MASKED)).toBe(true);
		});

		it("should return true for valid RG with X", () => {
			expect(RG.SP.isValid(VALID_RG_WITH_X)).toBe(true);
		});

		it("should return false for RG with invalid length", () => {
			expect(RG.SP.isValid(RG_INVALID_LENGTH)).toBe(false);
		});
	});

	describe("mask", () => {
		it("should correctly mask an RG", () => {
			expect(RG.SP.mask(VALID_RG)).toBe(VALID_RG_MASKED);
		});

		it("should return the same masked RG if already masked", () => {
			expect(RG.SP.mask(VALID_RG_MASKED)).toBe(VALID_RG_MASKED);
		});
	});

	describe("maskSensitive", () => {
		it("should correctly mask sensitive parts of an RG", () => {
			expect(RG.SP.maskSensitive(VALID_RG)).toBe(VALID_RG_MASKED_SENSITIVE);
			expect(RG.SP.maskSensitive(VALID_RG_MASKED)).toBe(
				VALID_RG_MASKED_SENSITIVE
			);
		});
	});
});
