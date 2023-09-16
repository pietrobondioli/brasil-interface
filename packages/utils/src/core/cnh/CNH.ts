import { Assert } from "@/helpers/Assert";
import { ANY_NON_DIGIT_REGEX } from "@/helpers/Constants";
import { ModAlg } from "@/helpers/ModAlg";
import { Pipes, ValidationWorker } from "@/helpers/Pipes";
import { Random } from "@/helpers/Random";
import { Transform } from "@/helpers/Transform";

export class CNH {
	private static readonly MOD_ALG = 11;

	private static readonly LENGTH = 11;
	private static readonly BASE_NUMERALS_LENGTH = 9;
	private static readonly VERIFIER_DIGITS_LENGTH = 2;
	private static readonly BASE_NUMERALS_START = 0;
	private static readonly BASE_NUMERALS_END = 9;

	private static readonly FIRST_VERIFIER_DIGIT_WEIGHTS = [
		2, 3, 4, 5, 6, 7, 8, 9, 10,
	];
	private static readonly SECOND_VERIFIER_DIGIT_WEIGHTS = [
		2, 3, 4, 5, 6, 7, 8, 9, 10, 11,
	];

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

	private static readonly VALIDATION_RULES = [
		Assert.String.shouldBeDefined,
		Assert.String.shouldNotBeEmpty,
		(v) => Assert.String.shouldHaveLengthOf(v, this.LENGTH),
		(v) => Assert.String.shouldNotBeIn(v, this.BLACKLIST),
		this.shouldHaveValidVerifierDigits.bind(this),
	] satisfies ValidationWorker[];

	/**
	 * PT-BR: Verifica se um número de CNH é válido.
	 *
	 * EN: Checks if a CNH number is valid.
	 *
	 * @param cnh - PT-BR: O número de CNH. EN: The CNH number.
	 * @returns PT-BR: `true` se o número de CNH for válido. EN: `true` if the CNH number is valid.
	 *
	 * @example
	 * ```
	 * CNH.isValid("00000000000"); // false
	 * CNH.isValid("00000000192"); // false
	 * CNH.isValid("7603518447"); // false
	 * CNH.isValid("76035184470"); // true
	 * ```
	 */
	public static isValid(cnh: string): boolean {
		const transformedValue = this.clear(cnh);

		return Pipes.runValidations(transformedValue, this.VALIDATION_RULES);
	}

	/**
	 * PT-BR: Gera um número de CNH válido.
	 *
	 * EN: Generates a valid CNH number.
	 *
	 * @returns PT-BR: Um número de CNH válido. EN: A valid CNH number.
	 *
	 * @example
	 * ```
	 * CNH.generate(); // 76035184470
	 * ```
	 */
	public static generate(): string {
		const baseNumerals = Random.generateRandomNumber(
			this.BASE_NUMERALS_LENGTH
		).toString();

		const verifierDigits = this.calculateVerifierDigits(baseNumerals);

		return baseNumerals + verifierDigits;
	}

	private static clear(cnh: string | number): string {
		return Transform.clearString(cnh, ANY_NON_DIGIT_REGEX);
	}

	private static getBaseNumerals(digits: string): string {
		return digits.slice(this.BASE_NUMERALS_START, this.BASE_NUMERALS_END);
	}

	private static shouldHaveValidVerifierDigits(cnh: string): boolean {
		const baseNumerals = this.getBaseNumerals(cnh);

		const verifierDigits = this.calculateVerifierDigits(baseNumerals);

		return cnh.endsWith(verifierDigits);
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
			modAlg: this.MOD_ALG,
			digits: baseNumerals,
			weights: this.FIRST_VERIFIER_DIGIT_WEIGHTS,
		});
	}

	private static calculateSecondVerifierDigit(
		baseNumerals: string,
		firstVerifierDigit: string
	): string {
		return ModAlg.calculateCheckDigit({
			modAlg: this.MOD_ALG,
			digits: firstVerifierDigit + baseNumerals,
			weights: this.SECOND_VERIFIER_DIGIT_WEIGHTS,
		});
	}
}
