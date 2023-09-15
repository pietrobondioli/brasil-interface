import { ANY_NON_DIGIT_REGEX } from "@/helpers/Constants";
import { Mod11Alg } from "@/helpers/Mod11Alg";
import { Pipes, ValidationWorker } from "@/helpers/Pipes";
import { Random } from "@/helpers/Random";
import { Transform } from "@/helpers/Transform";
import { Assert } from "@/helpers/Assert";

export namespace InscricaoEstadual {
	export class Acre {
		private static readonly VALID_LENGTH = 13;
		private static readonly BASE_NUMERALS_START = 0;
		private static readonly BASE_NUMERALS_END = 11;
		private static readonly STARTS_WITH = "01";
		private static readonly FIRST_VERIFIER_DIGIT_WEIGHTS = [
			4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2,
		];
		private static readonly SECOND_VERIFIER_DIGIT_WEIGHTS = [
			5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2,
		];

		private static readonly FORMAT_REGEX =
			/^(\d{2})(\d{3})(\d{3})(\d{3})(\d{2})$/;
		private static readonly FORMAT_PATTERN = "$1.$2.$3/$4-$5";

		private static readonly VALIDATION_RULES = [
			Assert.String.shouldBeDefined,
			Assert.String.shouldNotBeEmpty,
			(v) => Assert.String.shouldHaveLengthOf(v, this.VALID_LENGTH),
			(v) => Assert.String.shouldStartWith(v, this.STARTS_WITH),
			this.shouldHaveValidVerifierDigits.bind(this),
		] satisfies ValidationWorker[];

		/**
		 * PT-BR: Verifica se uma inscrição estadual do Acre é válida.
		 *
		 * EN: Checks if an Acre state registration is valid.
		 *
		 * @param value - PT-BR: A inscrição estadual. Com ou sem máscara. EN: The state registration. With or without mask.
		 * @returns PT-BR: `true` se a inscrição estadual for válida. EN: `true` if the state registration is valid.
		 *
		 * @example
		 * ```
		 * InscricaoEstadual.Acre.isValid("01.004.823/001-12"); // false
		 * InscricaoEstadual.Acre.isValid("01.954.726/538-84"); // true
		 * InscricaoEstadual.Acre.isValid("0100482300112"); // false
		 * InscricaoEstadual.Acre.isValid("0195472653884"); // true
		 * ```
		 */
		public static isValid(value: any): boolean {
			const transformedValue = this.clear(value);

			return Pipes.runValidations(transformedValue, this.VALIDATION_RULES);
		}

		/**
		 * PT-BR: Máscara uma inscrição estadual do Acre.
		 *
		 * EN: Masks an Acre state registration.
		 *
		 * @param value - PT-BR: A inscrição estadual. Com ou sem máscara. EN: The state registration. With or without mask.
		 * @returns PT-BR: A inscrição estadual mascarada. EN: The masked state registration.
		 *
		 * @example
		 * ```
		 * InscricaoEstadual.Acre.mask("0195472653884"); // "01.954.726/538-84"
		 * ```
		 */
		public static mask(value: any): string {
			const cleanedValue = this.clear(value);

			return Transform.applyMask(
				cleanedValue,
				this.FORMAT_REGEX,
				this.FORMAT_PATTERN
			);
		}

		public static unmask(value: any): string {
			return Transform.clearString(value, ANY_NON_DIGIT_REGEX);
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
		 * InscricaoEstadual.Acre.generate(); // "0195472653884"
		 * ```
		 */
		public static generate() {
			const BASE_NUMERALS_LENGTH = 11 - this.STARTS_WITH.length;
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
		 * InscricaoEstadual.Acre.generateMasked(); // "01.954.726/538-84"
		 * ```
		 */
		public static generateMasked() {
			return this.mask(this.generate());
		}

		private static clear(value: any): string {
			return Transform.clearString(value, ANY_NON_DIGIT_REGEX);
		}

		private static shouldHaveValidVerifierDigits(ie: string): boolean {
			const baseNumerals = this.getBaseNumerals(ie);

			const firstVerifierDigit = this.calculateFirstVerifierDigit(baseNumerals);
			const secondVerifierDigit = this.calculateSecondVerifierDigit(
				baseNumerals,
				firstVerifierDigit
			);

			const verifierDigits = firstVerifierDigit + secondVerifierDigit;

			return ie.endsWith(verifierDigits);
		}

		private static getBaseNumerals(ie: string): string {
			return ie.slice(this.BASE_NUMERALS_START, this.BASE_NUMERALS_END);
		}

		private static calculateFirstVerifierDigit(baseNumerals: string): string {
			return Mod11Alg.calculateCheckDigit({
				digits: baseNumerals,
				weights: this.FIRST_VERIFIER_DIGIT_WEIGHTS,
			});
		}

		private static calculateSecondVerifierDigit(
			baseNumerals: string,
			firstVerifierDigit: string
		): string {
			return Mod11Alg.calculateCheckDigit({
				digits: baseNumerals + firstVerifierDigit,
				weights: this.SECOND_VERIFIER_DIGIT_WEIGHTS,
			});
		}
	}
}
