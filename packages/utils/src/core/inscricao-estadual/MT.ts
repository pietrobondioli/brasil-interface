import { Assert } from "@/helpers/Assert";
import { ANY_NON_DIGIT_REGEX } from "@/helpers/Constants";
import { ModAlg } from "@/helpers/ModAlg";
import { Pipes, ValidationWorker } from "@/helpers/Pipes";
import { Random } from "@/helpers/Random";
import { Transform } from "@/helpers/Transform";

export class MT {
	private static readonly MOD_ALG = 11;

	private static readonly VALID_LENGTH = 11;
	private static readonly BASE_NUMERALS_LENGTH = 10;
	private static readonly BASE_NUMERALS_START = 0;
	private static readonly BASE_NUMERALS_END = 10;
	private static readonly VERIFIER_DIGIT_WEIGHTS = [
		3, 2, 9, 8, 7, 6, 5, 4, 3, 2,
	];

	private static readonly MASK_REGEX = /^(\d{10})(\d{1})$/;
	private static readonly MASK_PATTERN = "$1-$2";

	private static readonly VALIDATION_RULES = [
		Assert.String.isDefined,
		Assert.String.isNotEmpty,
		(v) => Assert.String.hasLengthOf(v, this.VALID_LENGTH),
		(v) => Assert.String.containsOnlyNumbers(v),
		this.shouldHaveValidVerifierDigits.bind(this),
	] satisfies ValidationWorker[];

	/**
	 * PT-BR: Verifica se uma inscrição estadual do Mato Grosso é válida.
	 *
	 * EN: Checks if an Mato Grosso state registration is valid.
	 *
	 * @param inscricaoE - PT-BR: A inscrição estadual. Com ou sem máscara. EN: The state registration. With or without mask.
	 * @returns PT-BR: `true` se a inscrição estadual for válida. EN: `true` if the state registration is valid.
	 *
	 * @example
	 * ```
	 * InscricaoEstadual.MT.isValid("1111110310"); // false
	 * InscricaoEstadual.MT.isValid("00130000019"); // true
	 * ```
	 */
	public static isValid(inscricaoE: any): boolean {
		const cleanedValue = this.clear(inscricaoE);

		return Pipes.runValidations(cleanedValue, this.VALIDATION_RULES);
	}

	/**
	 * PT-BR: Máscara uma inscrição estadual do Mato Grosso.
	 *
	 * EN: Masks an Mato Grosso state registration.
	 *
	 * @param inscricaoE - PT-BR: A inscrição estadual. Com ou sem máscara. EN: The state registration. With or without mask.
	 * @returns PT-BR: A inscrição estadual mascarada. EN: The masked state registration.
	 *
	 * @example
	 * ```
	 * InscricaoEstadual.MT.mask("00130000019"); // "0013000001-9"
	 * ```
	 */
	public static mask(inscricaoE: any): string {
		const cleanedValue = this.clear(inscricaoE);

		return Transform.String.applyMask(
			cleanedValue,
			this.MASK_REGEX,
			this.MASK_PATTERN
		);
	}

	/**
	 * PT-BR: Desmascara uma inscrição estadual do Mato Grosso.
	 *
	 * EN: Unmasks an Mato Grosso state registration.
	 *
	 * @param inscricaoE - PT-BR: A inscrição estadual. Com ou sem máscara. EN: The state registration. With or without mask.
	 * @returns PT-BR: A inscrição estadual desmascarada. EN: The unmasked state registration.
	 *
	 * @example
	 * ```
	 * InscricaoEstadual.MT.unmask("0013000001-9"); // "00130000019"
	 * ```
	 */
	public static unmask(inscricaoE: any): string {
		return this.clear(inscricaoE);
	}

	/**
	 * PT-BR: Gerar um número de inscrição estadual do Mato Grosso válido.
	 *
	 * EN: Generate a valid Mato Grosso state registration number.
	 *
	 * @returns PT-BR: O número de inscrição estadual gerado. EN: The generated state registration number.
	 *
	 * @example
	 * ```
	 * InscricaoEstadual.MT.generate(); // "00130000019"
	 * ```
	 */
	public static generate() {
		const baseNumerals = Random.generateRandomNumber(
			this.BASE_NUMERALS_LENGTH
		).toString();

		const verifierDigit = this.calculateVerifierDigit(baseNumerals);

		return baseNumerals + verifierDigit;
	}

	/**
	 * PT-BR: Gera um número de inscrição estadual do Mato Grosso válido e aleatório com máscara.
	 *
	 * EN: Generates a random valid Mato Grosso state registration number with mask.
	 *
	 * @returns PT-BR: O número de inscrição estadual gerado com máscara. EN: The generated state registration number with mask.
	 *
	 * @example
	 * ```
	 * InscricaoEstadual.MT.generateMasked(); // "0013000001-9"
	 * ```
	 */
	public static generateMasked() {
		return this.mask(this.generate());
	}

	private static clear(inscricaoE: any): string {
		return Transform.String.clearString(inscricaoE, ANY_NON_DIGIT_REGEX);
	}

	private static shouldHaveValidVerifierDigits(inscricaoE: string): boolean {
		const baseNumerals = this.getBaseNumerals(inscricaoE);

		const verifierDigit = this.calculateVerifierDigit(baseNumerals);

		return inscricaoE.endsWith(verifierDigit);
	}

	private static getBaseNumerals(inscricaoE: string): string {
		return inscricaoE.slice(this.BASE_NUMERALS_START, this.BASE_NUMERALS_END);
	}

	private static calculateVerifierDigit(baseNumerals: string): string {
		return ModAlg.calculateCheckDigit({
			modStrategy: "modComplement",
			modAlg: this.MOD_ALG,
			direction: "fromLeft",
			digits: baseNumerals,
			weights: this.VERIFIER_DIGIT_WEIGHTS,
		});
	}
}
