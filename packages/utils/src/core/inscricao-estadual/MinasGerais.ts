import { ANY_NON_DIGIT_REGEX } from "@/helpers/Constants";
import { ModAlg } from "@/helpers/ModAlg";
import { Pipes, ValidationWorker } from "@/helpers/Pipes";
import { Random } from "@/helpers/Random";
import { Transform } from "@/helpers/Transform";
import { Assert } from "@/helpers/Assert";

export namespace InscricaoEstadual {
	export class MinasGerais {
		private static readonly FIRST_VD_MOD_ALG = 10;
		private static readonly SECOND_VD_MOD_ALG = 11;

		private static readonly LENGTH = 13;
		private static readonly BASE_NUMERALS_LENGTH = 11;
		private static readonly BASE_NUMERALS_START = 0;
		private static readonly BASE_NUMERALS_END = 11;
		private static readonly FIRST_VERIFIER_DIGIT_WEIGHTS = [
			1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2,
		];
		private static readonly SECOND_VERIFIER_DIGIT_WEIGHTS = [
			3, 2, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2,
		];

		private static readonly MASK_REGEX = /^(\d{3})(\d{3})(\d{3})(\d{4})$/;
		private static readonly MASK_PATTERN = "$1.$2.$3/$4";

		private static readonly VALIDATION_RULES = [
			Assert.String.isDefined,
			Assert.String.isNotEmpty,
			(v) => Assert.String.hasLengthOf(v, this.LENGTH),
			this.shouldHaveValidVerifierDigits.bind(this),
		] satisfies ValidationWorker[];

		/**
		 * PT-BR: Verifica se uma inscrição estadual do Minas Gerais é válida.
		 *
		 * EN: Checks if an Minas Gerais state registration is valid.
		 *
		 * @param inscricaoE - PT-BR: A inscrição estadual. Com ou sem máscara. EN: The state registration. With or without mask.
		 * @returns PT-BR: `true` se a inscrição estadual for válida. EN: `true` if the state registration is valid.
		 *
		 * @example
		 * ```
		 * InscricaoEstadual.MinasGerais.isValid("01.004.823/001-12"); // false
		 * InscricaoEstadual.MinasGerais.isValid("01.954.726/538-84"); // true
		 * InscricaoEstadual.MinasGerais.isValid("0100482300112"); // false
		 * InscricaoEstadual.MinasGerais.isValid("0195472653884"); // true
		 * ```
		 */
		public static isValid(inscricaoE: any): boolean {
			const transformedValue = this.clear(inscricaoE);

			return Pipes.runValidations(transformedValue, this.VALIDATION_RULES);
		}

		/**
		 * PT-BR: Máscara uma inscrição estadual do MinasGerais.
		 *
		 * EN: Masks an Minas Gerais state registration.
		 *
		 * @param inscricaoE - PT-BR: A inscrição estadual. Com ou sem máscara. EN: The state registration. With or without mask.
		 * @returns PT-BR: A inscrição estadual mascarada. EN: The masked state registration.
		 *
		 * @example
		 * ```
		 * InscricaoEstadual.MinasGerais.mask("0195472653884"); // "01.954.726/538-84"
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
		 * PT-BR: Desmascara uma inscrição estadual do MinasGerais.
		 *
		 * EN: Unmasks an Minas Gerais state registration.
		 *
		 * @param inscricaoE - PT-BR: A inscrição estadual. Com ou sem máscara. EN: The state registration. With or without mask.
		 * @returns PT-BR: A inscrição estadual desmascarada. EN: The unmasked state registration.
		 *
		 * @example
		 * ```
		 * InscricaoEstadual.MinasGerais.unmask("01.954.726/538-84"); // "0195472653884"
		 * ```
		 */
		public static unmask(inscricaoE: any): string {
			return this.clear(inscricaoE);
		}

		/**
		 * PT-BR: Gera um número de inscrição estadual do Minas Gerais válido e aleatório.
		 *
		 * EN: Generates a random valid Minas Gerais state registration number.
		 *
		 * @returns PT-BR: O número de inscrição estadual gerado. EN: The generated state registration number.
		 *
		 * @example
		 * ```
		 * InscricaoEstadual.MinasGerais.generate(); // "0195472653884"
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
		 * PT-BR: Gera um número de inscrição estadual do Minas Gerais válido, aleatório e com máscara.
		 *
		 * EN: Generates a random valid Minas Gerais state registration number with mask.
		 *
		 * @returns PT-BR: O número de inscrição estadual gerado com máscara. EN: The generated state registration number with mask.
		 *
		 * @example
		 * ```
		 * InscricaoEstadual.MinasGerais.generateMasked(); // "01.954.726/538-84"
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

			const verifierDigits = this.calculateVerifierDigits(baseNumerals);

			return inscricaoE.endsWith(verifierDigits);
		}

		private static put0BeforeBaseNumerals(baseNumerals: string): string {
			return baseNumerals.slice(0, 3) + "0" + baseNumerals.slice(3);
		}

		private static getBaseNumerals(inscricaoE: string): string {
			return inscricaoE.slice(this.BASE_NUMERALS_START, this.BASE_NUMERALS_END);
		}

		private static calculateVerifierDigits(baseNumerals: string): string {
			const baseNumeralsForFirstDigit =
				this.put0BeforeBaseNumerals(baseNumerals);
			const firstVerifierDigit = this.calculateFirstVerifierDigit(
				baseNumeralsForFirstDigit
			);
			const secondVerifierDigit = this.calculateSecondVerifierDigit(
				baseNumerals,
				firstVerifierDigit
			);

			return firstVerifierDigit + secondVerifierDigit;
		}

		private static calculateFirstVerifierDigit(baseNumerals: string): string {
			return ModAlg.calculateCheckDigit({
				modStrategy: "modComplement",
				modAlg: this.FIRST_VD_MOD_ALG,
				direction: "fromLeft",
				sumStrategy: "sumNumerals",
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
				modAlg: this.SECOND_VD_MOD_ALG,
				direction: "fromLeft",
				digits: baseNumerals + firstVerifierDigit,
				weights: this.SECOND_VERIFIER_DIGIT_WEIGHTS,
			});
		}
	}
}
