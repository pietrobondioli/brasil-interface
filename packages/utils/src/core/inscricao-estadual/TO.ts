import { Assert } from "@/helpers/Assert";
import { ANY_NON_DIGIT_REGEX } from "@/helpers/Constants";
import { ModAlg } from "@/helpers/ModAlg";
import { Pipes, ValidationWorker } from "@/helpers/Pipes";
import { Random } from "@/helpers/Random";
import { Transform } from "@/helpers/Transform";

export namespace InscricaoEstadual {
	export class TO {
		private static strategy: ICaseStrategy;

		private static decideStrategy(inscricaoE: string) {
			const cleanedInscricaoE = Transform.String.clearString(
				inscricaoE,
				ANY_NON_DIGIT_REGEX
			);

			if (cleanedInscricaoE.length === 9) {
				this.strategy = new NineDigitsStrategy();
			} else if (cleanedInscricaoE.length === 11) {
				this.strategy = new ElevenDigitsCase();
			}
		}

		private static randomizeStrategy() {
			const random = Random.generateRandomNumber([1, 2]);

			if (random === 1) {
				this.strategy = new NineDigitsStrategy();
			} else {
				this.strategy = new ElevenDigitsCase();
			}
		}

		/**
		 * PT-BR: Verifica se uma inscrição estadual do Tocantins é válida.
		 *
		 * EN: Checks if an Tocantins state registration is valid.
		 *
		 * @param inscricaoE - PT-BR: A inscrição estadual. Com ou sem máscara. EN: The state registration. With or without mask.
		 * @returns PT-BR: `true` se a inscrição estadual for válida. EN: `true` if the state registration is valid.
		 *
		 * @example
		 * ```
		 * InscricaoEstadual.TO.isValid("1111110310"); // false
		 * InscricaoEstadual.TO.isValid("00130000019"); // true
		 * ```
		 */
		public static isValid(inscricaoE: any): boolean {
			this.decideStrategy(inscricaoE);

			return this.strategy.isValid(inscricaoE);
		}

		/**
		 * PT-BR: Máscara uma inscrição estadual do Tocantins.
		 *
		 * EN: Masks an Tocantins state registration.
		 *
		 * @param inscricaoE - PT-BR: A inscrição estadual. Com ou sem máscara. EN: The state registration. With or without mask.
		 * @returns PT-BR: A inscrição estadual mascarada. EN: The masked state registration.
		 *
		 * @example
		 * ```
		 * InscricaoEstadual.TO.mask("00130000019"); // "0013000001-9"
		 * ```
		 */
		public static mask(inscricaoE: any): string {
			this.decideStrategy(inscricaoE);

			return this.strategy.mask(inscricaoE);
		}

		/**
		 * PT-BR: Desmascara uma inscrição estadual do Tocantins.
		 *
		 * EN: Unmasks an Tocantins state registration.
		 *
		 * @param inscricaoE - PT-BR: A inscrição estadual. Com ou sem máscara. EN: The state registration. With or without mask.
		 * @returns PT-BR: A inscrição estadual desmascarada. EN: The unmasked state registration.
		 *
		 * @example
		 * ```
		 * InscricaoEstadual.TO.unmask("0013000001-9"); // "00130000019"
		 * ```
		 */
		public static unmask(inscricaoE: any): string {
			this.decideStrategy(inscricaoE);

			return this.strategy.unmask(inscricaoE);
		}

		/**
		 * PT-BR: Gerar um número de inscrição estadual do Tocantins válido.
		 *
		 * EN: Generate a valid Tocantins state registration number.
		 *
		 * @returns PT-BR: O número de inscrição estadual gerado. EN: The generated state registration number.
		 *
		 * @example
		 * ```
		 * InscricaoEstadual.TO.generate(); // "00130000019"
		 * ```
		 */
		public static generate() {
			this.randomizeStrategy();

			return this.strategy.generate();
		}

		/**
		 * PT-BR: Gera um número de inscrição estadual do Tocantins válido e aleatório com máscara.
		 *
		 * EN: Generates a random valid Tocantins state registration number with mask.
		 *
		 * @returns PT-BR: O número de inscrição estadual gerado com máscara. EN: The generated state registration number with mask.
		 *
		 * @example
		 * ```
		 * InscricaoEstadual.TO.generateMasked(); // "0013000001-9"
		 * ```
		 */
		public static generateMasked() {
			this.randomizeStrategy();

			return this.strategy.generateMasked();
		}
	}

	class NineDigitsStrategy implements ICaseStrategy {
		private readonly MOD_ALG = 11;

		private readonly VALID_LENGTH = 9;
		private readonly BASE_NUMERALS_LENGTH = 8;
		private readonly BASE_NUMERALS_START = 0;
		private readonly BASE_NUMERALS_END = 8;
		private readonly VERIFIER_DIGIT_WEIGHTS = [9, 8, 7, 6, 5, 4, 3, 2];

		private readonly MASK_REGEX = /^(\d{8})(\d{1})$/;
		private readonly MASK_PATTERN = "$1-$2";

		private readonly VALIDATION_RULES = [
			Assert.String.isDefined,
			Assert.String.isNotEmpty,
			(v) => Assert.String.hasLengthOf(v, this.VALID_LENGTH),
			(v) => Assert.String.containsOnlyNumbers(v),
			this.shouldHaveValidVerifierDigits.bind(this),
		] satisfies ValidationWorker[];

		public isValid(inscricaoE: any): boolean {
			const cleanedValue = this.clear(inscricaoE);

			return Pipes.runValidations(cleanedValue, this.VALIDATION_RULES);
		}

		public mask(inscricaoE: any): string {
			const cleanedValue = this.clear(inscricaoE);

			return Transform.String.applyMask(
				cleanedValue,
				this.MASK_REGEX,
				this.MASK_PATTERN
			);
		}

		public unmask(inscricaoE: any): string {
			return this.clear(inscricaoE);
		}

		public generate() {
			const baseNumerals = Random.generateRandomNumber(
				this.BASE_NUMERALS_LENGTH
			).toString();

			const verifierDigit = this.calculateVerifierDigit(baseNumerals);

			return baseNumerals + verifierDigit;
		}

		public generateMasked() {
			return this.mask(this.generate());
		}

		private clear(inscricaoE: any): string {
			return Transform.String.clearString(inscricaoE, ANY_NON_DIGIT_REGEX);
		}

		private shouldHaveValidVerifierDigits(inscricaoE: string): boolean {
			const baseNumerals = this.getBaseNumerals(inscricaoE);

			const verifierDigit = this.calculateVerifierDigit(baseNumerals);

			return inscricaoE.endsWith(verifierDigit);
		}

		private getBaseNumerals(inscricaoE: string): string {
			return inscricaoE.substring(
				this.BASE_NUMERALS_START,
				this.BASE_NUMERALS_END
			);
		}

		private calculateVerifierDigit(baseNumerals: string): string {
			return ModAlg.calculateCheckDigit({
				modStrategy: "modComplement",
				modAlg: this.MOD_ALG,
				direction: "fromLeft",
				digits: baseNumerals,
				weights: this.VERIFIER_DIGIT_WEIGHTS,
			});
		}
	}
	class ElevenDigitsCase {
		private readonly MOD_ALG = 11;

		private readonly VALID_LENGTH = 11;
		private readonly BASE_NUMERALS_LENGTH = 10;
		private readonly BASE_NUMERALS_START = 0;
		private readonly BASE_NUMERALS_END = 10;
		private readonly BASE_NUMERALS_POSITIONS_DISCARD = [2, 3]; // 3rd and 4th digits
		private readonly VERIFIER_DIGIT_WEIGHTS = [9, 8, 7, 6, 5, 4, 3, 2];

		private readonly MASK_REGEX = /^(\d{10})(\d{1})$/;
		private readonly MASK_PATTERN = "$1-$2";

		private readonly VALIDATION_RULES = [
			Assert.String.isDefined,
			Assert.String.isNotEmpty,
			(v) => Assert.String.hasLengthOf(v, this.VALID_LENGTH),
			(v) => Assert.String.containsOnlyNumbers(v),
			this.shouldHaveValidVerifierDigits.bind(this),
		] satisfies ValidationWorker[];

		public isValid(inscricaoE: any): boolean {
			const cleanedValue = this.clear(inscricaoE);

			return Pipes.runValidations(cleanedValue, this.VALIDATION_RULES);
		}

		public mask(inscricaoE: any): string {
			const cleanedValue = this.clear(inscricaoE);

			return Transform.String.applyMask(
				cleanedValue,
				this.MASK_REGEX,
				this.MASK_PATTERN
			);
		}

		public unmask(inscricaoE: any): string {
			return this.clear(inscricaoE);
		}

		public generate() {
			const baseNumerals = Random.generateRandomNumber(
				this.BASE_NUMERALS_LENGTH
			).toString();

			const baseNumeralsToCheckDigit = this.getBaseNumerals(baseNumerals);

			const verifierDigit = this.calculateVerifierDigit(
				baseNumeralsToCheckDigit
			);

			return baseNumerals + verifierDigit;
		}

		public generateMasked() {
			return this.mask(this.generate());
		}

		private clear(inscricaoE: any): string {
			return Transform.String.clearString(inscricaoE, ANY_NON_DIGIT_REGEX);
		}

		private shouldHaveValidVerifierDigits(inscricaoE: string): boolean {
			const baseNumerals = this.getBaseNumerals(inscricaoE);

			const verifierDigit = this.calculateVerifierDigit(baseNumerals);

			return inscricaoE.endsWith(verifierDigit);
		}

		private getBaseNumerals(inscricaoE: string): string {
			const baseNumerals = inscricaoE.substring(
				this.BASE_NUMERALS_START,
				this.BASE_NUMERALS_END
			);

			return Transform.String.removeDigitsAtPositions(
				baseNumerals,
				this.BASE_NUMERALS_POSITIONS_DISCARD
			);
		}

		private calculateVerifierDigit(baseNumerals: string): string {
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
