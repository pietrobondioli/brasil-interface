export class PISUtils {
	private static readonly ANY_NON_DIGIT_REGEX = /\D+/g;

	private static readonly PIS_LENGTH = 11;

	private static readonly PIS_DIGITS_REGEX = /(\d{3})(\d{5})(\d{2})(\d{1})/;

	private static readonly PIS_MASK = "$1.$2.$3-$4";

	private static readonly PIS_MASK_SENSITIVE = "$1.$2.**-*";

	private static readonly PIS_WEIGHTS = [3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

	public static isValid(pis: string | number): boolean {
		if (!pis) return false;

		pis = this.clear(pis);
		if (pis.length !== this.PIS_LENGTH) return false;

		const verifierDigit = this.calculateVerifierDigit(pis.slice(0, -1));

		return pis.endsWith(verifierDigit.toString());
	}

	public static mask(pis: string | number): string {
		return this.applyMask(pis, this.PIS_MASK);
	}

	public static maskSensitive(pis: string | number): string {
		return this.applyMask(pis, this.PIS_MASK_SENSITIVE);
	}

	public static unmask(pis: string | number): string {
		return this.clear(pis);
	}

	public static generate(): string {
		const digits = Array.from({ length: 10 }, () =>
			Math.floor(Math.random() * 10)
		).join("");

		return digits + this.calculateVerifierDigit(digits);
	}

	public static generateMasked(): string {
		return this.mask(this.generate());
	}

	private static clear(value: string | number): string {
		return value.toString().replace(this.ANY_NON_DIGIT_REGEX, "");
	}

	private static applyMask(
		value: string | number,
		maskPattern: string
	): string {
		return this.clear(value).replace(this.PIS_DIGITS_REGEX, maskPattern);
	}

	private static calculateVerifierDigit(digits: string): number {
		const numbers = digits.split("").map((n) => parseInt(n, 10));
		const sum = numbers.reduce(
			(acc, value, idx) => acc + value * this.PIS_WEIGHTS[idx],
			0
		);
		const mod = sum % 11;
		const result = 11 - mod;

		return [10, 11].some((n) => n === result) ? 0 : result;
	}
}
