import { Mod11Alg } from "./Mod11Alg";

// Declare test values
const VALID_DIGITS = "20359338";
const VALID_WEIGHTS = [2, 3, 4, 5, 6, 7, 8, 9];
const EXPECTED_VALID_CHECK_DIGIT = "8";

const DIGITS_FOR_VERIFIER_DIG_10 = "90001071";
const WEIGHTS_FOR_VERIFIER_DIG_10 = [2, 3, 4, 5, 6, 7, 8, 9];
const EXPECTED_RESULT_FOR_10 = "10";

const DIGITS_FOR_VERIFIER_DIG_11 = "70001044";
const WEIGHTS_FOR_VERIFIER_DIG_11 = [2, 3, 4, 5, 6, 7, 8, 9];
const EXPECTED_RESULT_FOR_11 = "11";

describe("Mod11Alg Class", () => {
	test("Calculate check digit for valid digits", () => {
		const result = Mod11Alg.calculateCheckDigit({
			digits: VALID_DIGITS,
			weights: VALID_WEIGHTS,
		});
		expect(result).toBe(EXPECTED_VALID_CHECK_DIGIT);
	});

	test("Calculate check digit resulting in 10", () => {
		const result = Mod11Alg.calculateCheckDigit({
			digits: DIGITS_FOR_VERIFIER_DIG_10,
			weights: WEIGHTS_FOR_VERIFIER_DIG_10,
			resultFor10: EXPECTED_RESULT_FOR_10,
		});
		expect(result).toBe(EXPECTED_RESULT_FOR_10);
	});

	test("Calculate check digit resulting in 11", () => {
		const result = Mod11Alg.calculateCheckDigit({
			digits: DIGITS_FOR_VERIFIER_DIG_11,
			weights: WEIGHTS_FOR_VERIFIER_DIG_11,
			resultFor11: EXPECTED_RESULT_FOR_11,
		});
		expect(result).toBe(EXPECTED_RESULT_FOR_11);
	});

	test("Calculate check digit from the right", () => {
		const result = Mod11Alg.calculateCheckDigit({
			digits: VALID_DIGITS.split("").reverse().join(""),
			weights: VALID_WEIGHTS,
			direction: "fromRight",
		});
		expect(result).toBe(EXPECTED_VALID_CHECK_DIGIT);
	});
});
