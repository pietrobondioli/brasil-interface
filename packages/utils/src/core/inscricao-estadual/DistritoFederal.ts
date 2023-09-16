import { ANY_NON_DIGIT_REGEX } from "@/helpers/Constants";
import { ModAlg } from "@/helpers/ModAlg";
import { Pipes, ValidationWorker } from "@/helpers/Pipes";
import { Random } from "@/helpers/Random";
import { Transform } from "@/helpers/Transform";
import { Assert } from "@/helpers/Assert";

export namespace InscricaoEstadual {
	export class DistritoFederal {
		private static readonly MOD_ALG = 11;

		private static readonly LENGTH = 13;
		private static readonly BASE_NUMERALS_LENGTH = 11;
		private static readonly BASE_NUMERALS_START = 0;
		private static readonly BASE_NUMERALS_END = 11;
		private static readonly FIRST_VERIFIER_DIGIT_WEIGHTS = [
			4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2,
		];
		private static readonly SECOND_VERIFIER_DIGIT_WEIGHTS = [
			5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3,
		];

		private static readonly MASK_REGEX = /^(\d{11})(\d{2})$/;
		private static readonly MASK_PATTERN = "$1-$2";

		private static readonly VALIDATION_RULES = [
			Assert.String.shouldBeDefined,
			Assert.String.shouldNotBeEmpty,
			(v) => Assert.String.shouldHaveLengthOf(v, this.LENGTH),
			this.shouldHaveValidVerifierDigits.bind(this),
		] satisfies ValidationWorker[];

		/**
		 * PT-BR: Verifica se uma inscrição estadual do Distrito Federal é válida.
		 *
		 * EN: Checks if an Distrito Federal state registration is valid.
		 *
		 * @param inscricaoE - PT-BR: A inscrição estadual. Com ou sem máscara. EN: The state registration. With or without mask.
		 * @returns PT-BR: `true` se a inscrição estadual for válida. EN: `true` if the state registration is valid.
		 *
		 * @example
		 * ```
		 * InscricaoEstadual.DistritoFederal.isValid("11111111001-53"); // false
		 * InscricaoEstadual.DistritoFederal.isValid("07985681001-53"); // true
		 * InscricaoEstadual.DistritoFederal.isValid("1111111100153"); // false
		 * InscricaoEstadual.DistritoFederal.isValid("0798568100153"); // true
		 * ```
		 */
		public static isValid(inscricaoE: any): boolean {
			const transformedValue = this.clear(inscricaoE);

			return Pipes.runValidations(transformedValue, this.VALIDATION_RULES);
		}

		/**
		 * PT-BR: Máscara uma inscrição estadual do Distrito Federal.
		 *
		 * EN: Masks an Distrito Federal state registration.
		 *
		 * @param inscricaoE - PT-BR: A inscrição estadual. Com ou sem máscara. EN: The state registration. With or without mask.
		 * @returns PT-BR: A inscrição estadual mascarada. EN: The masked state registration.
		 *
		 * @example
		 * ```
		 * InscricaoEstadual.DistritoFederal.mask("0798568100153"); // "07985681001-53"
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
		 * PT-BR: Desmascara uma inscrição estadual do Distrito Federal.
		 *
		 * EN: Unmasks an Distrito Federal state registration.
		 *
		 * @param inscricaoE - PT-BR: A inscrição estadual. Com ou sem máscara. EN: The state registration. With or without mask.
		 * @returns PT-BR: A inscrição estadual desmascarada. EN: The unmasked state registration.
		 *
		 * @example
		 * ```
		 * InscricaoEstadual.DistritoFederal.unmask("07985681001-53"); // "0798568100153"
		 * ```
		 */
		public static unmask(inscricaoE: any): string {
			return this.clear(inscricaoE);
		}

		/**
		 * PT-BR: Gera um número de inscrição estadual do Distrito Federal válido e aleatório.
		 *
		 * EN: Generates a random valid Distrito Federal state registration number.
		 *
		 * @returns PT-BR: O número de inscrição estadual gerado. EN: The generated state registration number.
		 *
		 * @example
		 * ```
		 * InscricaoEstadual.DistritoFederal.generate(); // "0798568100153"
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
		 * PT-BR: Gera um número de inscrição estadual do Distrito Federal válido e aleatório com máscara.
		 *
		 * EN: Generates a random valid Distrito Federal state registration number with mask.
		 *
		 * @returns PT-BR: O número de inscrição estadual gerado com máscara. EN: The generated state registration number with mask.
		 *
		 * @example
		 * ```
		 * InscricaoEstadual.DistritoFederal.generateMasked(); // "07985681001-53"
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
				digits: baseNumerals + firstVerifierDigit,
				weights: this.SECOND_VERIFIER_DIGIT_WEIGHTS,
			});
		}
	}
}
