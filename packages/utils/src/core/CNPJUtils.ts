export class CNPJUtils {
	private static readonly ANY_NON_DIGIT_REGEX = /\D+/g;

	private static readonly CNPJ_LENGTH = 14;

	private static readonly CNPJ_DIGITS_REGEX =
		/(^\d{2})(\d{3})(\d{3})(\d{4})(\d{2}$)/;

	private static readonly CNPJ_MASK = "$1.$2.$3/$4-$5";

	private static readonly CNPJ_MASK_SENSITIVE = "$1.$2.***/$4-**";

	private static readonly CNPJ_BLACKLIST = [
		"00000000000000",
		"11111111111111",
		"22222222222222",
		"33333333333333",
		"44444444444444",
		"55555555555555",
		"66666666666666",
		"77777777777777",
		"88888888888888",
		"99999999999999",
	];

	/**
	 * PT-BR: Verifica se um número de CNPJ é válido.
	 * EN: Checks if a CNPJ number is valid.
	 *
	 * @param cnpj - PT-BR: O número de CNPJ. EN: The CNPJ number.
	 * @returns PT-BR: `true` se o número de CNPJ for válido. EN: `true` if the CNPJ number is valid.
	 *
	 * @example
	 * ```
	 * CNPJUtils.isValid("00.000.000/0000-00"); // false
	 * CNPJUtils.isValid("00.000.000/0001-91"); // true
	 * ```
	 */
	public static isValid(cnpj: string): boolean {
		if (!cnpj) return false;

		const cleanedCnpj = this.clear(cnpj);
		if (cleanedCnpj.length !== this.CNPJ_LENGTH) return false;
		if (this.CNPJ_BLACKLIST.some((bl) => bl === cleanedCnpj)) return false;

		const firstDigit = this.verifierDigit(cleanedCnpj.slice(0, 12));
		const secondDigit = this.verifierDigit(cleanedCnpj.slice(0, 13));

		return (
			parseInt(cleanedCnpj.charAt(12)) === firstDigit &&
			parseInt(cleanedCnpj.charAt(13)) === secondDigit
		);
	}

	private static verifierDigit(cnpj: string): number {
		let sum = 0,
			multiplier = 2;
		for (let i = cnpj.length - 1; i >= 0; i--) {
			sum += parseInt(cnpj.charAt(i)) * multiplier;
			multiplier = multiplier === 9 ? 2 : multiplier + 1;
		}
		const mod = sum % 11;

		return mod < 2 ? 0 : 11 - mod;
	}

	private static clear(cpf: string): string {
		return cpf.replace(this.ANY_NON_DIGIT_REGEX, "");
	}

	private static applyMask(cnpj: string, maskPattern: string): string {
		return this.clear(cnpj).replace(this.CNPJ_DIGITS_REGEX, maskPattern);
	}

	/**
	 * PT-BR: Máscara um número de CNPJ.
	 * Útil para exibir o número.
	 * Essa é a máscara padrão. Use `maskSensitive` para mascarar dados sensíveis.
	 * Use `unmask` para remover a máscara.
	 *
	 * EN: Masks a CNPJ number.
	 * Useful for displaying the number.
	 * This is the default mask. Use `maskSensitive` to mask sensitive data.
	 * Use `unmask` to remove the mask.
	 *
	 * @param cnpj - PT-BR: O número de CNPJ. EN: The CNPJ number.
	 * @returns PT-BR: O número de CNPJ mascarado. EN: The masked CNPJ number.
	 *
	 * @example
	 * ```
	 * CNPJUtils.mask("00000000000191"); // "00.000.000/0001-91"
	 * ```
	 */
	public static mask(cnpj: string): string {
		return this.applyMask(cnpj, this.CNPJ_MASK);
	}

	/**
	 * PT-BR: Máscara um número de CNPJ,
	 * Útil para exibir dados sensíveis.
	 *
	 * EN: Masks a CNPJ number,
	 * Useful for displaying sensitive data.
	 *
	 * @param cnpj - PT-BR: O número de CNPJ. EN: The CNPJ number.
	 * @returns PT-BR: O número de CNPJ mascarado. EN: The masked CNPJ number.
	 *
	 * @example
	 * ```
	 * CNPJUtils.maskSensitive("00000000000191"); // "00.000.***\/0000-**"
	 * ```
	 */
	public static maskSensitive(cnpj: string): string {
		return this.applyMask(cnpj, this.CNPJ_MASK_SENSITIVE);
	}

	/**
	 * PT-BR: Remove todos os caracteres não numéricos de um número de CNPJ.
	 *
	 * EN: Removes all non-digit characters from a CNPJ number.
	 *
	 * @param cnpj - PT-BR: O número de CNPJ. EN: The CNPJ number.
	 * @returns PT-BR: O número de CNPJ sem máscara. EN: The CNPJ number without mask.
	 *
	 * @example
	 * ```
	 * CNPJUtils.unmask("00.000.000/0001-91"); // "00000000000191"
	 * ```
	 */
	public static unmask(cnpj: string): string {
		return this.clear(cnpj);
	}

	/**
	 * PT-BR: Gera um número de CNPJ aleatório.
	 *
	 * EN: Generates a random CNPJ number.
	 *
	 * @returns PT-BR: O número de CNPJ gerado. EN: The generated CNPJ number.
	 *
	 * @example
	 * ```
	 * CNPJUtils.generate(); // "00000000000191"
	 * ```
	 */
	public static generate(): string {
		let cnpj = "";
		for (let i = 0; i < 12; i++) {
			cnpj += Math.floor(Math.random() * 9);
		}
		cnpj += this.verifierDigit(cnpj);
		cnpj += this.verifierDigit(cnpj);

		return cnpj;
	}
}
