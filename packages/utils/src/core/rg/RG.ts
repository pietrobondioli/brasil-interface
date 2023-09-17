import { Assert } from "@/helpers/Assert";
import { ModAlg } from "@/helpers/ModAlg";
import { Pipes, ValidationWorker } from "@/helpers/Pipes";
import { Random } from "@/helpers/Random";
import { Transform } from "@/helpers/Transform";

export namespace RG {
	export class SP {
		private static readonly MOD_ALG = 11;

		static CLEAR_REGEX = /[^\dX]/g;

		private static readonly LENGTH = 9;
		private static readonly BASE_NUMERALS_LENGTH = 8;
		private static readonly VERIFIER_DIGITS_LENGTH = 1;

		private static readonly BASE_NUMERALS_START = 0;
		private static readonly BASE_NUMERALS_END = 8;

		private static readonly WEIGHTS = [9, 8, 7, 6, 5, 4, 3, 2];

		private static readonly MASK_REGEX = /(\d{2})(\d{3})(\d{3})([\dX])/;
		private static readonly MASK_PATTERN = "$1.$2.$3-$4";
		private static readonly MASK_SENSITIVE_PATTERN = "$1.$2.***-*";

		private static readonly BLACKLIST = [
			"000000000",
			"111111111",
			"222222222",
			"333333333",
			"444444444",
			"555555555",
			"666666666",
			"777777777",
			"888888888",
			"999999999",
		];

		private static readonly VALIDATION_RULES = [
			Assert.String.isDefined,
			Assert.String.isNotEmpty,
			(v) => Assert.String.hasLengthOf(v, this.LENGTH),
			(v) => Assert.Array.notContains(v, this.BLACKLIST),
			this.shouldHaveValidVerifierDigits.bind(this),
		] satisfies ValidationWorker[];

		/**
		 * PT-BR: Verifica se um número de RG é válido.
		 *
		 * EN: Checks if an RG number is valid.
		 *
		 * @param rg - PT-BR: O número de RG. EN: The RG number.
		 * @returns PT-BR: `true` se o número de RG for válido. EN: `true` if the RG number is valid.
		 *
		 * @example
		 * ```
		 * RG.SP.isValid("00.000.000-0"); // false
		 * RG.SP.isValid("000000001"); // false
		 * RG.SP.isValid("20.336.104-0"); // true
		 * RG.SP.isValid("203361040"); // true
		 * ```
		 */
		public static isValid(rg: string | number): boolean {
			const transformedValue = this.clear(rg);

			return Pipes.runValidations(transformedValue, this.VALIDATION_RULES);
		}

		/**
		 * PT-BR: Aplica uma máscara a um número de RG.
		 *
		 * EN: Masks an RG number.
		 *
		 * @param rg - PT-BR: O número de RG. EN: The RG number.
		 * @returns PT-BR: O número de RG com máscara. EN: The masked RG number.
		 *
		 * @example
		 * ```
		 * RG.SP.mask("203361040"); // "20.336.104-0"
		 * RG.SP.mask("20.336.104-0"); // "20.336.104-0"
		 * ```
		 */
		public static mask(rg: string | number): string {
			const cleanedValue = this.clear(rg);

			return Transform.String.applyMask(
				cleanedValue,
				this.MASK_REGEX,
				this.MASK_PATTERN
			);
		}

		/**
		 * PT-BR Aplica uma máscara a um número de RG, mas esconde os dígitos finais.
		 *
		 * EN: Masks an RG number, but hides the final digits.
		 *
		 * @param rg - PT-BR: O número de RG. EN: The RG number.
		 * @returns PT-BR: O número de RG com máscara. EN: The masked RG number.
		 *
		 * @example
		 * ```
		 * RG.SP.maskSensitive("203361040"); // "20.336.***-*"
		 * RG.SP.maskSensitive("20.336.104-0"); // "20.336.***-*"
		 * ```
		 */
		public static maskSensitive(rg: string | number): string {
			const cleanedValue = this.clear(rg);

			return Transform.String.applyMask(
				cleanedValue,
				this.MASK_REGEX,
				this.MASK_SENSITIVE_PATTERN
			);
		}

		/**
		 * PT-BR: Remove a máscara de um número de RG.
		 *
		 * EN: Removes the mask from an RG number.
		 *
		 * @param rg - PT-BR: O número de RG. EN: The RG number.
		 * @returns PT-BR: O número de RG sem máscara. EN: The unmasked RG number.
		 *
		 * @example
		 * ```
		 * RG.SP.unmask("20.336.104-0"); // "203361040"
		 * RG.SP.unmask("203361040"); // "203361040"
		 * ```
		 */
		public static unmask(rg: string | number): string {
			return this.clear(rg);
		}

		/**
		 * PT-BR: Gera um número de RG aleatório.
		 *
		 * EN: Generates a random RG number.
		 *
		 * @returns PT-BR: O número de RG gerado. EN: The generated RG number.
		 *
		 * @example
		 * ```
		 * RG.SP.generate(); // "203361040"
		 * ```
		 */
		public static generate(): string {
			const digits = Random.generateRandomNumber(
				this.BASE_NUMERALS_LENGTH
			).toString();

			const verifierDigit = this.calculateVerifierDigit(digits);

			return digits + verifierDigit;
		}

		/**
		 * PT-BR: Gera um número de RG aleatório com máscara.
		 *
		 * EN: Generates a random RG number with mask.
		 *
		 * @returns PT-BR: O número de RG gerado com máscara. EN: The generated RG number with mask.
		 *
		 * @example
		 * ```
		 * RG.SP.generateMasked(); // "20.336.104-0"
		 * ```
		 */
		public static generateMasked(): string {
			return this.mask(this.generate());
		}

		private static clear(rg: string | number): string {
			return Transform.String.clearString(rg, this.CLEAR_REGEX);
		}

		private static shouldHaveValidVerifierDigits(rg: string): boolean {
			const baseNumerals = this.getBaseNumerals(rg);
			const verifierDigit = this.calculateVerifierDigit(baseNumerals);

			return rg.endsWith(verifierDigit);
		}

		private static getBaseNumerals(digits: string): string {
			return digits.slice(this.BASE_NUMERALS_START, this.BASE_NUMERALS_END);
		}

		private static calculateVerifierDigit(baseNumerals: string): string {
			return ModAlg.calculateCheckDigit({
				modStrategy: "mod",
				modAlg: this.MOD_ALG,
				direction: "fromLeft",
				digits: baseNumerals,
				weights: this.WEIGHTS,
				transform: {
					10: "X",
				},
			});
		}
	}
}
