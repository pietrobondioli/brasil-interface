export class Random {
	public static generateRandomNumber(numberSize: number): number;

	public static generateRandomNumber(range: [number, number]): number;

	public static generateRandomNumber(input: number | [number, number]): number {
		if (typeof input === "number") {
			return this.generateFixedLengthRandomNumber(input);
		} else {
			return this.generateRandomNumberWithinRange(input);
		}
	}

	private static generateFixedLengthRandomNumber(numberSize: number): number {
		if (numberSize <= 0) {
			throw new Error("Number size must be greater than 0");
		}

		const min = Math.pow(10, numberSize - 1);
		const max = Math.pow(10, numberSize) - 1;

		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	private static generateRandomNumberWithinRange(
		range: [number, number]
	): number {
		const [min, max] = range;

		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	public static fromArray<T>(array: T[]): T {
		if (array.length === 0) {
			throw new Error("Array must not be empty");
		}

		const randomIndex = this.generateRandomNumber([0, array.length - 1]);

		return array[randomIndex];
	}
}
