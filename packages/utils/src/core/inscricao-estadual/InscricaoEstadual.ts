import { ANY_NON_DIGIT_REGEX, EMPTY_STRING } from "@/helpers/Constants";
import { Mod11Alg } from "@/helpers/Mod11Alg";
import { Transform, Validation, Pipes } from "@/helpers/Pipes";
import { Random } from "@/helpers/Random";

export namespace InscricaoEstadual {
	export class Acre {
		private static readonly PRE_VALIDATION_TRANSFORMS: Transform[] = [
			this.clear.bind(this),
		];

		private static readonly VALIDATION_RULES: Validation[] = [
			this.shouldBeDefined.bind(this),
			this.shouldNotBeEmpty.bind(this),
			this.shouldHaveLengthOfThirteen.bind(this),
			this.shouldStartWith01.bind(this),
			this.shouldHaveValidVerifierDigits.bind(this),
		];

		private static readonly MASK_TRANSFORMS: Transform[] = [
			this.clear.bind(this),
			this.applyMask.bind(this),
		];

		private static readonly UNMASK_TRANSFORMS: Transform[] = [
			this.clear.bind(this),
		];

		public static isValid(value: any): boolean {
			const transformedValue = Pipes.runTransforms(
				this.PRE_VALIDATION_TRANSFORMS,
				value
			);

			return Pipes.runValidations(this.VALIDATION_RULES, transformedValue);
		}

		public static mask(value: any): string {
			return Pipes.runTransforms(this.MASK_TRANSFORMS, value);
		}

		public static unmask(value: any): string {
			return Pipes.runTransforms(this.UNMASK_TRANSFORMS, value);
		}

		public static generate() {
			const STARTING_NUMERALS = "01";
			const BASE_NUMERALS_LENGTH = 11 - STARTING_NUMERALS.length;
			const randomNumbers =
				Random.generateRandomNumber(BASE_NUMERALS_LENGTH).toString();

			const baseNumerals = STARTING_NUMERALS + randomNumbers;

			const firstVerifierDigit = this.calculateFirstVerifierDigit(baseNumerals);
			const secondVerifierDigit = this.calculateSecondVerifierDigit(
				baseNumerals,
				firstVerifierDigit
			);

			return baseNumerals + firstVerifierDigit + secondVerifierDigit;
		}

		public static generateMasked() {
			return this.mask(this.generate());
		}

		private static shouldBeDefined(ie: string): boolean {
			return ie !== undefined && ie !== null;
		}

		private static shouldNotBeEmpty(ie: string): boolean {
			return ie.length > 0;
		}

		private static shouldHaveLengthOfThirteen(ie: string): boolean {
			return ie.length === 13;
		}

		private static shouldStartWith01(ie: string): boolean {
			return ie.startsWith("01");
		}

		private static shouldHaveValidVerifierDigits(ie: string): boolean {
			const baseNumerals = this.getBaseNumerals(ie);

			const firstVerifierDigit = this.calculateFirstVerifierDigit(baseNumerals);
			const secondVerifierDigit = this.calculateSecondVerifierDigit(
				baseNumerals,
				firstVerifierDigit
			);

			const verifierDigits = firstVerifierDigit + secondVerifierDigit;

			return ie.endsWith(verifierDigits);
		}

		private static getBaseNumerals(ie: string): string {
			const BASE_NUMERALS_START = 0;
			const BASE_NUMERALS_END = 11;

			return ie.slice(BASE_NUMERALS_START, BASE_NUMERALS_END);
		}

		private static calculateFirstVerifierDigit(baseNumerals: string): string {
			const FIRST_VERIFIER_DIGIT_WEIGHTS = [4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

			return Mod11Alg.calculateCheckDigit({
				digits: baseNumerals,
				weights: FIRST_VERIFIER_DIGIT_WEIGHTS,
			});
		}

		private static calculateSecondVerifierDigit(
			baseNumerals: string,
			firstVerifierDigit: string
		): string {
			const SECOND_VERIFIER_DIGIT_WEIGHTS = [
				5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2,
			];

			return Mod11Alg.calculateCheckDigit({
				digits: baseNumerals + firstVerifierDigit,
				weights: SECOND_VERIFIER_DIGIT_WEIGHTS,
			});
		}

		private static clear(value: unknown): string {
			return value?.toString().replace(ANY_NON_DIGIT_REGEX, EMPTY_STRING) ?? "";
		}

		private static applyMask(value: string): string {
			const IE_REGEX = /^(\d{2})(\d{3})(\d{3})(\d{3})(\d{2})$/;
			const MASK_PATTERN = "$1.$2.$3/$4-$5";

			return value.replace(IE_REGEX, MASK_PATTERN);
		}
	}
}
