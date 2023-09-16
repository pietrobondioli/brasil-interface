import { Assert } from "@/helpers/Assert";
import { ANY_NON_DIGIT_REGEX } from "@/helpers/Constants";
import { EstadoSigla } from "@/helpers/Estados";
import { ModAlg } from "@/helpers/ModAlg";
import { Pipes, ValidationWorker } from "@/helpers/Pipes";
import { Random } from "@/helpers/Random";
import { Transform } from "@/helpers/Transform";

export class CPF {
	private static readonly MOD_ALG = 11;

	private static readonly LENGTH = 11;
	private static readonly BASE_NUMERALS_LENGTH = 9;
	private static readonly VERIFIER_DIGITS_LENGTH = 2;

	private static readonly UF_DIGIT_POSITION = 8;

	private static readonly BASE_NUMERALS_START = 0;
	private static readonly BASE_NUMERALS_END = 9;

	private static readonly FIRST_VERIFIER_DIGIT_WEIGHTS = [
		10, 9, 8, 7, 6, 5, 4, 3, 2,
	];
	private static readonly SECOND_VERIFIER_DIGIT_WEIGHTS = [
		11, 10, 9, 8, 7, 6, 5, 4, 3, 2,
	];

	private static readonly MASK_REGEX = /(\d{3})(\d{3})(\d{3})(\d{2})/;
	private static readonly MASK_PATTERN = "$1.$2.$3-$4";
	private static readonly MASK_SENSITIVE_PATTERN = "$1.$2.***-**";

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

	private static readonly VALIDATION_RULES = [
		Assert.String.shouldBeDefined,
		Assert.String.shouldNotBeEmpty,
		(v) => Assert.String.shouldHaveLengthOf(v, this.LENGTH),
		(v) => Assert.String.shouldNotBeIn(v, this.BLACKLIST),
		this.shouldHaveValidVerifierDigits.bind(this),
	] satisfies ValidationWorker[];

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
		const transformedValue = this.clear(cpf);

		return Pipes.runValidations(transformedValue, this.VALIDATION_RULES);
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
		const cleanedValue = this.clear(cpf);

		return Transform.applyMask(
			cleanedValue,
			this.MASK_REGEX,
			this.MASK_PATTERN
		);
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
		const cleanedValue = this.clear(cpf);

		return Transform.applyMask(
			cleanedValue,
			this.MASK_REGEX,
			this.MASK_SENSITIVE_PATTERN
		);
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
		const baseNumerals = Random.generateRandomNumber(
			this.BASE_NUMERALS_LENGTH
		).toString();

		const verifierDigits = this.calculateVerifierDigits(baseNumerals);

		return baseNumerals + verifierDigits;
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

		if (!this.isUfKey(ufCode)) return null;

		return this.UF_MAP[ufCode];
	}

	private static isUfKey(key: string): key is keyof typeof this.UF_MAP {
		return key in this.UF_MAP;
	}

	private static clear(cpf: any): string {
		return Transform.clearString(cpf, ANY_NON_DIGIT_REGEX);
	}

	private static getUfCode(cpf: string | number): string | null {
		return this.clear(cpf).charAt(this.UF_DIGIT_POSITION);
	}

	private static shouldHaveValidVerifierDigits(cpf: string): boolean {
		const baseNumerals = this.getBaseNumerals(cpf);

		const verifierDigits = this.calculateVerifierDigits(baseNumerals);

		return cpf.endsWith(verifierDigits);
	}

	private static getBaseNumerals(digits: string): string {
		return digits.slice(this.BASE_NUMERALS_START, this.BASE_NUMERALS_END);
	}

	private static calculateVerifierDigits(baseNumerals: string): string {
		const firstVerifierDigit = this.calculateFirstVerifierDigit(baseNumerals);
		const secondVerifierDigit = this.calculateSecondVerifierDigit(
			baseNumerals,
			firstVerifierDigit
		);

		return firstVerifierDigit + secondVerifierDigit;
	}

	private static calculateFirstVerifierDigit(baseNumerals: string): string {
		return ModAlg.calculateCheckDigit({
			algReturnType: "modComplement",
			modAlg: this.MOD_ALG,
			direction: "fromLeft",
			digits: baseNumerals,
			weights: this.FIRST_VERIFIER_DIGIT_WEIGHTS,
		});
	}

	private static calculateSecondVerifierDigit(
		baseNumerals: string,
		firstVerifierDigit: string
	): string {
		return ModAlg.calculateCheckDigit({
			algReturnType: "modComplement",
			modAlg: this.MOD_ALG,
			direction: "fromLeft",
			digits: baseNumerals + firstVerifierDigit,
			weights: this.SECOND_VERIFIER_DIGIT_WEIGHTS,
		});
	}
}
