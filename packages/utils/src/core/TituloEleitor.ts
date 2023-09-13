import { EstadoSigla } from "../helpers/Estados";
import { Mod11Alg } from "../helpers/Mod11Alg";
import { Random } from "../helpers/Random";

type TituloEleitorParts = {
	baseNumerals: string;
	ufCode: string;
	verifierDigits: string;
};

export class TituloEleitor {
	private static readonly ANY_NON_DIGIT_REGEX = /[^\d]/g;

	private static readonly TITULO_BASE_NUMERALS_LENGTH = 8;
	private static readonly TITULO_UF_CODE_RANGE: [number, number] = [1, 28];
	private static readonly TITULO_PARTS_REGEX = /^(\d{8,9})(\d{2})(\d{2})$/;

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

	/**
	 * PT-BR: Verifica se o título de eleitor é válido.
	 *
	 * EN: Checks if the voter registration is valid.
	 *
	 * @param tituloE Número do título de eleitor.
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
		if (!tituloE) return false;

		tituloE = this.clear(tituloE);

		if (tituloE.length !== 12 && tituloE.length !== 13) return false;

		const parts = this.extractParts(tituloE);

		if (!parts) return false;

		const { baseNumerals, ufCode } = parts;

		if (!this.isUfKey(ufCode)) return false;

		const ufName = this.UF_MAP[ufCode];

		const verifierDigits = this.generateVerifierDigits(
			baseNumerals,
			ufCode,
			ufName
		);

		return tituloE.endsWith(verifierDigits);
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
		const baseDigits = Random.generateRandomNumber(
			this.TITULO_BASE_NUMERALS_LENGTH
		).toString();
		const ufCode = Random.generateRandomNumber(this.TITULO_UF_CODE_RANGE)
			.toString()
			.padStart(2, "0");

		if (!this.isUfKey(ufCode)) {
			throw new Error("Invalid UF code");
		}

		const ufName = this.UF_MAP[ufCode];

		return (
			baseDigits +
			ufCode +
			this.generateVerifierDigits(baseDigits, ufCode, ufName)
		);
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

	private static clear(value: string): string {
		return value.toString().replace(this.ANY_NON_DIGIT_REGEX, "");
	}

	private static isUfKey(
		value: number | string
	): value is keyof typeof this.UF_MAP {
		return value in this.UF_MAP;
	}

	private static extractParts(titulo: string): TituloEleitorParts | null {
		const result = this.TITULO_PARTS_REGEX.exec(titulo);

		if (result) {
			return {
				baseNumerals: result[1],
				ufCode: result[2],
				verifierDigits: result[3],
			};
		}

		return null;
	}

	private static generateVerifierDigits(
		digits: string,
		ufCode: keyof typeof this.UF_MAP,
		ufName: (typeof this.UF_MAP)[typeof ufCode]
	): string {
		// Nos títulos emitidos em São Paulo e Minas Gerais, os Dígitos Verificadores assumem o valor 1, caso em seus respectivos processos de cálculo o resto da divisão por 11 seja zero.

		const firstVerifierDigit = Mod11Alg.calculateCheckDigit({
			digits,
			weights: this.FIRST_VERIFIER_DIGIT_WEIGHTS,
			transform: {
				0: ufName === "SP" || ufName === "MG" ? "1" : "0",
			},
			returnModDirectly: true,
		});

		const secondVerifierDigit = Mod11Alg.calculateCheckDigit({
			digits: ufCode + firstVerifierDigit,
			weights: this.SECOND_VERIFIER_DIGIT_WEIGHTS,
			transform: {
				0: ufName === "SP" || ufName === "MG" ? "1" : "0",
			},
			returnModDirectly: true,
		});

		return firstVerifierDigit + secondVerifierDigit;
	}
}
