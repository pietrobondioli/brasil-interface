import { Assert } from "@/helpers/Assert";
import { ANY_NON_DIGIT_REGEX } from "@/helpers/Constants";
import { ModAlg } from "@/helpers/ModAlg";
import { Pipes, ValidationWorker } from "@/helpers/Pipes";
import { Random } from "@/helpers/Random";
import { Transform } from "@/helpers/Transform";

export class PIS {
	private static readonly MOD_ALG = 11;

	private static readonly LENGTH = 11;
	private static readonly BASE_NUMERALS_LENGTH = 10;
	private static readonly VERIFIER_DIGITS_LENGTH = 1;

	private static readonly BASE_NUMERALS_START = 0;
	private static readonly BASE_NUMERALS_END = 10;

	private static readonly WEIGHTS = [3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

	private static readonly MASK_REGEX = /(\d{3})(\d{5})(\d{2})(\d{1})/;
	private static readonly MASK_PATTERN = "$1.$2.$3-$4";
	private static readonly MASK_SENSITIVE_PATTERN = "$1.$2.**-*";

	private static readonly VALIDATION_RULES = [
		Assert.String.isDefined,
		Assert.String.isNotEmpty,
		(v) => Assert.String.hasLengthOf(v, this.LENGTH),
		this.shouldHaveValidVerifierDigits.bind(this),
	] satisfies ValidationWorker[];

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
		const transformedValue = this.clear(pis);

		return Pipes.runValidations(transformedValue, this.VALIDATION_RULES);
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
		const cleanedValue = this.clear(pis);

		return Transform.String.applyMask(
			cleanedValue,
			this.MASK_REGEX,
			this.MASK_PATTERN
		);
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
		const cleanedValue = this.clear(pis);

		return Transform.String.applyMask(
			cleanedValue,
			this.MASK_REGEX,
			this.MASK_SENSITIVE_PATTERN
		);
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
		const baseNumerals = Random.generateRandomNumber(
			this.BASE_NUMERALS_LENGTH
		).toString();

		return baseNumerals + this.generateVerifierDigit(baseNumerals);
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
		return Transform.String.clearString(value, ANY_NON_DIGIT_REGEX);
	}

	private static shouldHaveValidVerifierDigits(digits: string): boolean {
		const baseNumerals = this.getBaseNumerals(digits);

		const verifierDigit = this.generateVerifierDigit(baseNumerals);

		return digits.endsWith(verifierDigit);
	}

	private static getBaseNumerals(digits: string): string {
		return digits.slice(this.BASE_NUMERALS_START, this.BASE_NUMERALS_END);
	}

	private static generateVerifierDigit(digits: string): string {
		const digit = ModAlg.calculateCheckDigit({
			modStrategy: "modComplement",
			modAlg: this.MOD_ALG,
			direction: "fromLeft",
			digits,
			weights: this.WEIGHTS,
		});

		return digit;
	}
}
