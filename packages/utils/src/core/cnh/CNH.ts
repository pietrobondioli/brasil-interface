import { ModAlg } from "@/helpers/ModAlg";
import { Random } from "@/helpers/Random";

export class CNH {
	private static readonly ANY_NON_DIGIT_REGEX = /[^\d]/g;

	private static readonly CNH_BASE_NUMERALS_LENGTH = 9;
	private static readonly CNH_VERIFIER_DIGITS_LENGTH = 2;
	private static readonly CNH_LENGTH = 11;
	private static readonly CNH_BASE_NUMERALS_START = 0;
	private static readonly CNH_BASE_NUMERALS_END = 9;

	private static readonly FIRST_VERIFIER_DIGIT_WEIGHTS = [
		2, 3, 4, 5, 6, 7, 8, 9, 10,
	];
	private static readonly SECOND_VERIFIER_DIGIT_WEIGHTS = [
		2, 3, 4, 5, 6, 7, 8, 9, 10, 11,
	];
	private static readonly CNH_DIGITS_REGEX = /(\d{9})(\d{2})/;

	private static readonly CNH_BLACKLIST = [
		"00000000000",
		"11111111111",
		"22222222222",
		"33333333333",
		"44444444444",
		"55555555555",
		"66666666666",
		"77777777777",
		"88888888888",
		"99999999999",
	];

	/**
	 * PT-BR: Verifica se um número de CNH é válido.
	 *
	 * EN: Checks if a CNH number is valid.
	 *
	 * @param cnh - PT-BR: O número de CNH. EN: The CNH number.
	 * @returns PT-BR: `true` se o número de CNH for válido. EN: `true` if the CNH number is valid.
	 *
	 * @example
	 * ```
	 * CNH.isValid("00000000000"); // false
	 * CNH.isValid("00000000192"); // false
	 * CNH.isValid("7603518447"); // false
	 * CNH.isValid("76035184470"); // true
	 * ```
	 */
	public static isValid(cnh: string): boolean {
		if (!cnh) return false;

		cnh = this.clear(cnh);

		if (cnh.length !== this.CNH_LENGTH) return false;
		if (this.CNH_BLACKLIST.some((bl) => bl === cnh)) return false;

		const verifierDigits = this.generateVerifierDigits(
			this.getBaseNumerals(cnh)
		);

		return cnh.endsWith(verifierDigits);
	}

	/**
	 * PT-BR: Gera um número de CNH válido.
	 *
	 * EN: Generates a valid CNH number.
	 *
	 * @returns PT-BR: Um número de CNH válido. EN: A valid CNH number.
	 *
	 * @example
	 * ```
	 * CNH.generate(); // 76035184470
	 * ```
	 */
	public static generate(): string {
		const digits = Random.generateRandomNumber(
			this.CNH_BASE_NUMERALS_LENGTH
		).toString();

		return digits + this.generateVerifierDigits(digits);
	}

	private static clear(value: string | number): string {
		return value.toString().replace(this.ANY_NON_DIGIT_REGEX, "");
	}

	private static getBaseNumerals(digits: string): string {
		return digits.slice(
			this.CNH_BASE_NUMERALS_START,
			this.CNH_BASE_NUMERALS_END
		);
	}

	private static generateVerifierDigits(digits: string): string {
		const firstDigit = ModAlg.calculateCheckDigit({
			modAlg: 11,
			digits,
			weights: this.FIRST_VERIFIER_DIGIT_WEIGHTS,
		});
		const secondDigit = ModAlg.calculateCheckDigit({
			modAlg: 11,
			digits: firstDigit + digits,
			weights: this.SECOND_VERIFIER_DIGIT_WEIGHTS,
		});

		return `${firstDigit}${secondDigit}`;
	}
}
