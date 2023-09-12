import { CNPJ } from "./CNPJ";

const VALID_CNPJ = "52029894000146";
const VALID_CNPJ_MASKED = "52.029.894/0001-46";
const VALID_CNPJ_MASKED_SENSITIVE = "52.029.***/0001-**";

const INVALID_CNPJ = "11111111111111";

const CNPJ_REPEATED_DIGITS = "00000000000000";

const CNPJ_INVALID_LENGTH = "5202989400014";

describe("CNPJ", () => {
	describe("isValid", () => {
		it("should return false for empty string", () => {
			expect(CNPJ.isValid("")).toBe(false);
		});

		it("should return false for undefined or null CNPJ", () => {
			expect(CNPJ.isValid(undefined as any)).toBe(false);
			expect(CNPJ.isValid(null as any)).toBe(false);
		});

		it("should return false for CNPJ with incorrect length", () => {
			expect(CNPJ.isValid(CNPJ_INVALID_LENGTH)).toBe(false);
		});

		it("should return false for blacklisted CNPJ values", () => {
			expect(CNPJ.isValid(CNPJ_REPEATED_DIGITS)).toBe(false);
		});

		it("should return true for valid CNPJ without mask", () => {
			expect(CNPJ.isValid(VALID_CNPJ)).toBe(true);
		});

		it("should return true for valid CNPJ with mask", () => {
			expect(CNPJ.isValid(VALID_CNPJ_MASKED)).toBe(true);
		});

		it("should return false for invalid CNPJ", () => {
			expect(CNPJ.isValid(INVALID_CNPJ)).toBe(false);
		});
	});

	describe("mask", () => {
		it("should correctly mask CNPJ number", () => {
			expect(CNPJ.mask(VALID_CNPJ)).toBe(VALID_CNPJ_MASKED);
		});
	});

	describe("maskSensitive", () => {
		it("should correctly mask sensitive CNPJ number", () => {
			expect(CNPJ.maskSensitive(VALID_CNPJ)).toBe(VALID_CNPJ_MASKED_SENSITIVE);
		});
	});

	describe("unmask", () => {
		it("should correctly unmask CNPJ number", () => {
			expect(CNPJ.unmask(VALID_CNPJ_MASKED)).toBe(VALID_CNPJ);
		});
	});

	describe("generate", () => {
		it("should generate a valid CNPJ number", () => {
			const cnpj = CNPJ.generate();
			expect(CNPJ.isValid(cnpj)).toBe(true);
		});
	});
});
