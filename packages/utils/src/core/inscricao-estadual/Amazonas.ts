import { ANY_NON_DIGIT_REGEX } from "@/helpers/Constants";
import { ModAlg } from "@/helpers/ModAlg";
import { Pipes, ValidationWorker } from "@/helpers/Pipes";
import { Transform } from "@/helpers/Transform";
import { Assert } from "@/helpers/Assert";
import { Random } from "@/helpers/Random";

export namespace InscricaoEstadual {
	export class Amazonas {
		private static readonly MOD_ALG = 11;

		private static readonly VALID_LENGTH = 9;
		private static readonly BASE_NUMERALS_LENGTH = 8;
		private static readonly BASE_NUMERALS_START = 0;
		private static readonly BASE_NUMERALS_END = 8;
		private static readonly FIRST_VERIFIER_DIGIT_WEIGHTS = [
			9, 8, 7, 6, 5, 4, 3, 2,
		];

		private static readonly FORMAT_REGEX = /^(\d{8})(\d{1})$/;
		private static readonly FORMAT_PATTERN = "$1-$2";

		private static readonly VALIDATION_RULES = [
			Assert.String.shouldBeDefined,
			Assert.String.shouldNotBeEmpty,
			(v) => Assert.String.shouldHaveLengthOf(v, this.VALID_LENGTH),
			(v) => Assert.String.shouldContainOnlyNumbers(v),
			this.shouldHaveValidVerifierDigits.bind(this),
		] satisfies ValidationWorker[];

		/**
		 * PT-BR: Verifica se uma inscrição estadual do Amazonas é válida.
		 *
		 * EN: Checks if an Amazonas state registration is valid.
		 *
		 * @param inscricaoE - PT-BR: A inscrição estadual. Com ou sem máscara. EN: The state registration. With or without mask.
		 * @returns PT-BR: `true` se a inscrição estadual for válida. EN: `true` if the state registration is valid.
		 *
		 * @example
		 * ```
		 * InscricaoEstadual.Amazonas.isValid("111117470"); // false
		 * InscricaoEstadual.Amazonas.isValid("855927470"); // true
		 * ```
		 */
		public static isValid(inscricaoE: any): boolean {
			const cleanedValue = Transform.clearString(
				inscricaoE,
				ANY_NON_DIGIT_REGEX
			);

			return Pipes.runValidations(cleanedValue, this.VALIDATION_RULES);
		}

		/**
		 * PT-BR: Máscara uma inscrição estadual do Amazonas.
		 *
		 * EN: Masks an Amazonas state registration.
		 *
		 * @param inscricaoE - PT-BR: A inscrição estadual. Com ou sem máscara. EN: The state registration. With or without mask.
		 * @returns PT-BR: A inscrição estadual mascarada. EN: The masked state registration.
		 *
		 * @example
		 * ```
		 * InscricaoEstadual.Amazonas.mask("855927470"); // "85.592.747-0"
		 * ```
		 */
		public static mask(inscricaoE: string) {
			return Transform.applyMask(
				inscricaoE,
				this.FORMAT_REGEX,
				this.FORMAT_PATTERN
			);
		}

		public static clear(inscricaoE: string) {
			return Transform.clearString(inscricaoE, ANY_NON_DIGIT_REGEX);
		}

		/**
		 * PT-BR: Gerar um número de inscrição estadual do Amazonas válido.
		 *
		 * EN: Generate a valid Amazonas state registration number.
		 *
		 * @returns PT-BR: O número de inscrição estadual gerado. EN: The generated state registration number.
		 *
		 * @example
		 * ```
		 * InscricaoEstadual.Amazonas.generate(); // "855927470"
		 * ```
		 */
		public static generate() {
			const baseNumerals = Random.generateRandomNumber(
				this.BASE_NUMERALS_LENGTH
			).toString();

			const firstVerifierDigit = this.calculateVerifierDigit(baseNumerals);

			return baseNumerals + firstVerifierDigit;
		}

		/**
		 * PT-BR: Gerar um número de inscrição estadual do Amazonas válido e aleatório.
		 *
		 * EN: Generate a valid and random Amazonas state registration number.
		 *
		 * @returns PT-BR: O número de inscrição estadual gerado com máscara. EN: The generated state registration number with mask.
		 *
		 * @example
		 * ```
		 * InscricaoEstadual.Amazonas.generateMasked(); // "85.592.747-0"
		 * ```
		 */
		public static generateMasked() {
			return this.mask(this.generate());
		}

		private static shouldHaveValidVerifierDigits(ie: string): boolean {
			const baseNumerals = this.getBaseNumerals(ie);

			const firstVerifierDigit = this.calculateVerifierDigit(baseNumerals);

			return ie.endsWith(firstVerifierDigit);
		}

		private static getBaseNumerals(ie: string): string {
			return ie.slice(this.BASE_NUMERALS_START, this.BASE_NUMERALS_END);
		}

		private static calculateVerifierDigit(baseNumerals: string): string {
			return ModAlg.calculateCheckDigit({
				modAlg: this.MOD_ALG,
				digits: baseNumerals,
				weights: this.FIRST_VERIFIER_DIGIT_WEIGHTS,
			});
		}
	}
}
