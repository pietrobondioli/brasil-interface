import { Assert } from "@/helpers/Assert";
import { ANY_NON_DIGIT_REGEX } from "@/helpers/Constants";
import { ModAlg } from "@/helpers/ModAlg";
import { Pipes, ValidationWorker } from "@/helpers/Pipes";
import { Random } from "@/helpers/Random";
import { Transform } from "@/helpers/Transform";

export class MS {
	private static readonly MOD_ALG = 11;

	private static readonly VALID_LENGTH = 9;
	private static readonly BASE_NUMERALS_LENGTH = 8;
	private static readonly BASE_NUMERALS_START = 0;
	private static readonly BASE_NUMERALS_END = 8;
	private static readonly STARTS_WITH = "28";
	private static readonly VERIFIER_DIGIT_WEIGHTS = [9, 8, 7, 6, 5, 4, 3, 2];

	private static readonly MASK_REGEX = /^(\d{8})(\d{1})$/;
	private static readonly MASK_PATTERN = "$1-$2";

	private static readonly VALIDATION_RULES = [
		Assert.String.isDefined,
		Assert.String.isNotEmpty,
		(v) => Assert.String.hasLengthOf(v, this.VALID_LENGTH),
		(v) => Assert.String.startsWith(v, this.STARTS_WITH),
		(v) => Assert.String.containsOnlyNumbers(v),
		this.shouldHaveValidVerifierDigits.bind(this),
	] satisfies ValidationWorker[];

	/**
	 * PT-BR: Verifica se uma inscrição estadual do Mato Grosso do Sul é válida.
	 *
	 * EN: Checks if an Mato Grosso do Sul state registration is valid.
	 *
	 * @param inscricaoE - PT-BR: A inscrição estadual. Com ou sem máscara. EN: The state registration. With or without mask.
	 * @returns PT-BR: `true` se a inscrição estadual for válida. EN: `true` if the state registration is valid.
	 *
	 * @example
	 * ```
	 * InscricaoEstadual.MS.isValid("1111110310"); // false
	 * InscricaoEstadual.MS.isValid("301188327"); // true
	 * ```
	 */
	public static isValid(inscricaoE: any): boolean {
		const cleanedValue = this.clear(inscricaoE);

		return Pipes.runValidations(cleanedValue, this.VALIDATION_RULES);
	}

	/**
	 * PT-BR: Máscara uma inscrição estadual do Mato Grosso do Sul.
	 *
	 * EN: Masks an Mato Grosso do Sul state registration.
	 *
	 * @param inscricaoE - PT-BR: A inscrição estadual. Com ou sem máscara. EN: The state registration. With or without mask.
	 * @returns PT-BR: A inscrição estadual mascarada. EN: The masked state registration.
	 *
	 * @example
	 * ```
	 * InscricaoEstadual.MS.mask("301188327"); // "30118832-7"
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
	 * PT-BR: Desmascara uma inscrição estadual do Mato Grosso do Sul.
	 *
	 * EN: Unmasks an Mato Grosso do Sul state registration.
	 *
	 * @param inscricaoE - PT-BR: A inscrição estadual. Com ou sem máscara. EN: The state registration. With or without mask.
	 * @returns PT-BR: A inscrição estadual desmascarada. EN: The unmasked state registration.
	 *
	 * @example
	 * ```
	 * InscricaoEstadual.MS.unmask("30118832-7"); // "301188327"
	 * ```
	 */
	public static unmask(inscricaoE: any): string {
		return this.clear(inscricaoE);
	}

	/**
	 * PT-BR: Gerar um número de inscrição estadual do Mato Grosso do Sul válido.
	 *
	 * EN: Generate a valid Mato Grosso do Sul state registration number.
	 *
	 * @returns PT-BR: O número de inscrição estadual gerado. EN: The generated state registration number.
	 *
	 * @example
	 * ```
	 * InscricaoEstadual.MS.generate(); // "301188327"
	 * ```
	 */
	public static generate() {
		const randomBaseNumerals = Random.generateRandomNumber(
			this.BASE_NUMERALS_LENGTH - 2
		).toString();

		// Ensure that the generated number starts with the correct digits
		// Assegura que o número gerado comece com os dígitos corretos
		const baseNumerals = this.STARTS_WITH + randomBaseNumerals;

		const verifierDigit = this.calculateVerifierDigit(baseNumerals);

		return baseNumerals + verifierDigit;
	}

	/**
	 * PT-BR: Gera um número de inscrição estadual do Mato Grosso do Sul válido e aleatório com máscara.
	 *
	 * EN: Generates a random valid Mato Grosso do Sul state registration number with mask.
	 *
	 * @returns PT-BR: O número de inscrição estadual gerado com máscara. EN: The generated state registration number with mask.
	 *
	 * @example
	 * ```
	 * InscricaoEstadual.MS.generateMasked(); // "30118832-7"
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
