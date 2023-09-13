import { Random } from "./Random";

describe("Random Class", () => {
	describe("generateRandomNumber", () => {
		test("should generate random number of fixed length", () => {
			const length = 3; // For example: 3 should produce numbers between 100 and 999
			const result = Random.generateRandomNumber(length);

			expect(result).toBeGreaterThanOrEqual(100);
			expect(result).toBeLessThanOrEqual(999);
		});

		test("should generate random number within specified range", () => {
			const range: [number, number] = [5, 15]; // Random number between 5 and 15 inclusive
			const result = Random.generateRandomNumber(range);

			expect(result).toBeGreaterThanOrEqual(5);
			expect(result).toBeLessThanOrEqual(15);
		});

		test("should throw error for negative or zero fixed length", () => {
			expect(() => Random.generateRandomNumber(0)).toThrow(
				"Number size must be greater than 0"
			);
			expect(() => Random.generateRandomNumber(-2)).toThrow(
				"Number size must be greater than 0"
			);
		});
	});
});
