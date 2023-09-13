import { EstadoSigla } from "../helpers/Estados";
import { Mod11Alg } from "../helpers/Mod11Alg";
import { Random } from "../helpers/Random";

export class CPF {
	private static readonly ANY_NON_DIGIT_REGEX = /[^\d]/g;

	private static readonly BASE_NUMERALS_LENGTH = 9;
	private static readonly VERIFIER_DIGITS_LENGTH = 2;
	private static readonly LENGTH =
		this.BASE_NUMERALS_LENGTH + this.VERIFIER_DIGITS_LENGTH;

	private static readonly UF_DIGIT_POSITION = 8;

	private static readonly BASE_NUMERALS_START = 0;
	private static readonly BASE_NUMERALS_END = 9;

	private static readonly FIRST_VERIFIER_DIGIT_WEIGHTS = [
		10, 9, 8, 7, 6, 5, 4, 3, 2,
	];
	private static readonly SECOND_VERIFIER_DIGIT_WEIGHTS = [
		11, 10, 9, 8, 7, 6, 5, 4, 3, 2,
	];

	private static readonly DIGITS_REGEX = /(\d{3})(\d{3})(\d{3})(\d{2})/;
	private static readonly MASK = "$1.$2.$3-$4";
	private static readonly MASK_SENSITIVE = "$1.$2.***-**";

	private static readonly BLACKLIST = [
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

	private static readonly UF_MAP = {
		"0": ["RS"],
		"1": ["DF", "GO", "MT", "MS", "TO"],
		"2": ["AM", "PA", "RR", "AP", "AC", "RO"],
		"3": ["CE", "MA", "PI"],
		"4": ["PB", "PE", "AL", "RN"],
		"5": ["BA", "SE"],
		"6": ["MG"],
		"7": ["RJ", "ES"],
		"8": ["SP"],
		"9": ["PR", "SC"],
	} satisfies { [key: string]: EstadoSigla[] };

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
	 * CPF.isValid("000.000.000-00"); // false
	 * CPF.isValid("00000000192"); // false
	 * CPF.isValid("209.936.850-30"); // true
	 * CPF.isValid("20993685030"); // true
	 * ```
	 */
	public static isValid(cpf: string | number): boolean {
		if (!cpf) return false;

		cpf = this.clear(cpf);
		if (cpf.length !== this.LENGTH) return false;
		if (this.BLACKLIST.some((bl) => bl === cpf)) return false;

		const verifierDigits = this.generateVerifierDigits(
			this.getBaseNumerals(cpf)
		);

		return cpf.endsWith(verifierDigits);
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
	 * CPF.mask("20993685030"); // "209.936.850-30"
	 * ```
	 */
	public static mask(cpf: string | number): string {
		return this.applyMask(cpf, this.MASK);
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
	 * CPF.maskSensitive("20993685030"); // "209.936.***-**"
	 * ```
	 */
	public static maskSensitive(cpf: string | number): string {
		return this.applyMask(cpf, this.MASK_SENSITIVE);
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
	 * CPF.unmask("209.936.850-30"); // "20993685030"
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
	 * CPF.generate(); // "20993685030"
	 * ```
	 */
	public static generate(): string {
		const digits = Random.generateRandomNumber(
			this.BASE_NUMERALS_LENGTH
		).toString();

		return digits + this.generateVerifierDigits(digits);
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
	 * CPF.generate(); // "209.936.850-30"
	 * ```
	 */
	public static generateMasked(): string {
		return this.mask(this.generate());
	}

	/**
	 * PT-BR: Obtém a UF de um número de CPF.
	 *
	 * EN: Gets the UF of a CPF number.
	 *
	 * @param cpf - PT-BR: O número de CPF. EN: The CPF number.
	 * @returns PT-BR: A UF do número de CPF. EN: The UF of the CPF number.
	 *
	 * @example
	 * ```
	 * CPF.getUf("20993685030"); // "RS"
	 * ```
	 */
	public static getEstado(
		cpf: string | number
	): (typeof this.UF_MAP)[keyof typeof this.UF_MAP] | null {
		const isValid = this.isValid(cpf);

		if (!isValid) return null;

		const ufCode = this.getUfCode(cpf);
		if (!ufCode) return null;

		if (!this.isUfKey(ufCode)) {
			return null;
		}

		return this.UF_MAP[ufCode];
	}

	private static isUfKey(key: string): key is keyof typeof this.UF_MAP {
		return key in this.UF_MAP;
	}

	private static clear(value: string | number): string {
		return value.toString().replace(this.ANY_NON_DIGIT_REGEX, "");
	}

	private static applyMask(
		value: string | number,
		maskPattern: string
	): string {
		return this.clear(value).replace(this.DIGITS_REGEX, maskPattern);
	}

	private static getUfCode(cpf: string | number): string | null {
		return this.clear(cpf).charAt(this.UF_DIGIT_POSITION);
	}

	private static getBaseNumerals(digits: string): string {
		return digits.slice(this.BASE_NUMERALS_START, this.BASE_NUMERALS_END);
	}

	private static generateVerifierDigits(digits: string): string {
		const firstDigit = Mod11Alg.calculateCheckDigit({
			digits,
			weights: this.FIRST_VERIFIER_DIGIT_WEIGHTS,
		});

		const secondDigit = Mod11Alg.calculateCheckDigit({
			digits: digits + firstDigit,
			weights: this.SECOND_VERIFIER_DIGIT_WEIGHTS,
		});

		return `${firstDigit}${secondDigit}`;
	}
}
