import { ANY_NON_DIGIT_REGEX } from "@/helpers/Constants";
import { ModAlg } from "@/helpers/ModAlg";
import { Pipes, ValidationWorker } from "@/helpers/Pipes";
import { Transform } from "@/helpers/Transform";
import { Assert } from "@/helpers/Assert";
import { Random } from "@/helpers/Random";

export namespace InscricaoEstadual {
	export class Rondonia {
		private static readonly MOD_ALG = 11;

		private static readonly VALID_LENGTH = 14;
		private static readonly BASE_NUMERALS_LENGTH = 13;
		private static readonly BASE_NUMERALS_START = 0;
		private static readonly BASE_NUMERALS_END = 13;
		private static readonly VERIFIER_DIGIT_WEIGHTS = [
			6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2,
		];

		private static readonly MASK_REGEX = /^(\d{13})(\d{1})$/;
		private static readonly MASK_PATTERN = "$1-$2";

		private static readonly VALIDATION_RULES = [
			Assert.String.isDefined,
			Assert.String.isNotEmpty,
			(v) => Assert.String.hasLengthOf(v, this.VALID_LENGTH),
			(v) => Assert.String.containsOnlyNumbers(v),
			this.shouldHaveValidVerifierDigits.bind(this),
		] satisfies ValidationWorker[];

		/**
		 * PT-BR: Verifica se uma inscrição estadual de Rondônia é válida.
		 *
		 * EN: Checks if an Rondônia state registration is valid.
		 *
		 * @param inscricaoE - PT-BR: A inscrição estadual. Com ou sem máscara. EN: The state registration. With or without mask.
		 * @returns PT-BR: `true` se a inscrição estadual for válida. EN: `true` if the state registration is valid.
		 *
		 * @example
		 * ```
		 * InscricaoEstadual.Rondonia.isValid("11111958422341"); // false
		 * InscricaoEstadual.Rondonia.isValid("20811958422341"); // true
		 * ```
		 */
		public static isValid(inscricaoE: any): boolean {
			const cleanedValue = this.clear(inscricaoE);

			return Pipes.runValidations(cleanedValue, this.VALIDATION_RULES);
		}

		/**
		 * PT-BR: Máscara uma inscrição estadual de Rondônia.
		 *
		 * EN: Masks an Rondônia state registration.
		 *
		 * @param inscricaoE - PT-BR: A inscrição estadual. Com ou sem máscara. EN: The state registration. With or without mask.
		 * @returns PT-BR: A inscrição estadual mascarada. EN: The masked state registration.
		 *
		 * @example
		 * ```
		 * InscricaoEstadual.Rondonia.mask("20811958422341"); // "2081195842234-1"
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
		 * PT-BR: Desmascara uma inscrição estadual de Rondônia.
		 *
		 * EN: Unmasks an Rondônia state registration.
		 *
		 * @param inscricaoE - PT-BR: A inscrição estadual. Com ou sem máscara. EN: The state registration. With or without mask.
		 * @returns PT-BR: A inscrição estadual desmascarada. EN: The unmasked state registration.
		 *
		 * @example
		 * ```
		 * InscricaoEstadual.Rondonia.unmask("2081195842234-1"); // "20811958422341"
		 * ```
		 */
		public static unmask(inscricaoE: any): string {
			return this.clear(inscricaoE);
		}

		/**
		 * PT-BR: Gerar um número de inscrição estadual de Rondônia válido.
		 *
		 * EN: Generate a valid Rondônia state registration number.
		 *
		 * @returns PT-BR: O número de inscrição estadual gerado. EN: The generated state registration number.
		 *
		 * @example
		 * ```
		 * InscricaoEstadual.Rondonia.generate(); // "20811958422341"
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
		 * PT-BR: Gera um número de inscrição estadual de Rondônia válido e aleatório com máscara.
		 *
		 * EN: Generates a random valid Rondônia state registration number with mask.
		 *
		 * @returns PT-BR: O número de inscrição estadual gerado com máscara. EN: The generated state registration number with mask.
		 *
		 * @example
		 * ```
		 * InscricaoEstadual.Rondonia.generateMasked(); // "2081195842234-1"
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
}
