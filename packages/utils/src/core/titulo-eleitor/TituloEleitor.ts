import { Assert } from "@/helpers/Assert";
import { ANY_NON_DIGIT_REGEX } from "@/helpers/Constants";
import { ModAlg } from "@/helpers/ModAlg";
import { Pipes, ValidationWorker } from "@/helpers/Pipes";
import { Random } from "@/helpers/Random";
import { Transform } from "@/helpers/Transform";
import { EstadoSigla } from "../estados/Estados";

type TituloEleitorParts = {
	baseNumerals: string;
	ufCode: string;
	verifierDigits: string;
};

export class TituloEleitor {
	private static readonly MOD_ALG = 11;

	private static readonly LENGTH_1 = 12;
	private static readonly LENGTH_2 = 13;
	private static readonly BASE_NUMERALS_LENGTH = 8;
	private static readonly UF_CODE_RANGE: [number, number] = [1, 28];
	private static readonly PARTS_REGEX = /^(\d{8,9})(\d{2})(\d{2})$/;

	private static readonly FIRST_VERIFIER_DIGIT_WEIGHTS = [
		2, 3, 4, 5, 6, 7, 8, 9,
	];
	private static readonly SECOND_VERIFIER_DIGIT_WEIGHTS = [7, 8, 9];

	private static readonly UF_MAP = {
		"01": "SP",
		"02": "MG",
		"03": "RJ",
		"04": "RS",
		"05": "BA",
		"06": "PR",
		"07": "CE",
		"08": "PE",
		"09": "SC",
		"10": "GO",
		"11": "MA",
		"12": "PB",
		"13": "PA",
		"14": "ES",
		"15": "PI",
		"16": "RN",
		"17": "AL",
		"18": "MT",
		"19": "MS",
		"20": "DF",
		"21": "SE",
		"22": "AM",
		"23": "RO",
		"24": "AC",
		"25": "AP",
		"26": "RR",
		"27": "TO",
		"28": "ZZ",
	} satisfies { [key: string]: EstadoSigla };

	private static readonly VALIDATION_RULES = [
		Assert.String.isDefined,
		Assert.String.isNotEmpty,
		(v) =>
			Assert.String.hasLengthOf(v, this.LENGTH_1) ||
			Assert.String.hasLengthOf(v, this.LENGTH_2),
		this.shouldHaveValidUfCode.bind(this),
		this.shouldHaveValidVerifierDigits.bind(this),
	] satisfies ValidationWorker[];

	/**
	 * PT-BR: Verifica se o título de eleitor é válido.
	 *
	 * EN: Checks if the voter registration is valid.
	 *
	 * @param value Número do título de eleitor.
	 * @returns Se o título de eleitor é válido.
	 *
	 * @example
	 * ```
	 * TituloEleitor.isValid("123456789012") // false
	 * TituloEleitor.isValid("102385010671") // true
	 * TituloEleitor.isValid("12345678901234") // false
	 * ```
	 */
	public static isValid(tituloE: string): boolean {
		const transformedValue = this.clear(tituloE);

		return Pipes.runValidations(transformedValue, this.VALIDATION_RULES);
	}

	/**
	 * PT-BR: Gera um número de título de eleitor válido.
	 *
	 * EN: Generates a valid voter registration number.
	 *
	 * @returns Número de título de eleitor válido.
	 *
	 * @example
	 * ```
	 * TituloEleitor.generate() // "102385010671"
	 * ```
	 */
	public static generate(): string {
		const baseNumerals = Random.generateRandomNumber(
			this.BASE_NUMERALS_LENGTH
		).toString();
		const ufCode = Random.generateRandomNumber(this.UF_CODE_RANGE)
			.toString()
			.padStart(2, "0");

		if (!this.isUfKey(ufCode)) {
			throw new Error("Invalid UF code");
		}

		const ufName = this.UF_MAP[ufCode];

		const verifierDigits = this.calculateVerifierDigits(
			baseNumerals,
			ufCode,
			ufName
		);

		return baseNumerals + ufCode + verifierDigits;
	}

	/**
	 * PT-BR: Retorna o estado do título de eleitor.
	 *
	 * EN: Returns the state of the voter registration.
	 *
	 * @param tituloE Número do título de eleitor.
	 * @returns Estado do título de eleitor ou null caso o título seja inválido.
	 *
	 * @example
	 * ```
	 * TituloEleitor.getEstado("102385010671") // "SP"
	 * TituloEleitor.getEstado("123456789012") // null
	 * ```
	 */
	public static getEstado(
		tituloE: string
	): (typeof this.UF_MAP)[keyof typeof this.UF_MAP] | null {
		const isValid = this.isValid(tituloE);

		if (!isValid) return null;

		const parts = this.extractParts(tituloE);

		if (!parts) return null;

		const { ufCode } = parts;

		if (!this.isUfKey(ufCode)) return null;

		return this.UF_MAP[ufCode];
	}

	private static clear(tituloE: string): string {
		return Transform.String.clearString(tituloE, ANY_NON_DIGIT_REGEX);
	}

	private static isUfKey(
		value: number | string
	): value is keyof typeof this.UF_MAP {
		return value in this.UF_MAP;
	}

	private static extractParts(titulo: string): TituloEleitorParts | null {
		const result = this.PARTS_REGEX.exec(titulo);

		if (result) {
			return {
				baseNumerals: result[1],
				ufCode: result[2],
				verifierDigits: result[3],
			};
		}

		return null;
	}

	private static shouldHaveValidUfCode(tituloE: string): boolean {
		const parts = this.extractParts(tituloE);

		if (!parts) return false;

		const { ufCode } = parts;

		if (!this.isUfKey(ufCode)) return false;

		return true;
	}

	private static shouldHaveValidVerifierDigits(tituloE: string): boolean {
		const parts = this.extractParts(tituloE);

		if (!parts) {
			return false;
		}

		const { baseNumerals, ufCode } = parts;

		if (!this.isUfKey(ufCode)) return false;

		const ufName = this.UF_MAP[ufCode];

		const verifierDigits = this.calculateVerifierDigits(
			baseNumerals,
			ufCode,
			ufName
		);

		return tituloE.endsWith(verifierDigits);
	}

	private static calculateVerifierDigits(
		baseNumerals: string,
		ufCode: string,
		ufName: string
	): string {
		const firstVerifierDigit = this.calculateFirstVerifierDigit(
			baseNumerals,
			ufName
		);
		const secondVerifierDigit = this.calculateSecondVerifierDigit(
			ufCode,
			firstVerifierDigit,
			ufName
		);

		return firstVerifierDigit + secondVerifierDigit;
	}

	private static calculateFirstVerifierDigit(
		baseNumerals: string,
		ufName: string
	): string {
		return ModAlg.calculateCheckDigit({
			modStrategy: "mod",
			modAlg: this.MOD_ALG,
			direction: "fromLeft",
			digits: baseNumerals,
			weights: this.FIRST_VERIFIER_DIGIT_WEIGHTS,
			transform: {
				0: ufName === "SP" || ufName === "MG" ? "1" : "0",
			},
		});
	}

	private static calculateSecondVerifierDigit(
		ufCode: string,
		firstVerifierDigit: string,
		ufName: string
	): string {
		return ModAlg.calculateCheckDigit({
			modStrategy: "mod",
			modAlg: this.MOD_ALG,
			direction: "fromLeft",
			digits: ufCode + firstVerifierDigit,
			weights: this.SECOND_VERIFIER_DIGIT_WEIGHTS,
			transform: {
				0: ufName === "SP" || ufName === "MG" ? "1" : "0",
			},
		});
	}
}
