export class Random {
	public static generateRandomNumber(numberSize: number): number {
		if (numberSize <= 0) {
			throw new Error("Number size must be greater than 0");
		}

		const min = Math.pow(10, numberSize - 1);
		const max = Math.pow(10, numberSize) - 1;

		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
}
