import { Assert } from "@/helpers/Assert";
import { ANY_NON_DIGIT_REGEX } from "@/helpers/Constants";
import { ModAlg } from "@/helpers/ModAlg";
import { Pipes, ValidationWorker } from "@/helpers/Pipes";
import { Random } from "@/helpers/Random";
import { Transform } from "@/helpers/Transform";

export class AC {
	private static readonly MOD_ALG = 11;

	private static readonly LENGTH = 13;
	private static readonly BASIC_NUMERALS_LENGTH = 11;
	private static readonly BASE_NUMERALS_START = 0;
	private static readonly BASE_NUMERALS_END = 11;
	private static readonly STARTS_WITH = "01";
	private static readonly FIRST_VERIFIER_DIGIT_WEIGHTS = [
		4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2,
	];
	private static readonly SECOND_VERIFIER_DIGIT_WEIGHTS = [
		5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2,
	];

	private static readonly MASK_REGEX = /^(\d{2})(\d{3})(\d{3})(\d{3})(\d{2})$/;
	private static readonly MASK_PATTERN = "$1.$2.$3/$4-$5";

	private static readonly VALIDATION_RULES = [
		Assert.String.isDefined,
		Assert.String.isNotEmpty,
		(v) => Assert.String.hasLengthOf(v, this.LENGTH),
		(v) => Assert.String.startsWith(v, this.STARTS_WITH),
		this.shouldHaveValidVerifierDigits.bind(this),
	] satisfies ValidationWorker[];

	/**
	 * PT-BR: Verifica se uma inscrição estadual do Acre é válida.
	 *
	 * EN: Checks if an Acre state registration is valid.
	 *
	 * @param inscricaoE - PT-BR: A inscrição estadual. Com ou sem máscara. EN: The state registration. With or without mask.
	 * @returns PT-BR: `true` se a inscrição estadual for válida. EN: `true` if the state registration is valid.
	 *
	 * @example
	 * ```
	 * InscricaoEstadual.AC.isValid("01.004.823/001-12"); // false
	 * InscricaoEstadual.AC.isValid("01.954.726/538-84"); // true
	 * InscricaoEstadual.AC.isValid("0100482300112"); // false
	 * InscricaoEstadual.AC.isValid("0195472653884"); // true
	 * ```
	 */
	public static isValid(inscricaoE: any): boolean {
		const transformedValue = this.clear(inscricaoE);

		return Pipes.runValidations(transformedValue, this.VALIDATION_RULES);
	}

	/**
	 * PT-BR: Máscara uma inscrição estadual do Acre.
	 *
	 * EN: Masks an Acre state registration.
	 *
	 * @param inscricaoE - PT-BR: A inscrição estadual. Com ou sem máscara. EN: The state registration. With or without mask.
	 * @returns PT-BR: A inscrição estadual mascarada. EN: The masked state registration.
	 *
	 * @example
	 * ```
	 * InscricaoEstadual.AC.mask("0195472653884"); // "01.954.726/538-84"
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
	 * PT-BR: Desmascara uma inscrição estadual do Acre.
	 *
	 * EN: Unmasks an Acre state registration.
	 *
	 * @param inscricaoE - PT-BR: A inscrição estadual. Com ou sem máscara. EN: The state registration. With or without mask.
	 * @returns PT-BR: A inscrição estadual desmascarada. EN: The unmasked state registration.
	 *
	 * @example
	 * ```
	 * InscricaoEstadual.AC.unmask("01.954.726/538-84"); // "0195472653884"
	 * ```
	 */
	public static unmask(inscricaoE: any): string {
		return this.clear(inscricaoE);
	}

	/**
	 * PT-BR: Gera um número de inscrição estadual do Acre válido e aleatório.
	 *
	 * EN: Generates a random valid Acre state registration number.
	 *
	 * @returns PT-BR: O número de inscrição estadual gerado. EN: The generated state registration number.
	 *
	 * @example
	 * ```
	 * InscricaoEstadual.AC.generate(); // "0195472653884"
	 * ```
	 */
	public static generate() {
		const BASE_NUMERALS_LENGTH =
			this.BASIC_NUMERALS_LENGTH - this.STARTS_WITH.length;
		const randomNumbers =
			Random.generateRandomNumber(BASE_NUMERALS_LENGTH).toString();

		const baseNumerals = this.STARTS_WITH + randomNumbers;

		const firstVerifierDigit = this.calculateFirstVerifierDigit(baseNumerals);
		const secondVerifierDigit = this.calculateSecondVerifierDigit(
			baseNumerals,
			firstVerifierDigit
		);

		return baseNumerals + firstVerifierDigit + secondVerifierDigit;
	}

	/**
	 * PT-BR: Gera um número de inscrição estadual do Acre válido, aleatório e com máscara.
	 *
	 * EN: Generates a random valid Acre state registration number with mask.
	 *
	 * @returns PT-BR: O número de inscrição estadual gerado com máscara. EN: The generated state registration number with mask.
	 *
	 * @example
	 * ```
	 * InscricaoEstadual.AC.generateMasked(); // "01.954.726/538-84"
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

		const firstVerifierDigit = this.calculateFirstVerifierDigit(baseNumerals);
		const secondVerifierDigit = this.calculateSecondVerifierDigit(
			baseNumerals,
			firstVerifierDigit
		);

		const verifierDigits = firstVerifierDigit + secondVerifierDigit;

		return inscricaoE.endsWith(verifierDigits);
	}

	private static getBaseNumerals(inscricaoE: string): string {
		return inscricaoE.slice(this.BASE_NUMERALS_START, this.BASE_NUMERALS_END);
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
