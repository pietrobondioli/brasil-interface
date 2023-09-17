import { Assert } from "@/helpers/Assert";
import { ANY_NON_DIGIT_REGEX } from "@/helpers/Constants";
import { ModAlg } from "@/helpers/ModAlg";
import { Pipes, ValidationWorker } from "@/helpers/Pipes";
import { Random } from "@/helpers/Random";
import { Transform } from "@/helpers/Transform";

type Case = "case_1" | "case_2";

export namespace InscricaoEstadual {
	export class RioGrandeDoNorte {
		private static readonly MOD_ALG = 11;

		private static readonly CASE_1_LENGTH = 9;
		private static readonly CASE_1_BASE_NUMERALS_LENGTH = 8;
		private static readonly CASE_1_BASE_NUMERALS_START = 0;
		private static readonly CASE_1_BASE_NUMERALS_END = 8;

		private static readonly CASE_2_LENGTH = 10;
		private static readonly CASE_2_BASE_NUMERALS_LENGTH = 9;
		private static readonly CASE_2_BASE_NUMERALS_START = 0;
		private static readonly CASE_2_BASE_NUMERALS_END = 9;

		private static readonly STARTS_WITH = "20";
		private static readonly VERIFIER_DIGIT_WEIGHTS = [
			2, 3, 4, 5, 6, 7, 8, 9, 10,
		];

		private static readonly CASE_1_MASK_REGEX =
			/^(\d{2})(\d{3})(\d{3})(\d{1})$/;
		private static readonly CASE_1_MASK_PATTERN = "$1.$2.$3-$4";

		private static readonly CASE_2_MASK_REGEX =
			/^(\d{2})(\d{3})(\d{1})(\d{3})(\d{1})$/;
		private static readonly CASE_2_MASK_PATTERN = "$1.$2.$3.$4-$5";

		private static readonly VALIDATION_RULES = [
			Assert.String.isDefined,
			Assert.String.isNotEmpty,
			(v) =>
				Assert.String.hasLengthOf(v, this.CASE_1_LENGTH) ||
				Assert.String.hasLengthOf(v, this.CASE_2_LENGTH),
			(v) => Assert.String.startsWith(v, this.STARTS_WITH),
			this.shouldHaveValidVerifierDigits.bind(this),
		] satisfies ValidationWorker[];

		/**
		 * PT-BR: Verifica se uma inscrição estadual do Rio Grande do Norte é válida.
		 *
		 * EN: Checks if an Rio Grande do Norte state registration is valid.
		 *
		 * @param inscricaoE - PT-BR: A inscrição estadual. Com ou sem máscara. EN: The state registration. With or without mask.
		 * @returns PT-BR: `true` se a inscrição estadual for válida. EN: `true` if the state registration is valid.
		 *
		 * @example
		 * ```
		 * InscricaoEstadual.RioGrandeDoNorte.isValid("111.11583-00"); // false
		 * InscricaoEstadual.RioGrandeDoNorte.isValid("292.33583-00"); // true
		 * InscricaoEstadual.RioGrandeDoNorte.isValid("1111158300"); // false
		 * InscricaoEstadual.RioGrandeDoNorte.isValid("2923358300"); // true
		 * ```
		 */
		public static isValid(inscricaoE: any): boolean {
			const transformedValue = this.clear(inscricaoE);

			return Pipes.runValidations(transformedValue, this.VALIDATION_RULES);
		}

		/**
		 * PT-BR: Máscara uma inscrição estadual do RioGrandeDoNorte.
		 *
		 * EN: Masks an Rio Grande do Norte state registration.
		 *
		 * @param inscricaoE - PT-BR: A inscrição estadual. Com ou sem máscara. EN: The state registration. With or without mask.
		 * @returns PT-BR: A inscrição estadual mascarada. EN: The masked state registration.
		 *
		 * @example
		 * ```
		 * InscricaoEstadual.RioGrandeDoNorte.mask("2923358300"); // "292.33583-00"
		 * ```
		 */
		public static mask(inscricaoE: any): string {
			const cleanedValue = this.clear(inscricaoE);

			const case_ = this.getCase(cleanedValue);

			if (!case_) return inscricaoE;

			return Transform.String.applyMask(
				cleanedValue,
				this.getMaskRegex(case_),
				this.getMaskPattern(case_)
			);
		}

		/**
		 * PT-BR: Desmascara uma inscrição estadual do RioGrandeDoNorte.
		 *
		 * EN: Unmasks an Rio Grande do Norte state registration.
		 *
		 * @param inscricaoE - PT-BR: A inscrição estadual. Com ou sem máscara. EN: The state registration. With or without mask.
		 * @returns PT-BR: A inscrição estadual desmascarada. EN: The unmasked state registration.
		 *
		 * @example
		 * ```
		 * InscricaoEstadual.RioGrandeDoNorte.unmask("292.33583-00"); // "2923358300"
		 * ```
		 */
		public static unmask(inscricaoE: any): string {
			return this.clear(inscricaoE);
		}

		/**
		 * PT-BR: Gera um número de inscrição estadual do Rio Grande do Norte válido e aleatório.
		 *
		 * EN: Generates a random valid Rio Grande do Norte state registration number.
		 *
		 * @returns PT-BR: O número de inscrição estadual gerado. EN: The generated state registration number.
		 *
		 * @example
		 * ```
		 * InscricaoEstadual.RioGrandeDoNorte.generate(); // "2923358300"
		 * ```
		 */
		public static generate() {
			const randomLength = Random.fromArray([
				this.CASE_1_BASE_NUMERALS_LENGTH,
				this.CASE_2_BASE_NUMERALS_LENGTH,
			]);

			const randomBaseNumerals = Random.generateRandomNumber(
				randomLength - 2
			).toString();

			const baseNumerals = this.STARTS_WITH + randomBaseNumerals;

			const verifierDigits = this.calculateVerifierDigit(baseNumerals);

			return baseNumerals + verifierDigits;
		}

		/**
		 * PT-BR: Gera um número de inscrição estadual do Rio Grande do Norte válido e aleatório com máscara.
		 *
		 * EN: Generates a random valid Rio Grande do Norte state registration number with mask.
		 *
		 * @returns PT-BR: O número de inscrição estadual gerado com máscara. EN: The generated state registration number with mask.
		 *
		 * @example
		 * ```
		 * InscricaoEstadual.RioGrandeDoNorte.generateMasked(); // "292.33583-00"
		 * ```
		 */
		public static generateMasked() {
			return this.mask(this.generate());
		}

		private static clear(inscricaoE: any): string {
			return Transform.String.clearString(inscricaoE, ANY_NON_DIGIT_REGEX);
		}

		private static shouldHaveValidVerifierDigits(inscricaoE: string): boolean {
			const case_ = this.getCase(inscricaoE);

			if (!case_) return false;

			const baseNumerals = this.getBaseNumerals(inscricaoE, case_);

			if (!baseNumerals) return false;

			const verifierDigit = this.calculateVerifierDigit(baseNumerals);

			return inscricaoE.endsWith(verifierDigit);
		}

		private static getCase(inscricaoE: string): Case | null {
			if (inscricaoE.length === this.CASE_1_LENGTH) return "case_1";

			if (inscricaoE.length === this.CASE_2_LENGTH) return "case_2";

			return null;
		}

		private static getBaseNumerals(inscricaoE: string, case_: Case): string {
			switch (case_) {
				case "case_1":
					return inscricaoE.substring(
						this.CASE_1_BASE_NUMERALS_START,
						this.CASE_1_BASE_NUMERALS_END
					);

				case "case_2":
					return inscricaoE.substring(
						this.CASE_2_BASE_NUMERALS_START,
						this.CASE_2_BASE_NUMERALS_END
					);
			}
		}

		private static getMaskRegex(case_: Case): RegExp {
			switch (case_) {
				case "case_1":
					return this.CASE_1_MASK_REGEX;

				case "case_2":
					return this.CASE_2_MASK_REGEX;
			}
		}

		private static getMaskPattern(case_: Case): string {
			switch (case_) {
				case "case_1":
					return this.CASE_1_MASK_PATTERN;

				case "case_2":
					return this.CASE_2_MASK_PATTERN;
			}
		}

		private static calculateVerifierDigit(baseNumerals: string): string {
			return ModAlg.calculateCheckDigit({
				modStrategy: "mod",
				modAlg: this.MOD_ALG,
				direction: "fromRight",
				digits: baseNumerals,
				weights: this.VERIFIER_DIGIT_WEIGHTS,
				transformSum: (sum) => sum * 10,
			});
		}
	}
}
