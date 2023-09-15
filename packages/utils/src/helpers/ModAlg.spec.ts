import { ModAlg } from "./ModAlg";

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

describe("ModAlg Class", () => {
	test("Calculate check digit for valid digits", () => {
		const result = ModAlg.calculateCheckDigit({
			modAlg: 11,
			digits: VALID_DIGITS,
			weights: VALID_WEIGHTS,
		});
		expect(result).toBe(EXPECTED_VALID_CHECK_DIGIT);
	});

	test("Calculate check digit resulting in 10", () => {
		const result = ModAlg.calculateCheckDigit({
			modAlg: 11,
			digits: DIGITS_FOR_VERIFIER_DIG_10,
			weights: WEIGHTS_FOR_VERIFIER_DIG_10,
			transform: {
				10: EXPECTED_RESULT_FOR_10,
			},
		});
		expect(result).toBe(EXPECTED_RESULT_FOR_10);
	});

	test("Calculate check digit resulting in 11", () => {
		const result = ModAlg.calculateCheckDigit({
			modAlg: 11,
			digits: DIGITS_FOR_VERIFIER_DIG_11,
			weights: WEIGHTS_FOR_VERIFIER_DIG_11,
			transform: {
				11: EXPECTED_RESULT_FOR_11,
			},
		});
		expect(result).toBe(EXPECTED_RESULT_FOR_11);
	});

	test("Calculate check digit from the right", () => {
		const result = ModAlg.calculateCheckDigit({
			modAlg: 11,
			digits: VALID_DIGITS.split("").reverse().join(""),
			weights: VALID_WEIGHTS,
			direction: "fromRight",
		});
		expect(result).toBe(EXPECTED_VALID_CHECK_DIGIT);
	});

	test("Calculate check digit for valid digits with direct mod", () => {
		const result = ModAlg.calculateCheckDigit({
			modAlg: 11,
			digits: VALID_DIGITS,
			weights: VALID_WEIGHTS,
			returnModDirectly: true,
		});
		// Expecting direct mod value here
		const directModResult = (
			VALID_DIGITS.split("").reduce(
				(acc, val, idx) =>
					acc + parseInt(val) * VALID_WEIGHTS[idx % VALID_WEIGHTS.length],
				0
			) % 11
		).toString();
		expect(result).toBe(directModResult);
	});

	test("Calculate check digit resulting in 10 with direct mod", () => {
		const result = ModAlg.calculateCheckDigit({
			modAlg: 11,
			digits: DIGITS_FOR_VERIFIER_DIG_10,
			weights: WEIGHTS_FOR_VERIFIER_DIG_10,
			returnModDirectly: true,
		});
		const directModResultFor10 = (
			DIGITS_FOR_VERIFIER_DIG_10.split("").reduce(
				(acc, val, idx) =>
					acc +
					parseInt(val) *
						WEIGHTS_FOR_VERIFIER_DIG_10[
							idx % WEIGHTS_FOR_VERIFIER_DIG_10.length
						],
				0
			) % 11
		).toString();
		expect(result).toBe(directModResultFor10);
	});

	test("Calculate check digit resulting in 11 with direct mod", () => {
		const result = ModAlg.calculateCheckDigit({
			modAlg: 11,
			digits: DIGITS_FOR_VERIFIER_DIG_11,
			weights: WEIGHTS_FOR_VERIFIER_DIG_11,
			returnModDirectly: true,
		});
		const directModResultFor11 = (
			DIGITS_FOR_VERIFIER_DIG_11.split("").reduce(
				(acc, val, idx) =>
					acc +
					parseInt(val) *
						WEIGHTS_FOR_VERIFIER_DIG_11[
							idx % WEIGHTS_FOR_VERIFIER_DIG_11.length
						],
				0
			) % 11
		).toString();
		expect(result).toBe(directModResultFor11);
	});
});
