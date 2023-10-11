import { Assert } from "@/helpers/Assert";
import { ANY_NON_DIGIT_REGEX } from "@/helpers/Constants";
import { ModAlg } from "@/helpers/ModAlg";
import { Pipes, ValidationWorker } from "@/helpers/Pipes";
import { Random } from "@/helpers/Random";
import { Transform } from "@/helpers/Transform";

export namespace InscricaoEstadual {
	export class AM {
		private static readonly MOD_ALG = 11;

		private static readonly VALID_LENGTH = 9;
		private static readonly BASE_NUMERALS_LENGTH = 8;
		private static readonly BASE_NUMERALS_START = 0;
		private static readonly BASE_NUMERALS_END = 8;
		private static readonly VERIFIER_DIGIT_WEIGHTS = [9, 8, 7, 6, 5, 4, 3, 2];

		private static readonly FORMAT_REGEX = /^(\d{8})(\d{1})$/;
		private static readonly FORMAT_PATTERN = "$1-$2";

		private static readonly VALIDATION_RULES = [
			Assert.String.isDefined,
			Assert.String.isNotEmpty,
			(v) => Assert.String.hasLengthOf(v, this.VALID_LENGTH),
			(v) => Assert.String.containsOnlyNumbers(v),
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
		 * InscricaoEstadual.AM.isValid("111117470"); // false
		 * InscricaoEstadual.AM.isValid("855927470"); // true
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
		 * PT-BR: Máscara uma inscrição estadual do Amazonas.
		 *
		 * EN: Masks an Amazonas state registration.
		 *
		 * @param inscricaoE - PT-BR: A inscrição estadual. Com ou sem máscara. EN: The state registration. With or without mask.
		 * @returns PT-BR: A inscrição estadual mascarada. EN: The masked state registration.
		 *
		 * @example
		 * ```
		 * InscricaoEstadual.AM.mask("855927470"); // "85.592.747-0"
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
		 * PT-BR: Desmascara uma inscrição estadual do Amazonas.
		 *
		 * EN: Unmasks an Amazonas state registration.
		 *
		 * @param inscricaoE - PT-BR: A inscrição estadual. Com ou sem máscara. EN: The state registration. With or without mask.
		 * @returns PT-BR: A inscrição estadual desmascarada. EN: The unmasked state registration.
		 *
		 * @example
		 * ```
		 * InscricaoEstadual.AM.unmask("85592747-0"); // "855927470"
		 * ```
		 */
		public static unmask(inscricaoE: any): string {
			return this.clear(inscricaoE);
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
		 * InscricaoEstadual.AM.generate(); // "855927470"
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
		 * InscricaoEstadual.AM.generateMasked(); // "85.592.747-0"
		 * ```
		 */
		public static generateMasked() {
			return this.mask(this.generate());
		}

		private static clear(inscricaoE: string) {
			return Transform.String.clearString(inscricaoE, ANY_NON_DIGIT_REGEX);
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
			return ModAlg.calculateCheckDigit({
				modStrategy: "modComplement",
				modAlg: this.MOD_ALG,
				direction: "fromLeft",
				digits: baseNumerals,
				weights: this.VERIFIER_DIGIT_WEIGHTS,
			});
		}
	}
}
