import { Assert } from "@/helpers/Assert";
import { ANY_NON_DIGIT_REGEX } from "@/helpers/Constants";
import { ModAlg } from "@/helpers/ModAlg";
import { Pipes, ValidationWorker } from "@/helpers/Pipes";
import { Random } from "@/helpers/Random";
import { Transform } from "@/helpers/Transform";

export class CNPJ {
	private static readonly MOD_ALG = 11;

	private static readonly LENGTH = 14;
	private static readonly BASE_NUMERALS_LENGTH = 12;
	private static readonly VERIFIER_DIGITS_LENGTH = 2;

	private static readonly BASE_NUMERALS_START = 0;
	private static readonly BASE_NUMERALS_END = 12;

	private static readonly FIRST_VERIFIER_DIGIT_WEIGHTS = [
		5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2,
	];
	private static readonly SECOND_VERIFIER_DIGIT_WEIGHTS = [
		6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2,
	];

	private static readonly MASK_REGEX = /(^\d{2})(\d{3})(\d{3})(\d{4})(\d{2}$)/;
	private static readonly MASK_PATTERN = "$1.$2.$3/$4-$5";
	private static readonly MASK_SENSITIVE_PATTERN = "$1.$2.***/$4-**";

	private static readonly BLACKLIST = [
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

	private static readonly VALIDATION_RULES = [
		Assert.String.isDefined,
		Assert.String.isNotEmpty,
		(v) => Assert.String.hasLengthOf(v, this.LENGTH),
		(v) => Assert.Array.notContains(v, this.BLACKLIST),
		this.shouldHaveValidVerifierDigits.bind(this),
	] satisfies ValidationWorker[];

	/**
	 * PT-BR: Verifica se um número de CNPJ é válido.
	 * EN: Checks if a CNPJ number is valid.
	 *
	 * @param cnpj - PT-BR: O número de CNPJ. EN: The CNPJ number.
	 * @returns PT-BR: `true` se o número de CNPJ for válido. EN: `true` if the CNPJ number is valid.
	 *
	 * @example
	 * ```
	 * CNPJ.isValid("00.000.000/0000-00"); // false
	 * CNPJ.isValid("52.029.894/0001-46"); // true
	 * ```
	 */
	public static isValid(cnpj: string): boolean {
		const transformedValue = this.clear(cnpj);

		return Pipes.runValidations(transformedValue, this.VALIDATION_RULES);
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
	 * CNPJ.mask("52029894000146"); // "52.029.894/0001-46"
	 * ```
	 */
	public static mask(cnpj: string): string {
		const cleanedValue = this.clear(cnpj);

		return Transform.String.applyMask(
			cleanedValue,
			this.MASK_REGEX,
			this.MASK_PATTERN
		);
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
	 * CNPJ.maskSensitive("52029894000146"); // "52.029.***\/0001-**"
	 * ```
	 */
	public static maskSensitive(cnpj: string): string {
		const cleanedValue = this.clear(cnpj);

		return Transform.String.applyMask(
			cleanedValue,
			this.MASK_REGEX,
			this.MASK_SENSITIVE_PATTERN
		);
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
	 * CNPJ.unmask("52.029.894/0001-46"); // "52029894000146"
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
	 * CNPJ.generate(); // "52029894000146"
	 * ```
	 */
	public static generate(): string {
		const digits = Random.generateRandomNumber(
			this.BASE_NUMERALS_LENGTH
		).toString();

		const verifierDigits = this.calculateVerifierDigits(digits);

		return digits + verifierDigits;
	}

	/**
	 * PT-BR: Gera um número de CNPJ aleatório com máscara.
	 *
	 * EN: Generates a random CNPJ number with mask.
	 *
	 * @returns PT-BR: O número de CNPJ gerado com máscara. EN: The generated CNPJ number with mask.
	 *
	 * @example
	 * ```
	 * CNPJ.generateMasked(); // "52.029.894/0001-46"
	 * ```
	 */
	public static generateMasked(): string {
		return this.mask(this.generate());
	}

	private static clear(cnpj: string): string {
		return Transform.String.clearString(cnpj, ANY_NON_DIGIT_REGEX);
	}

	private static shouldHaveValidVerifierDigits(cnpj: string): boolean {
		const baseNumerals = this.getBaseNumerals(cnpj);

		const verifierDigits = this.calculateVerifierDigits(baseNumerals);

		return cnpj.endsWith(verifierDigits);
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
			modStrategy: "modComplement",
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
			modStrategy: "modComplement",
			modAlg: this.MOD_ALG,
			direction: "fromLeft",
			digits: baseNumerals + firstVerifierDigit,
			weights: this.SECOND_VERIFIER_DIGIT_WEIGHTS,
		});
	}
}
