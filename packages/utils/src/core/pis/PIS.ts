import { Mod11Alg } from "@/helpers/Mod11Alg";
import { Random } from "@/helpers/Random";

export class PIS {
	private static readonly ANY_NON_DIGIT_REGEX = /[^\d]/g;

	private static readonly PIS_BASE_NUMERALS_LENGTH = 10;
	private static readonly PIS_VERIFIER_DIGITS_LENGTH = 1;
	private static readonly PIS_LENGTH = 11;
	private static readonly PIS_BASE_NUMERALS_START = 0;
	private static readonly PIS_BASE_NUMERALS_END = 10;
	private static readonly PIS_WEIGHTS = [3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

	private static readonly PIS_DIGITS_REGEX = /(\d{3})(\d{5})(\d{2})(\d{1})/;
	private static readonly PIS_MASK = "$1.$2.$3-$4";
	private static readonly PIS_MASK_SENSITIVE = "$1.$2.**-*";

	/**
	 * PT-BR: Verifica se um número de PIS é válido.
	 *
	 * EN: Checks if a PIS number is valid.
	 *
	 * @param pis - PT-BR: O número de PIS. EN: The PIS number.
	 * @returns PT-BR: `true` se o número de PIS for válido. EN: `true` if the PIS number is valid.
	 *
	 * @example
	 * ```
	 * PIS.isValid("000.00000.00-0"); // false
	 * PIS.isValid("00000000000"); // false
	 * PIS.isValid("520.22242.34-4"); // true
	 * PIS.isValid("52022242344"); // true
	 * ```
	 */
	public static isValid(pis: string | number): boolean {
		if (!pis) return false;

		pis = this.clear(pis);
		if (pis.length !== this.PIS_LENGTH) return false;

		const verifierDigit = this.generateVerifierDigits(
			this.getBaseNumerals(pis)
		);

		return pis.endsWith(verifierDigit.toString());
	}

	/**
	 * PT-BR: Máscara um número de PIS.
	 *
	 * EN: Masks a PIS number.
	 *
	 * @param pis - PT-BR: O número de PIS. EN: The PIS number.
	 * @returns PT-BR: O número de PIS mascarado. EN: The masked PIS number.
	 *
	 * @example
	 * ```
	 * PIS.mask("520.22242.34-4"); // "520.22242.34-4"
	 * PIS.mask("52022242344"); // "520.22242.34-4"
	 * ```
	 */
	public static mask(pis: string | number): string {
		return this.applyMask(pis, this.PIS_MASK);
	}

	/**
	 * PT-BR: Máscara um número de PIS, mas oculta os dígitos finais.
	 *
	 * EN: Masks a PIS number, but hides the final digits.
	 *
	 * @param pis - PT-BR: O número de PIS. EN: The PIS number.
	 * @returns PT-BR: O número de PIS mascarado. EN: The masked PIS number.
	 *
	 * @example
	 * ```
	 * PIS.maskSensitive("520.22242.34-4"); // "520.22242.**-*"
	 * PIS.maskSensitive("52022242344"); // "520.22242.**-*"
	 * ```
	 */
	public static maskSensitive(pis: string | number): string {
		return this.applyMask(pis, this.PIS_MASK_SENSITIVE);
	}

	/**
	 * PT-BR: Remove a máscara de um número de PIS.
	 *
	 * EN: Removes the mask from a PIS number.
	 *
	 * @param pis - PT-BR: O número de PIS. EN: The PIS number.
	 * @returns PT-BR: O número de PIS sem máscara. EN: The PIS number without mask.
	 *
	 * @example
	 * ```
	 * PIS.unmask("520.22242.34-4"); // "52022242344"
	 * PIS.unmask("52022242344"); // "52022242344"
	 * ```
	 */
	public static unmask(pis: string | number): string {
		return this.clear(pis);
	}

	/**
	 * PT-BR: Gera um número de PIS válido.
	 *
	 * EN: Generates a valid PIS number.
	 *
	 * @returns PT-BR: O número de PIS gerado. EN: The generated PIS number.
	 *
	 * @example
	 * ```
	 * PIS.generate(); // "52022242344"
	 * ```
	 */
	public static generate(): string {
		const digits = Random.generateRandomNumber(
			this.PIS_BASE_NUMERALS_LENGTH
		).toString();

		return digits + this.generateVerifierDigits(digits);
	}

	/**
	 * PT-BR: Gera um número de PIS válido com máscara.
	 *
	 * EN: Generates a valid PIS number with mask.
	 *
	 * @returns PT-BR: O número de PIS gerado com máscara. EN: The generated PIS number with mask.
	 *
	 * @example
	 * ```
	 * PIS.generateMasked(); // "520.22242.34-4"
	 * ```
	 */
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

	private static getBaseNumerals(digits: string): string {
		return digits.slice(
			this.PIS_BASE_NUMERALS_START,
			this.PIS_BASE_NUMERALS_END
		);
	}

	private static generateVerifierDigits(digits: string): string {
		const digit = Mod11Alg.calculateCheckDigit({
			digits,
			weights: this.PIS_WEIGHTS,
		});

		return digit;
	}
}
