export class ModAlg {
	/**
	 * PT-BR: Calcula o digito verificador de uma string numérica usando o algoritmo Mod11.
	 *
	 * EN: Calculates the check digit of a numeric string using the Mod11 algorithm.
	 *
	 * @param modAlg PT-BR: O módulo a ser usado no cálculo. Útil para casos onde o dígito verificador é calculado utilizando apenas o resto da divisão. EN: The module to be used in the calculation. Useful for cases where the check digit is calculated using only the remainder of the division.
	 * @param algReturnType PT-BR: O tipo de retorno do algoritmo. EN: The algorithm return type.
	 * @param digits PT-BR: O número a ser calculado. EN: The number to be calculated.
	 * @param weights PT-BR: Os pesos a serem usados no cálculo. EN: The weights to be used in the calculation.
	 * @param direction PT-BR: A direção do cálculo. EN: The calculation direction. Default: "left".
	 * @param transform PT-BR: Um objeto que mapeia o resultado do módulo para um valor específico. Útil pois em diversos casos certos valores não são aceitos como dígito verificador. EN: An object that maps the module result to a specific value. Useful because in several cases certain values are not accepted as a check digit.
	 * @param additionalSum PT-BR: Um array de valores a serem somados ao resultado final. Útil para casos onde o dígito verificador é calculado de forma diferente. EN: An array of values to be added to the final result. Useful for cases where the check digit is calculated differently.
	 * @returns PT-BR: O digito verificador calculado. EN: The calculated check digit.
	 *
	 * @example
	 * ```
	 * ModAlg.calculateCheckDigit({
	 *  algReturnType: "modComplement",
	 *  modAlg: 11,
	 *  direction: "fromLeft",
	 *  digits: "20359338",
	 *  weights: [2, 3, 4, 5, 6, 7, 8, 9],
	 * }); // "8"
	 * ```
	 *
	 * @author Pietro Bondioli
	 */
	public static calculateCheckDigit({
		modAlg,
		algReturnType,
		digits,
		weights,
		direction,
		transform = {},
		additionalSum = [],
	}: {
		modAlg: number;
		algReturnType: "mod" | "modComplement";
		digits: string;
		weights: number[];
		direction: "fromLeft" | "fromRight";
		transform?: { [k: number]: string };
		additionalSum?: number[];
	}): string {
		transform = {
			10: "0",
			11: "0",
			...transform,
		};

		const results = this.multiplyByWeights(digits, weights, direction);

		const sum = this.sum([...results, ...additionalSum]);

		const mod = this.mod(modAlg, sum);

		const checkDigit =
			algReturnType === "mod" ? mod : this.modComplement(modAlg, sum);

		if (transform[checkDigit]) {
			return transform[checkDigit];
		}

		return checkDigit.toString();
	}

	/**
	 * PT-BR: Multiplica os dígitos de uma string numérica pelos pesos especificados.
	 *
	 * EN: Multiplies the digits of a numeric string by the specified weights.
	 *
	 * @param digits PT-BR: A string numérica a ser multiplicada. EN: The numeric string to be multiplied.
	 * @param weights PT-BR: Os pesos a serem usados na multiplicação. EN: The weights to be used in the multiplication.
	 * @returns PT-BR: Um array com os resultados da multiplicação. EN: An array with the multiplication results.
	 *
	 * @example
	 * ```
	 * ModAlg.multiplyByWeights("203593", [1, 2, 3, 4, 5, 6], "fromLeft"); // [2, 0, 9, 20, 45, 18]
	 * ```
	 */
	public static multiplyByWeights(
		digits: string,
		weights: number[],
		direction: "fromLeft" | "fromRight" = "fromLeft"
	): number[] {
		const results: number[] = [];
		const iterDigits =
			direction === "fromRight" ? digits.split("").reverse().join("") : digits;

		for (let i = 0; i < iterDigits.length; i++) {
			const digit = parseInt(iterDigits.charAt(i), 10);
			const weight = weights[i % weights.length];
			results.push(digit * weight);
		}

		return results;
	}

	/**
	 * PT-BR: Soma os valores de um array de números.
	 *
	 * EN: Sums the values of an array of numbers.
	 *
	 * @param results PT-BR: O array de números a serem somados. EN: The array of numbers to be summed.
	 * @returns PT-BR: A soma dos valores. EN: The sum of the values.
	 *
	 * @example
	 * ```
	 * ModAlg.sum([1, 2, 3]); // 6
	 * ```
	 */
	public static sum(results: number[]): number {
		return results.reduce((acc, curr) => acc + curr, 0);
	}

	/**
	 * PT-BR: Soma os dígitos de um array de números.
	 *
	 * EN: Sums the digits of an array of numbers.
	 *
	 * @param results PT-BR: O array de números a serem somados. EN: The array of numbers to be summed.
	 * @returns PT-BR: A soma dos dígitos. EN: The sum of the digits.
	 *
	 * @example
	 * ```
	 * ModAlg.sumNumerals([1, 24, 3]); // 10
	 * ```
	 */
	public static sumNumerals(results: number[]): number {
		return results
			.map((n) => n.toString())
			.reduce<string[]>((acc, curr) => [...acc, ...curr], [])
			.map((n) => parseInt(n, 10))
			.reduce((acc, curr) => acc + curr, 0);
	}

	/**
	 * PT-BR: Calcula o resto da divisão de um número por um módulo.
	 *
	 * EN: Calculates the remainder of a number divided by a module.
	 *
	 * @param modAlg PT-BR: O módulo a ser usado no cálculo. EN: The module to be used in the calculation.
	 * @param sum PT-BR: O número a ser dividido. EN: The number to be divided.
	 * @returns PT-BR: O resto da divisão. EN: The remainder of the division.
	 *
	 * @example
	 * ```
	 * ModAlg.mod(11, 100); // 1
	 * ```
	 */
	public static mod(modAlg: number, sum: number): number {
		return sum % modAlg;
	}

	/**
	 * PT-BR: Calcula o complemento de um número por um módulo.
	 *
	 * EN: Calculates the complement of a number by a module.
	 *
	 * @param modAlg PT-BR: O módulo a ser usado no cálculo. EN: The module to be used in the calculation.
	 * @param sum PT-BR: O número a ser complementado. EN: The number to be complemented.
	 * @returns PT-BR: O complemento. EN: The complement.
	 *
	 * @example
	 * ```
	 * ModAlg.modComplement(11, 100); // 10
	 * ```
	 */
	public static modComplement(modAlg: number, sum: number): number {
		return modAlg - (sum % modAlg);
	}
}
