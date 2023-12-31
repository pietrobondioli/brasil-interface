import { Assert } from "@/helpers/Assert";
import { ANY_NON_DIGIT_REGEX } from "@/helpers/Constants";
import { ModAlg } from "@/helpers/ModAlg";
import { Pipes, ValidationWorker } from "@/helpers/Pipes";
import { Random } from "@/helpers/Random";
import { Transform } from "@/helpers/Transform";

export class AP {
	private static readonly MOD_ALG = 11;

	private static readonly VALID_LENGTH = 9;
	private static readonly BASE_NUMERALS_START = 0;
	private static readonly BASE_NUMERALS_END = 8;
	private static readonly STARTS_WITH = "03";
	private static readonly VERIFIER_DIGIT_WEIGHTS = [9, 8, 7, 6, 5, 4, 3, 2];

	private static readonly FORMAT_REGEX = /^(\d{2})(\d{3})(\d{3})(\d{1})$/;
	private static readonly FORMAT_PATTERN = "$1.$2.$3-$4";

	private static readonly VALIDATION_RULES = [
		Assert.String.isDefined,
		Assert.String.isNotEmpty,
		(v) => Assert.String.hasLengthOf(v, this.VALID_LENGTH),
		(v) => Assert.String.startsWith(v, this.STARTS_WITH),
		(v) => Assert.String.containsOnlyNumbers(v),
		this.shouldHaveValidVerifierDigits.bind(this),
	] satisfies ValidationWorker[];

	/**
	 * PT-BR: Verifica se uma inscrição estadual do Amapá é válida.
	 *
	 * EN: Checks if an Amapá state registration is valid.
	 *
	 * @param inscricaoE - PT-BR: A inscrição estadual. Com ou sem máscara. EN: The state registration. With or without mask.
	 * @returns PT-BR: `true` se a inscrição estadual for válida. EN: `true` if the state registration is valid.
	 *
	 * @example
	 * ```
	 * InscricaoEstadual.AP.isValid("111117470"); // false
	 * InscricaoEstadual.AP.isValid("855927470"); // true
	 * ```
	 */
	public static isValid(inscricaoE: any): boolean {
		const cleanedValue = Transform.String.clearString(
			inscricaoE,
			ANY_NON_DIGIT_REGEX
		);

		return Pipes.runValidations(cleanedValue, this.VALIDATION_RULES);
	}

	/**
	 * PT-BR: Máscara uma inscrição estadual do Amapá.
	 *
	 * EN: Masks an Amapá state registration.
	 *
	 * @param inscricaoE - PT-BR: A inscrição estadual. Com ou sem máscara. EN: The state registration. With or without mask.
	 * @returns PT-BR: A inscrição estadual mascarada. EN: The masked state registration.
	 *
	 * @example
	 * ```
	 * InscricaoEstadual.AP.mask("855927470"); // "85.592.747-0"
	 * ```
	 */
	public static mask(inscricaoE: string) {
		return Transform.String.applyMask(
			inscricaoE,
			this.FORMAT_REGEX,
			this.FORMAT_PATTERN
		);
	}

	public static clear(inscricaoE: string) {
		return Transform.String.clearString(inscricaoE, ANY_NON_DIGIT_REGEX);
	}

	/**
	 * PT-BR: Gerar um número de inscrição estadual do Amapá válido.
	 *
	 * EN: Generate a valid Amapá state registration number.
	 *
	 * @returns PT-BR: O número de inscrição estadual gerado. EN: The generated state registration number.
	 *
	 * @example
	 * ```
	 * InscricaoEstadual.AP.generate(); // "855927470"
	 * ```
	 */
	public static generate() {
		const BASE_NUMERALS_LENGTH = 8 - this.STARTS_WITH.length;
		const randomNumbers =
			Random.generateRandomNumber(BASE_NUMERALS_LENGTH).toString();

		const baseNumerals = this.STARTS_WITH + randomNumbers;

		const firstVerifierDigit = this.calculateVerifierDigit(baseNumerals);

		return baseNumerals + firstVerifierDigit;
	}

	/**
	 * PT-BR: Gerar um número de inscrição estadual do Amapá válido, aleatório e com máscara.
	 *
	 * EN: Generate a valid, random and masked Amapá state registration number.
	 *
	 * @returns PT-BR: O número de inscrição estadual gerado com máscara. EN: The generated state registration number with mask.
	 *
	 * @example
	 * ```
	 * InscricaoEstadual.AP.generateMasked(); // "85.592.747-0"
	 * ```
	 */
	public static generateMasked() {
		return this.mask(this.generate());
	}

	private static shouldHaveValidVerifierDigits(inscricaoE: string): boolean {
		const baseNumerals = this.getBaseNumerals(inscricaoE);

		const firstVerifierDigit = this.calculateVerifierDigit(baseNumerals);

		return inscricaoE.endsWith(firstVerifierDigit);
	}

	private static getBaseNumerals(inscricaoE: string): string {
		return inscricaoE.slice(this.BASE_NUMERALS_START, this.BASE_NUMERALS_END);
	}

	private static calculateVerifierDigit(baseNumerals: string): string {
		let P = 0;
		let D = 0;

		if (Assert.Number.isWithinRange(Number(baseNumerals), 3000001, 3017000)) {
			P = 5;
			D = 0;
		} else if (
			Assert.Number.isWithinRange(Number(baseNumerals), 3017001, 3019022)
		) {
			P = 9;
			D = 1;
		} else if (
			Assert.Number.isWithinRange(Number(baseNumerals), 3019023, 3019999)
		) {
			P = 0;
			D = 0;
		}

		return ModAlg.calculateCheckDigit({
			modStrategy: "modComplement",
			modAlg: this.MOD_ALG,
			direction: "fromLeft",
			digits: baseNumerals,
			weights: this.VERIFIER_DIGIT_WEIGHTS,
			transformSum: (sum) => sum + P,
			transform: {
				10: "0",
				11: D.toString(),
			},
		});
	}
}
