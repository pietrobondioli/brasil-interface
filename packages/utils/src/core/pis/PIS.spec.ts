import { PIS } from "./PIS";

const VALID_PIS = "52022242344";
const VALID_PIS_MASKED = "520.22242.34-4";
const VALID_PIS_MASKED_SENSITIVE = "520.22242.**-*";
const INVALID_PIS = "00000000005";
const INVALID_PIS_MASKED = "000.00000.00-5";
const PIS_INVALID_LENGTH = "000.00000.00";
const PIS_REPEATED_DIGITS = "11111111111";
const MASKED_PIS_REGEX = /^\d{3}\.\d{5}\.\d{2}-\d{1}$/;

const VALID_PIS_PASEPS = [
	"46952280637",
	"08657844336",
	"08099684840",
	"72317373380",
	"44041942975",
	"10379324919",
];

describe("PIS", () => {
	describe("isValid", () => {
		it("should return false for empty string", () => {
			expect(PIS.isValid("")).toBe(false);
		});

		it("should return false for undefined or null PIS", () => {
			expect(PIS.isValid(undefined as any)).toBe(false);
			expect(PIS.isValid(null as any)).toBe(false);
		});

		it("should return false for invalid PIS", () => {
			expect(PIS.isValid(INVALID_PIS)).toBe(false);
			expect(PIS.isValid(INVALID_PIS_MASKED)).toBe(false);
		});

		it("should return true for valid PIS", () => {
			expect(PIS.isValid(VALID_PIS)).toBe(true);
			expect(PIS.isValid(VALID_PIS_MASKED)).toBe(true);
		});

		VALID_PIS_PASEPS.forEach((pis) => {
			it(`should return true for valid PIS ${pis}`, () => {
				expect(PIS.isValid(pis)).toBe(true);
			});
		});

		it("should return false for PIS with invalid length", () => {
			expect(PIS.isValid(PIS_INVALID_LENGTH)).toBe(false);
		});
	});

	describe("mask and unmask", () => {
		it("should correctly mask a PIS", () => {
			expect(PIS.mask(VALID_PIS)).toBe(VALID_PIS_MASKED);
		});

		it("should correctly unmask a PIS", () => {
			expect(PIS.unmask(VALID_PIS_MASKED)).toBe(VALID_PIS);
		});
	});

	describe("generate and generateMasked", () => {
		it("should generate a valid PIS", () => {
			const generatedPIS = PIS.generate();
			expect(generatedPIS.length).toBe(11);
			expect(PIS.isValid(generatedPIS)).toBe(true);
		});

		it("should generate a valid masked PIS", () => {
			const generatedPIS = PIS.generateMasked();
			expect(MASKED_PIS_REGEX.test(generatedPIS)).toBe(true);
			expect(PIS.isValid(PIS.unmask(generatedPIS))).toBe(true);
		});
	});

	describe("maskSensitive", () => {
		it("should correctly mask sensitive parts of a PIS", () => {
			expect(PIS.maskSensitive(VALID_PIS)).toBe(VALID_PIS_MASKED_SENSITIVE);
			expect(PIS.maskSensitive(VALID_PIS_MASKED)).toBe(
				VALID_PIS_MASKED_SENSITIVE
			);
		});
	});
});
