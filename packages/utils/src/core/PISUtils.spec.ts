import { PISUtils } from "./PISUtils";

const VALID_PIS = "52022242344";
const VALID_PIS_MASKED = "520.22242.34-4";
const VALID_PIS_MASKED_SENSITIVE = "520.22242.**-*";

const INVALID_PIS = "00000000005";
const INVALID_PIS_MASKED = "000.00000.00-5";

const PIS_INVALID_LENGTH = "000.00000.00";

const MASKED_PIS_REGEX = /^\d{3}\.\d{5}\.\d{2}-\d{1}$/;

describe("PISUtils", () => {
	describe("isValid", () => {
		it("should return false for invalid PIS", () => {
			expect(PISUtils.isValid(INVALID_PIS)).toBe(false);
			expect(PISUtils.isValid(INVALID_PIS_MASKED)).toBe(false);
		});

		it("should return true for valid PIS", () => {
			expect(PISUtils.isValid(VALID_PIS)).toBe(true);
			expect(PISUtils.isValid(VALID_PIS_MASKED)).toBe(true);
		});

		it("should return false for PIS with invalid length", () => {
			expect(PISUtils.isValid(PIS_INVALID_LENGTH)).toBe(false);
		});
	});

	describe("mask and unmask", () => {
		it("should correctly mask a PIS", () => {
			expect(PISUtils.mask(VALID_PIS)).toBe(VALID_PIS_MASKED);
		});

		it("should correctly unmask a PIS", () => {
			expect(PISUtils.unmask(VALID_PIS_MASKED)).toBe(VALID_PIS);
		});
	});

	describe("generate and generateMasked", () => {
		it("should generate a valid PIS", () => {
			const generatedPIS = PISUtils.generate();
			expect(generatedPIS.length).toBe(11);
			expect(PISUtils.isValid(generatedPIS)).toBe(true);
		});

		it("should generate a valid masked PIS", () => {
			const generatedPIS = PISUtils.generateMasked();
			expect(MASKED_PIS_REGEX.test(generatedPIS)).toBe(true);
			expect(PISUtils.isValid(PISUtils.unmask(generatedPIS))).toBe(true);
		});
	});

	describe("maskSensitive", () => {
		it("should correctly mask sensitive parts of a PIS", () => {
			expect(PISUtils.maskSensitive(VALID_PIS)).toBe(
				VALID_PIS_MASKED_SENSITIVE
			);
			expect(PISUtils.maskSensitive(VALID_PIS_MASKED)).toBe(
				VALID_PIS_MASKED_SENSITIVE
			);
		});
	});
});
