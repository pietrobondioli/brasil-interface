import { CNH } from "./CNH";

const VALID_CNH = "76035184470";
const INVALID_CNH = "89035184470";

const CNH_REPEATED_DIGITS = "11111111111";

const CNH_INVALID_LENGTH = "7603518447";

describe("CNH", () => {
	describe("isValid", () => {
		it("should return false for empty string", () => {
			expect(CNH.isValid("")).toBe(false);
		});

		it("should return false for undefined or null CNHs", () => {
			expect(CNH.isValid(undefined as any)).toBe(false);
			expect(CNH.isValid(null as any)).toBe(false);
		});

		it("should return false for CNHs with invalid length", () => {
			expect(CNH.isValid(CNH_INVALID_LENGTH)).toBe(false);
		});

		it("should return false for CNHs consisting only of '1's", () => {
			expect(CNH.isValid(CNH_REPEATED_DIGITS)).toBe(false);
		});

		it("should return true for valid CNHs", () => {
			expect(CNH.isValid(VALID_CNH)).toBe(true);
		});

		it("should return false for invalid CNHs", () => {
			expect(CNH.isValid(INVALID_CNH)).toBe(false);
		});
	});
});
