import { Assert } from "@/helpers/Assert";
import { ANY_NON_DIGIT_REGEX } from "@/helpers/Constants";
import { ModAlg } from "@/helpers/ModAlg";
import { Pipes, ValidationWorker } from "@/helpers/Pipes";
import { Random } from "@/helpers/Random";
import { Transform } from "@/helpers/Transform";

type Case = "case_1" | "case_2" | "case_3" | "case_4";

export class BA {
	private static readonly CASE_1_MOD_ALG = 10;
	private static readonly CASE_1_LENGTH = 8;
	private static readonly CASE_1_STARTS_WITH = [
		"0",
		"1",
		"2",
		"3",
		"4",
		"5",
		"8",
	];
	private static readonly CASE_1_BASE_NUMERALS_LENGTH = 6;
	private static readonly CASE_1_BASE_NUMERALS_START = 0;
	private static readonly CASE_1_BASE_NUMERALS_END = 6;
	private static readonly CASE_1_FIRST_VERIFIER_DIGIT_WEIGHTS = [
		8, 7, 6, 5, 4, 3, 2,
	];
	private static readonly CASE_1_SECOND_VERIFIER_DIGIT_WEIGHTS = [
		7, 6, 5, 4, 3, 2,
	];

	private static readonly CASE_2_MOD_ALG = 11;
	private static readonly CASE_2_LENGTH = 8;
	private static readonly CASE_2_STARTS_WITH = ["6", "7", "9"];
	private static readonly CASE_2_BASE_NUMERALS_LENGTH = 6;
	private static readonly CASE_2_BASE_NUMERALS_START = 0;
	private static readonly CASE_2_BASE_NUMERALS_END = 6;
	private static readonly CASE_2_FIRST_VERIFIER_DIGIT_WEIGHTS = [
		8, 7, 6, 5, 4, 3, 2,
	];
	private static readonly CASE_2_SECOND_VERIFIER_DIGIT_WEIGHTS = [
		7, 6, 5, 4, 3, 2,
	];

	private static readonly CASE_3_MOD_ALG = 10;
	private static readonly CASE_3_LENGTH = 9;
	private static readonly CASE_3_STARTS_WITH = [
		"0",
		"1",
		"2",
		"3",
		"4",
		"5",
		"8",
	];
	private static readonly CASE_3_BASE_NUMERALS_LENGTH = 7;
	private static readonly CASE_3_BASE_NUMERALS_START = 0;
	private static readonly CASE_3_BASE_NUMERALS_END = 7;
	private static readonly CASE_3_FIRST_VERIFIER_DIGIT_WEIGHTS = [
		9, 8, 7, 6, 5, 4, 3, 2,
	];
	private static readonly CASE_3_SECOND_VERIFIER_DIGIT_WEIGHTS = [
		8, 7, 6, 5, 4, 3, 2,
	];

	private static readonly CASE_4_MOD_ALG = 11;
	private static readonly CASE_4_LENGTH = 9;
	private static readonly CASE_4_STARTS_WITH = ["6", "7", "9"];
	private static readonly CASE_4_BASE_NUMERALS_LENGTH = 7;
	private static readonly CASE_4_BASE_NUMERALS_START = 0;
	private static readonly CASE_4_BASE_NUMERALS_END = 7;
	private static readonly CASE_4_FIRST_VERIFIER_DIGIT_WEIGHTS = [
		9, 8, 7, 6, 5, 4, 3, 2,
	];
	private static readonly CASE_4_SECOND_VERIFIER_DIGIT_WEIGHTS = [
		8, 7, 6, 5, 4, 3, 2,
	];

	private static readonly FORMAT_REGEX = /^(\d{6,7})(\d{2})$/;
	private static readonly FORMAT_PATTERN = "$1-$2";

	private static readonly VALIDATION_RULES = [
		Assert.String.isDefined,
		Assert.String.isNotEmpty,
		(v) =>
			Assert.String.hasLengthOf(v, this.CASE_1_LENGTH) ||
			Assert.String.hasLengthOf(v, this.CASE_2_LENGTH) ||
			Assert.String.hasLengthOf(v, this.CASE_3_LENGTH) ||
			Assert.String.hasLengthOf(v, this.CASE_4_LENGTH),
		(v) => Assert.String.containsOnlyNumbers(v),
		this.shouldHaveValidVerifierDigits.bind(this),
	] satisfies ValidationWorker[];

	/**
	 * PT-BR: Verifica se uma inscrição estadual da Bahia é válida.
	 *
	 * EN: Checks if a Bahia state registration is valid.
	 *
	 * @param inscricaoE - PT-BR: A inscrição estadual. Com ou sem máscara. EN: The state registration. With or without mask.
	 * @returns PT-BR: `true` se a inscrição estadual for válida. EN: `true` if the state registration is valid.
	 *
	 * @example
	 * ```
	 * InscricaoEstadual.BA.isValid("111117470"); // false
	 * InscricaoEstadual.BA.isValid("835368160"); // true
	 * ```
	 */
	public static isValid(inscricaoE: string): boolean {
		const cleanedValue = Transform.String.clearString(
			inscricaoE,
			ANY_NON_DIGIT_REGEX
		);

		return Pipes.runValidations(cleanedValue, this.VALIDATION_RULES);
	}

	/**
	 * PT-BR: Máscara uma inscrição estadual da Bahia.
	 *
	 * EN: Masks a Bahia state registration.
	 *
	 * @param inscricaoE - PT-BR: A inscrição estadual. Com ou sem máscara. EN: The state registration. With or without mask.
	 * @returns PT-BR: A inscrição estadual mascarada. EN: The masked state registration.
	 *
	 * @example
	 * ```
	 * InscricaoEstadual.BA.mask("835368160"); // "8353681-60"
	 * ```
	 */
	public static mask(inscricaoE: string) {
		return Transform.String.applyMask(
			inscricaoE,
			this.FORMAT_REGEX,
			this.FORMAT_PATTERN
		);
	}

	/**
	 * PT-BR: Desmascara uma inscrição estadual da Bahia.
	 *
	 * EN: Unmasks a Bahia state registration.
	 *
	 * @param inscricaoE - PT-BR: A inscrição estadual mascarada. EN: The masked state registration.
	 * @returns PT-BR: A inscrição estadual. EN: The state registration.
	 *
	 * @example
	 * ```
	 * InscricaoEstadual.BA.clear("8353681-60"); // "835368160"
	 * ```
	 */
	public static unmask(inscricaoE: string): string {
		return this.clear(inscricaoE);
	}

	/**
	 * PT-BR: Gera um número de inscrição estadual da Bahia válido.
	 *
	 * EN: Generates a valid Bahia state registration number.
	 *
	 * @returns PT-BR: Um número de inscrição estadual da Bahia válido. EN: A valid Bahia state registration number.
	 *
	 * @example
	 * ```
	 * InscricaoEstadual.BA.generate(); // "835368160"
	 * ```
	 */
	public static generate(): string {
		const case_ = Random.fromArray([
			"case_1",
			"case_2",
			"case_3",
			"case_4",
		] satisfies Case[]);

		const randomBaseNumerals = Random.generateRandomNumber(
			this.getBaseNumeralsLength(case_) - 1
		).toString();

		// Need to ensure that the generated number starts with a valid digit for the chosen case
		// É necessário garantir que o número gerado comece com um dígito válido para o caso escolhido
		const baseNumerals =
			Random.fromArray(this.getBaseStartsWith(case_)) + randomBaseNumerals;

		const verifierDigits = this.calculateVerifierDigits(baseNumerals, case_);

		return baseNumerals + verifierDigits;
	}

	/**
	 * PT-BR: Gera um número de inscrição estadual da Bahia válido com máscara.
	 *
	 * EN: Generates a valid masked Bahia state registration number.
	 *
	 * @returns PT-BR: Um número de inscrição estadual da Bahia válido com máscara. EN: A valid masked Bahia state registration number.
	 *
	 * @example
	 * ```
	 * InscricaoEstadual.BA.generateMasked(); // "8353681-60"
	 * ```
	 */
	public static generateMasked(): string {
		return this.mask(this.generate());
	}

	private static clear(inscricaoE: string): string {
		return Transform.String.clearString(inscricaoE, ANY_NON_DIGIT_REGEX);
	}

	private static shouldHaveValidVerifierDigits(inscricaoE: string): boolean {
		const cleanedValue = this.clear(inscricaoE);

		const case_ = this.getCase(cleanedValue);

		if (!case_) {
			return false;
		}

		const verifierDigits = this.calculateVerifierDigits(cleanedValue, case_);

		return inscricaoE.endsWith(verifierDigits);
	}

	private static getCase(inscricaoE: string): Case | null {
		const cleanedValue = this.clear(inscricaoE);

		if (cleanedValue.length === this.CASE_1_LENGTH) {
			if (Assert.Array.contains(cleanedValue[0], this.CASE_1_STARTS_WITH)) {
				return "case_1";
			}
		}

		if (cleanedValue.length === this.CASE_2_LENGTH) {
			if (Assert.Array.contains(cleanedValue[0], this.CASE_2_STARTS_WITH)) {
				return "case_2";
			}
		}

		if (cleanedValue.length === this.CASE_3_LENGTH) {
			if (Assert.Array.contains(cleanedValue[0], this.CASE_3_STARTS_WITH)) {
				return "case_3";
			}
		}

		if (cleanedValue.length === this.CASE_4_LENGTH) {
			if (Assert.Array.contains(cleanedValue[0], this.CASE_4_STARTS_WITH)) {
				return "case_4";
			}
		}

		return null;
	}

	private static getBaseNumerals(inscricaoE: string, case_: Case): string {
		switch (case_) {
			case "case_1":
				return inscricaoE.substring(
					this.CASE_1_BASE_NUMERALS_START,
					this.CASE_1_BASE_NUMERALS_END
				);
			case "case_2":
				return inscricaoE.substring(
					this.CASE_2_BASE_NUMERALS_START,
					this.CASE_2_BASE_NUMERALS_END
				);
			case "case_3":
				return inscricaoE.substring(
					this.CASE_3_BASE_NUMERALS_START,
					this.CASE_3_BASE_NUMERALS_END
				);
			case "case_4":
				return inscricaoE.substring(
					this.CASE_4_BASE_NUMERALS_START,
					this.CASE_4_BASE_NUMERALS_END
				);
		}
	}

	private static getBaseNumeralsLength(case_: Case): number {
		switch (case_) {
			case "case_1":
				return this.CASE_1_BASE_NUMERALS_LENGTH;
			case "case_2":
				return this.CASE_2_BASE_NUMERALS_LENGTH;
			case "case_3":
				return this.CASE_3_BASE_NUMERALS_LENGTH;
			case "case_4":
				return this.CASE_4_BASE_NUMERALS_LENGTH;
		}
	}

	private static getWeights(
		case_: Case,
		verifierDigit: "first" | "second"
	): number[] {
		switch (case_) {
			case "case_1":
				return verifierDigit === "first"
					? this.CASE_1_FIRST_VERIFIER_DIGIT_WEIGHTS
					: this.CASE_1_SECOND_VERIFIER_DIGIT_WEIGHTS;
			case "case_2":
				return verifierDigit === "first"
					? this.CASE_2_FIRST_VERIFIER_DIGIT_WEIGHTS
					: this.CASE_2_SECOND_VERIFIER_DIGIT_WEIGHTS;
			case "case_3":
				return verifierDigit === "first"
					? this.CASE_3_FIRST_VERIFIER_DIGIT_WEIGHTS
					: this.CASE_3_SECOND_VERIFIER_DIGIT_WEIGHTS;
			case "case_4":
				return verifierDigit === "first"
					? this.CASE_4_FIRST_VERIFIER_DIGIT_WEIGHTS
					: this.CASE_4_SECOND_VERIFIER_DIGIT_WEIGHTS;
		}
	}

	private static getModAlg(case_: Case): number {
		switch (case_) {
			case "case_1":
				return this.CASE_1_MOD_ALG;
			case "case_2":
				return this.CASE_2_MOD_ALG;
			case "case_3":
				return this.CASE_3_MOD_ALG;
			case "case_4":
				return this.CASE_4_MOD_ALG;
		}
	}

	private static getBaseStartsWith(case_: Case): string[] {
		switch (case_) {
			case "case_1":
				return this.CASE_1_STARTS_WITH;
			case "case_2":
				return this.CASE_2_STARTS_WITH;
			case "case_3":
				return this.CASE_3_STARTS_WITH;
			case "case_4":
				return this.CASE_4_STARTS_WITH;
		}
	}

	private static calculateVerifierDigits(
		inscricaoE: string,
		case_: Case
	): string {
		const baseNumerals = this.getBaseNumerals(inscricaoE, case_);

		const secondVerifierDigit = this.calculateSecondVerifierDigit(
			baseNumerals,
			case_
		);
		const firstVerifierDigit = this.calculateFirstVerifierDigit(
			baseNumerals,
			secondVerifierDigit,
			case_
		);

		return firstVerifierDigit + secondVerifierDigit;
	}

	private static calculateSecondVerifierDigit(
		baseNumerals: string,
		case_: Case
	): string {
		const weights = this.getWeights(case_, "second");
		const modAlg = this.getModAlg(case_);

		return ModAlg.calculateCheckDigit({
			modStrategy: "modComplement",
			modAlg,
			direction: "fromLeft",
			digits: baseNumerals,
			weights,
		});
	}

	private static calculateFirstVerifierDigit(
		baseNumerals: string,
		secondVerifierDigit: string,
		case_: Case
	): string {
		const weights = this.getWeights(case_, "first");
		const modAlg = this.getModAlg(case_);

		return ModAlg.calculateCheckDigit({
			modStrategy: "modComplement",
			modAlg,
			direction: "fromLeft",
			digits: baseNumerals + secondVerifierDigit,
			weights,
		});
	}
}
