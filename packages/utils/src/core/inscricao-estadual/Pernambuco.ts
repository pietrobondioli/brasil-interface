import { ANY_NON_DIGIT_REGEX } from "@/helpers/Constants";
import { ModAlg } from "@/helpers/ModAlg";
import { Pipes, ValidationWorker } from "@/helpers/Pipes";
import { Random } from "@/helpers/Random";
import { Transform } from "@/helpers/Transform";
import { Assert } from "@/helpers/Assert";

export namespace InscricaoEstadual {
	export class Pernambuco {
		private static readonly MOD_ALG = 11;

		private static readonly LENGTH = 9;
		private static readonly BASE_NUMERALS_LENGTH = 7;
		private static readonly BASE_NUMERALS_START = 0;
		private static readonly BASE_NUMERALS_END = 7;
		private static readonly FIRST_VERIFIER_DIGIT_WEIGHTS = [
			8, 7, 6, 5, 4, 3, 2,
		];
		private static readonly SECOND_VERIFIER_DIGIT_WEIGHTS = [
			9, 8, 7, 6, 5, 4, 3, 2,
		];

		private static readonly MASK_REGEX = /^(\d{7})(\d{2})$/;
		private static readonly MASK_PATTERN = "$1-$2";

		private static readonly VALIDATION_RULES = [
			Assert.String.shouldBeDefined,
			Assert.String.shouldNotBeEmpty,
			(v) => Assert.String.shouldHaveLengthOf(v, this.LENGTH),
			this.shouldHaveValidVerifierDigits.bind(this),
		] satisfies ValidationWorker[];

		/**
		 * PT-BR: Verifica se uma inscrição estadual do Pernambuco é válida.
		 *
		 * EN: Checks if an Pernambuco state registration is valid.
		 *
		 * @param inscricaoE - PT-BR: A inscrição estadual. Com ou sem máscara. EN: The state registration. With or without mask.
		 * @returns PT-BR: `true` se a inscrição estadual for válida. EN: `true` if the state registration is valid.
		 *
		 * @example
		 * ```
		 * InscricaoEstadual.Pernambuco.isValid("111.11583-00"); // false
		 * InscricaoEstadual.Pernambuco.isValid("292.33583-00"); // true
		 * InscricaoEstadual.Pernambuco.isValid("1111158300"); // false
		 * InscricaoEstadual.Pernambuco.isValid("2923358300"); // true
		 * ```
		 */
		public static isValid(inscricaoE: any): boolean {
			const transformedValue = this.clear(inscricaoE);

			return Pipes.runValidations(transformedValue, this.VALIDATION_RULES);
		}

		/**
		 * PT-BR: Máscara uma inscrição estadual do Pernambuco.
		 *
		 * EN: Masks an Pernambuco state registration.
		 *
		 * @param inscricaoE - PT-BR: A inscrição estadual. Com ou sem máscara. EN: The state registration. With or without mask.
		 * @returns PT-BR: A inscrição estadual mascarada. EN: The masked state registration.
		 *
		 * @example
		 * ```
		 * InscricaoEstadual.Pernambuco.mask("2923358300"); // "292.33583-00"
		 * ```
		 */
		public static mask(inscricaoE: any): string {
			const cleanedValue = this.clear(inscricaoE);

			return Transform.applyMask(
				cleanedValue,
				this.MASK_REGEX,
				this.MASK_PATTERN
			);
		}

		/**
		 * PT-BR: Desmascara uma inscrição estadual do Pernambuco.
		 *
		 * EN: Unmasks an Pernambuco state registration.
		 *
		 * @param inscricaoE - PT-BR: A inscrição estadual. Com ou sem máscara. EN: The state registration. With or without mask.
		 * @returns PT-BR: A inscrição estadual desmascarada. EN: The unmasked state registration.
		 *
		 * @example
		 * ```
		 * InscricaoEstadual.Pernambuco.unmask("292.33583-00"); // "2923358300"
		 * ```
		 */
		public static unmask(inscricaoE: any): string {
			return this.clear(inscricaoE);
		}

		/**
		 * PT-BR: Gera um número de inscrição estadual do Pernambuco válido e aleatório.
		 *
		 * EN: Generates a random valid Pernambuco state registration number.
		 *
		 * @returns PT-BR: O número de inscrição estadual gerado. EN: The generated state registration number.
		 *
		 * @example
		 * ```
		 * InscricaoEstadual.Pernambuco.generate(); // "2923358300"
		 * ```
		 */
		public static generate() {
			const baseNumerals = Random.generateRandomNumber(
				this.BASE_NUMERALS_LENGTH
			).toString();

			const verifierDigits = this.calculateVerifierDigits(baseNumerals);

			return baseNumerals + verifierDigits;
		}

		/**
		 * PT-BR: Gera um número de inscrição estadual do Pernambuco válido e aleatório com máscara.
		 *
		 * EN: Generates a random valid Pernambuco state registration number with mask.
		 *
		 * @returns PT-BR: O número de inscrição estadual gerado com máscara. EN: The generated state registration number with mask.
		 *
		 * @example
		 * ```
		 * InscricaoEstadual.Pernambuco.generateMasked(); // "292.33583-00"
		 * ```
		 */
		public static generateMasked() {
			return this.mask(this.generate());
		}

		private static clear(inscricaoE: any): string {
			return Transform.clearString(inscricaoE, ANY_NON_DIGIT_REGEX);
		}

		private static shouldHaveValidVerifierDigits(inscricaoE: string): boolean {
			const baseNumerals = this.getBaseNumerals(inscricaoE);

			const verifierDigit = this.calculateVerifierDigits(baseNumerals);

			return inscricaoE.endsWith(verifierDigit);
		}

		private static getBaseNumerals(inscricaoE: string): string {
			return inscricaoE.slice(this.BASE_NUMERALS_START, this.BASE_NUMERALS_END);
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
}
