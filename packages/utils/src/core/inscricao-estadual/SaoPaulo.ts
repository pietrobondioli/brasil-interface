import { ANY_NON_DIGIT_REGEX } from "@/helpers/Constants";
import { Pipes, ValidationWorker } from "@/helpers/Pipes";
import { Transform } from "@/helpers/Transform";
import { Assert } from "@/helpers/Assert";
import { Random } from "@/helpers/Random";
import { ModAlg } from "@/helpers/ModAlg";

export namespace InscricaoEstadual {
	export class SaoPaulo {
		private static readonly CLEAR_REGEX = /[^\dP]/g;

		private static strategy: ICaseStrategy;

		private static decideStrategy(inscricaoE: string) {
			const cleanedInscricaoE = Transform.String.clearString(
				inscricaoE,
				this.CLEAR_REGEX
			);

			if (cleanedInscricaoE.length === 12) {
				this.strategy = new IndustriaisEComerciantesStrategy();
			} else if (cleanedInscricaoE.length === 13) {
				this.strategy = new ProdutorRuralStrategy();
			}
		}

		private static randomizeStrategy() {
			const random = Random.generateRandomNumber([1, 2]);

			if (random === 1) {
				this.strategy = new IndustriaisEComerciantesStrategy();
			} else {
				this.strategy = new ProdutorRuralStrategy();
			}
		}

		/**
		 * PT-BR: Verifica se uma inscrição estadual do São Paulo é válida.
		 *
		 * EN: Checks if an São Paulo state registration is valid.
		 *
		 * @param inscricaoE - PT-BR: A inscrição estadual. Com ou sem máscara. EN: The state registration. With or without mask.
		 * @returns PT-BR: `true` se a inscrição estadual for válida. EN: `true` if the state registration is valid.
		 *
		 * @example
		 * ```
		 * InscricaoEstadual.SaoPaulo.isValid("1111110310"); // false
		 * InscricaoEstadual.SaoPaulo.isValid("301188327"); // true
		 * ```
		 */
		public static isValid(inscricaoE: any): boolean {
			this.decideStrategy(inscricaoE);

			return this.strategy.isValid(inscricaoE);
		}

		/**
		 * PT-BR: Máscara uma inscrição estadual do São Paulo.
		 *
		 * EN: Masks an São Paulo state registration.
		 *
		 * @param inscricaoE - PT-BR: A inscrição estadual. Com ou sem máscara. EN: The state registration. With or without mask.
		 * @returns PT-BR: A inscrição estadual mascarada. EN: The masked state registration.
		 *
		 * @example
		 * ```
		 * InscricaoEstadual.SaoPaulo.mask("301188327"); // "30118832-7"
		 * ```
		 */
		public static mask(inscricaoE: any): string {
			this.decideStrategy(inscricaoE);

			return this.strategy.mask(inscricaoE);
		}

		/**
		 * PT-BR: Desmascara uma inscrição estadual do São Paulo.
		 *
		 * EN: Unmasks an São Paulo state registration.
		 *
		 * @param inscricaoE - PT-BR: A inscrição estadual. Com ou sem máscara. EN: The state registration. With or without mask.
		 * @returns PT-BR: A inscrição estadual desmascarada. EN: The unmasked state registration.
		 *
		 * @example
		 * ```
		 * InscricaoEstadual.SaoPaulo.unmask("30118832-7"); // "301188327"
		 * ```
		 */
		public static unmask(inscricaoE: any): string {
			this.decideStrategy(inscricaoE);

			return this.strategy.unmask(inscricaoE);
		}

		/**
		 * PT-BR: Gerar um número de inscrição estadual do São Paulo válido.
		 *
		 * EN: Generate a valid São Paulo state registration number.
		 *
		 * @returns PT-BR: O número de inscrição estadual gerado. EN: The generated state registration number.
		 *
		 * @example
		 * ```
		 * InscricaoEstadual.SaoPaulo.generate(); // "301188327"
		 * ```
		 */
		public static generate() {
			this.randomizeStrategy();

			return this.strategy.generate();
		}

		/**
		 * PT-BR: Gera um número de inscrição estadual do São Paulo válido e aleatório com máscara.
		 *
		 * EN: Generates a random valid São Paulo state registration number with mask.
		 *
		 * @returns PT-BR: O número de inscrição estadual gerado com máscara. EN: The generated state registration number with mask.
		 *
		 * @example
		 * ```
		 * InscricaoEstadual.SaoPaulo.generateMasked(); // "30118832-7"
		 * ```
		 */
		public static generateMasked() {
			this.randomizeStrategy();

			return this.strategy.generateMasked();
		}
	}

	class IndustriaisEComerciantesStrategy implements ICaseStrategy {
		private readonly MOD_ALG = 11;

		private readonly VALID_LENGTH = 12;
		private readonly BASE_NUMERALS_LENGTH = 8;
		private readonly BASE_NUMERALS_REST_LENGTH = 2;
		private readonly PARTS_REGEX = /(\d{8})(\d{1})(\d{2})(\d{1})/;
		private readonly FIRST_VERIFIER_DIGIT_WEIGHTS = [1, 3, 4, 5, 6, 7, 8, 10];
		private readonly SECOND_VERIFIER_DIGIT_WEIGHTS = [
			3, 2, 10, 9, 8, 7, 6, 5, 4, 3, 2,
		];
		private readonly MASK_REGEX = /^(\d{3})(\d{3})(\d{3})(\d{3})$/;
		private readonly MASK_PATTERN = "$1.$2.$3.$4";

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

			const baseNumeralsRest = Random.generateRandomNumber(
				this.BASE_NUMERALS_REST_LENGTH
			).toString();

			const verifierDigit = this.calculateVerifierDigits(
				baseNumerals,
				baseNumeralsRest
			);

			return (
				baseNumerals +
				verifierDigit.firstVerifierDigit +
				baseNumeralsRest +
				verifierDigit.secondVerifierDigit
			);
		}

		public generateMasked() {
			return this.mask(this.generate());
		}

		private clear(inscricaoE: any): string {
			return Transform.String.clearString(inscricaoE, ANY_NON_DIGIT_REGEX);
		}

		private getParts(inscricaoE: string) {
			const result = this.PARTS_REGEX.exec(inscricaoE);

			if (result) {
				return {
					baseNumerals: result[1],
					firstVerifierDigit: result[2],
					baseNumeralsRest: result[3],
					secondVerifierDigit: result[4],
				};
			}

			return null;
		}

		private shouldHaveValidVerifierDigits(inscricaoE: string): boolean {
			const parts = this.getParts(inscricaoE);

			if (!parts) return false;

			const {
				baseNumerals,
				firstVerifierDigit,
				baseNumeralsRest,
				secondVerifierDigit,
			} = parts;

			const verifierDigits = this.calculateVerifierDigits(
				baseNumerals,
				baseNumeralsRest
			);

			return (
				firstVerifierDigit === verifierDigits.firstVerifierDigit &&
				secondVerifierDigit === verifierDigits.secondVerifierDigit
			);
		}

		private calculateVerifierDigits(
			baseNumerals: string,
			baseNumeralsRest: string
		) {
			const firstVerifierDigit = this.calculateFirstVerifierDigit(baseNumerals);
			const secondVerifierDigit = this.calculateSecondVerifierDigit(
				baseNumerals,
				firstVerifierDigit,
				baseNumeralsRest
			);

			return { firstVerifierDigit, secondVerifierDigit };
		}

		private calculateFirstVerifierDigit(baseNumerals: string): string {
			return ModAlg.calculateCheckDigit({
				modStrategy: "mod",
				modAlg: this.MOD_ALG,
				direction: "fromLeft",
				digits: baseNumerals,
				weights: this.FIRST_VERIFIER_DIGIT_WEIGHTS,
			});
		}

		private calculateSecondVerifierDigit(
			baseNumerals: string,
			firstVerifierDigit: string,
			baseNumeralsRest: string
		): string {
			return ModAlg.calculateCheckDigit({
				modStrategy: "mod",
				modAlg: this.MOD_ALG,
				direction: "fromLeft",
				digits: baseNumerals + firstVerifierDigit + baseNumeralsRest,
				weights: this.SECOND_VERIFIER_DIGIT_WEIGHTS,
			});
		}
	}

	class ProdutorRuralStrategy implements ICaseStrategy {
		private readonly MOD_ALG = 11;

		private readonly CLEAR_REGEX = /[^\dP]/g;

		private readonly VALID_LENGTH = 13;
		private readonly BASE_NUMERALS_LENGTH = 8;
		private readonly BASE_NUMERALS_START = 1;
		private readonly BASE_NUMERALS_END = 9;
		private readonly STARTS_WITH = "P";
		private readonly VD_POSITION = 10;
		private readonly FINAL_DIGITS_LENGTH = 3;
		private readonly VERIFIER_DIGIT_WEIGHTS = [1, 3, 4, 5, 6, 7, 8, 10];
		private readonly MASK_REGEX = /^(\d{1})(\d{8})(\d{1})(\d{3})$/;
		private readonly MASK_PATTERN = "$1.$2.$3.$4";

		private readonly VALIDATION_RULES = [
			Assert.String.isDefined,
			Assert.String.isNotEmpty,
			(v) => Assert.String.hasLengthOf(v, this.VALID_LENGTH),
			(v) => Assert.String.startsWith(v, this.STARTS_WITH),
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

			const finalDigits = Random.generateRandomNumber(
				this.FINAL_DIGITS_LENGTH
			).toString();

			return this.STARTS_WITH + baseNumerals + verifierDigit + finalDigits;
		}

		public generateMasked() {
			return this.mask(this.generate());
		}

		private clear(inscricaoE: any): string {
			return Transform.String.clearString(inscricaoE, this.CLEAR_REGEX);
		}

		private shouldHaveValidVerifierDigits(inscricaoE: string): boolean {
			const baseNumerals = this.getBaseNumerals(inscricaoE);

			const verifierDigit = this.extractVerifierDigit(inscricaoE);

			const verifierDigitResult = this.calculateVerifierDigit(baseNumerals);

			return verifierDigit === verifierDigitResult;
		}

		private extractVerifierDigit(inscricaoE: string): string {
			return inscricaoE.substring(this.VD_POSITION - 1, this.VD_POSITION);
		}

		private getBaseNumerals(digits: string): string {
			return digits.substring(this.BASE_NUMERALS_START, this.BASE_NUMERALS_END);
		}

		private calculateVerifierDigit(baseNumerals: string): string {
			return ModAlg.calculateCheckDigit({
				modStrategy: "mod",
				modAlg: this.MOD_ALG,
				direction: "fromLeft",
				digits: baseNumerals,
				weights: this.VERIFIER_DIGIT_WEIGHTS,
			});
		}
	}
}
