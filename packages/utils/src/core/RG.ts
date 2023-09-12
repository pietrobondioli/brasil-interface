import { Mod11Alg } from "../helpers/Mod11Alg";
import { Random } from "../helpers/Random";

export namespace RG {
	export class SP {
		private static readonly ANY_NON_DIGIT_REGEX = /[^\dX]/g;
		private static readonly RG_BASE_NUMERALS_LENGTH = 8;
		private static readonly RG_VERIFIER_DIGITS_LENGTH = 1;
		private static readonly RG_LENGTH = 9;
		private static readonly RG_BASE_NUMERALS_START = 0;
		private static readonly RG_BASE_NUMERALS_END = 8;
		private static readonly RG_WEIGHTS = [2, 3, 4, 5, 6, 7, 8, 9];

		private static readonly RG_DIGITS_REGEX = /(\d{2})(\d{3})(\d{3})([\dX])/;
		private static readonly RG_MASK = "$1.$2.$3-$4";
		private static readonly RG_MASK_SENSITIVE = "$1.$2.***-*";

		private static readonly RG_BLACKLIST = [
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
			if (!rg) return false;

			rg = this.clear(rg);
			if (rg.length !== this.RG_LENGTH) return false;
			if (this.RG_BLACKLIST.some((bl) => bl === rg)) return false;

			const verifierDigit = this.generateVerifierDigits(
				this.getBaseNumerals(rg)
			);

			return rg.endsWith(verifierDigit);
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
			return this.applyMask(rg, this.RG_MASK);
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
			return this.applyMask(rg, this.RG_MASK_SENSITIVE);
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
				this.RG_BASE_NUMERALS_LENGTH
			).toString();

			return digits + this.generateVerifierDigits(digits);
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
			return rg.toString().replace(this.ANY_NON_DIGIT_REGEX, "");
		}

		private static applyMask(rg: string | number, maskPattern: string): string {
			return this.clear(rg).replace(this.RG_DIGITS_REGEX, maskPattern);
		}

		private static getBaseNumerals(digits: string): string {
			return digits.slice(
				this.RG_BASE_NUMERALS_START,
				this.RG_BASE_NUMERALS_END
			);
		}

		private static generateVerifierDigits(digits: string): string {
			const verifierDigit = Mod11Alg.calculateCheckDigit({
				digits,
				weights: this.RG_WEIGHTS,
				resultFor10: "X",
			});

			return verifierDigit;
		}
	}
}
