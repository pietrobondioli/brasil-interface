import { Assert } from "@/helpers/Assert";
import { ANY_NON_DIGIT_REGEX } from "@/helpers/Constants";
import { ModAlg } from "@/helpers/ModAlg";
import { Pipes, ValidationWorker } from "@/helpers/Pipes";
import { Random } from "@/helpers/Random";
import { Transform } from "@/helpers/Transform";

export class AL {
	private static readonly MOD_ALG = 11;

	private static readonly VALID_LENGTH = 9;
	private static readonly BASE_NUMERALS_START = 0;
	private static readonly BASE_NUMERALS_END = 8;
	private static readonly STARTS_WITH = "24";
	private static readonly VERIFIER_DIGIT_WEIGHTS = [9, 8, 7, 6, 5, 4, 3, 2];

	private static readonly VALIDATION_RULES = [
		Assert.String.isDefined,
		Assert.String.isNotEmpty,
		(v) => Assert.String.hasLengthOf(v, this.VALID_LENGTH),
		(v) => Assert.String.startsWith(v, this.STARTS_WITH),
		(v) => Assert.String.containsOnlyNumbers(v),
		this.shouldHaveValidVerifierDigits.bind(this),
	] satisfies ValidationWorker[];

	/**
	 * PT-BR: Verifica se uma inscrição estadual de Alagoas é válida.
	 *
	 * EN: Checks if an Alagoas state registration is valid.
	 *
	 * @param inscricaoE - PT-BR: A inscrição estadual. Com ou sem máscara. EN: The state registration. With or without mask.
	 * @returns PT-BR: `true` se a inscrição estadual for válida. EN: `true` if the state registration is valid.
	 *
	 * @example
	 * ```
	 * InscricaoEstadual.AL.isValid("1111110310"); // false
	 * InscricaoEstadual.AL.isValid("2483730310"); // true
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
	 * PT-BR: Gerar um número de inscrição estadual de Alagoas válido.
	 *
	 * EN: Generate a valid Alagoas state registration number.
	 *
	 * @returns PT-BR: O número de inscrição estadual gerado. EN: The generated state registration number.
	 *
	 * @example
	 * ```
	 * InscricaoEstadual.AL.generate(); // "2483730310"
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
