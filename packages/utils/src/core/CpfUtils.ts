export class CpfUtils {
	private static readonly ANY_NON_DIGIT_REGEX = /\D+/g;

	private static readonly CPF_LENGTH = 11;

	private static readonly CPF_DIGITS_REGEX = /(\d{3})(\d{3})(\d{3})(\d{2})/;

	private static readonly CPF_MASK = "$1.$2.$3-$4";

	private static readonly CPF_MASK_SENSITIVE = "$1.$2.***-**";

	private static readonly CPF_BLACKLIST = [
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
	 * PT-BR: Verifica se um número de CPF é válido.
	 *
	 * EN: Checks if a CPF number is valid.
	 *
	 * @param cpf - PT-BR: O número de CPF. EN: The CPF number.
	 * @returns PT-BR: `true` se o número de CPF for válido. EN: `true` if the CPF number is valid.
	 *
	 * @example
	 * ```
	 * CpfUtils.isValid("000.000.000-00"); // false
	 * CpfUtils.isValid("000.000.001-91"); // true
	 * CpfUtils.isValid("00000000191"); // true
	 * CpfUtils.isValid("00000000192"); // false
	 * ```
	 */
	public static isValid(cpf: string | number): boolean {
		if (!cpf) return false;

		cpf = this.clear(cpf);
		if (cpf.length !== this.CPF_LENGTH) return false;
		if (this.CPF_BLACKLIST.includes(cpf)) return false;

		const generatedVerifierDigits = this.generateVerifierDigits(
			cpf.slice(0, 9)
		);
		return cpf.slice(9, 11) === generatedVerifierDigits;
	}

	/**
	 * PT-BR: Aplica a máscara de CPF em um número de CPF.
	 *
	 * EN: Applies the CPF mask to a CPF number.
	 *
	 * @param cpf - PT-BR: O número de CPF. EN: The CPF number.
	 * @returns PT-BR: O número de CPF com a máscara aplicada. EN: The CPF number with the mask applied.
	 *
	 * @example
	 * ```
	 * CpfUtils.mask("00000000191"); // "000.000.001-91"
	 * CpfUtils.mask("00000000192"); // "000.000.001-92"
	 * ```
	 */
	public static mask(cpf: string | number): string {
		return this.applyMask(cpf, this.CPF_MASK);
	}

	/**
	 * PT-BR: Remove a máscara de CPF de um número de CPF.
	 *
	 * EN: Removes the CPF mask from a CPF number.
	 *
	 * @param cpf - PT-BR: O número de CPF. EN: The CPF number.
	 * @returns PT-BR: O número de CPF sem a máscara. EN: The CPF number without the mask.
	 *
	 * @example
	 * ```
	 * CpfUtils.unmask("000.000.001-91"); // "00000000191"
	 * CpfUtils.unmask("000.000.001-92"); // "00000000192"
	 * ```
	 */
	public static unmask(cpf: string | number): string {
		return this.clear(cpf);
	}

	/**
	 * PT-BR: Gera um número de CPF aleatório.
	 *
	 * EN: Generates a random CPF number.
	 *
	 * @returns PT-BR: O número de CPF gerado. EN: The generated CPF number.
	 *
	 * @example
	 * ```
	 * CpfUtils.generate(); // "00000000191"
	 * ```
	 */
	public static generate(): string {
		const numbers = Math.floor(Math.random() * 90000000000) + 10000000000;
		return numbers.toString() + this.generateVerifierDigits(numbers.toString());
	}

	/**
	 * PT-BR: Gera um número de CPF aleatório.
	 *
	 * EN: Generates a random CPF number.
	 *
	 * @returns PT-BR: O número de CPF gerado. EN: The generated CPF number.
	 *
	 * @example
	 * ```
	 * CpfUtils.generate(); // "000.000.001-91"
	 * ```
	 */
	public static generateMasked(): string {
		return this.mask(this.generate());
	}

	/**
	 * PT-BR: Máscara um número de CPF,
	 * Útil para exibir dados sensíveis.
	 *
	 * EN: Masks a CPF number,
	 * Useful for displaying sensitive data.
	 *
	 * @param cpf - PT-BR: O número de CPF. EN: The CPF number.
	 * @returns PT-BR: O número de CPF mascarado. EN: The masked CPF number.
	 *
	 * @example
	 * ```
	 * CpfUtils.maskSensitive("00000000191"); // "000.000.***-**"
	 * ```
	 */
	public static maskSensitive(cpf: string | number): string {
		return this.applyMask(cpf, this.CPF_MASK_SENSITIVE);
	}

	private static clear(value: string | number): string {
		return value.toString().replace(this.ANY_NON_DIGIT_REGEX, "");
	}

	private static applyMask(
		value: string | number,
		maskPattern: string
	): string {
		return this.clear(value).replace(this.CPF_DIGITS_REGEX, maskPattern);
	}

	private static generateVerifierDigits(digits: string): string {
		const firstDigit = this.calculateVerifierDigit(digits);
		const secondDigit = this.calculateVerifierDigit(digits + firstDigit);
		return firstDigit.toString() + secondDigit.toString();
	}

	private static calculateVerifierDigit(digits: string): number {
		const numbers = digits.split("").map((n) => parseInt(n, 10));
		const modulus = numbers.length + 1;
		const sum = numbers.reduce(
			(acc, value, idx) => acc + value * (modulus - idx),
			0
		);
		const mod = sum % 11;
		return mod < 2 ? 0 : 11 - mod;
	}
}
