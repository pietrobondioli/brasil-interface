export class ModAlg {
	/**
	 * PT-BR: Calcula o digito verificador de uma string numérica usando o algoritmo Mod11.
	 *
	 * EN: Calculates the check digit of a numeric string using the Mod11 algorithm.
	 *
	 * @param modAlg PT-BR: O módulo a ser usado no cálculo. EN: The module to be used in the calculation.
	 * @param digits PT-BR: O número a ser calculado. EN: The number to be calculated.
	 * @param weights PT-BR: Os pesos a serem usados no cálculo. EN: The weights to be used in the calculation.
	 * @param direction PT-BR: A direção do cálculo. EN: The calculation direction. Default: "left".
	 * @param transform PT-BR: Um objeto que mapeia o resultado do módulo para um valor específico. Útil pois em diversos casos certos valores não são aceitos como dígito verificador. EN: An object that maps the module result to a specific value. Useful because in several cases certain values are not accepted as a check digit.
	 * @param returnModDirectly PT-BR: Se verdadeiro, retorna o resultado do módulo ao invés do dígito verificador. Útil para casos onde o dígito verificador é calculado de forma diferente. EN: If true, returns the module result instead of the check digit. Useful for cases where the check digit is calculated differently.
	 * @param additionalSum PT-BR: Um array de valores a serem somados ao resultado final. Útil para casos onde o dígito verificador é calculado de forma diferente. EN: An array of values to be added to the final result. Useful for cases where the check digit is calculated differently.
	 * @returns PT-BR: O digito verificador calculado. EN: The calculated check digit.
	 *
	 * @example
	 * ```
	 * ModAlg.calculateCheckDigit({
	 *  modAlg: 11,
	 *  digits: "20359338",
	 *  weights: [2, 3, 4, 5, 6, 7, 8, 9],
	 * }); // "8"
	 * ```
	 *
	 * @author Pietro Bondioli
	 */
	public static calculateCheckDigit({
		modAlg,
		digits,
		weights,
		direction = "fromLeft",
		transform,
		returnModDirectly = false,
		additionalSum = [],
	}: {
		modAlg: number;
		digits: string;
		weights: number[];
		direction?: "fromLeft" | "fromRight";
		transform?: { [k: number]: string };
		returnModDirectly?: boolean;
		additionalSum?: number[];
	}): string {
		transform = {
			10: "0",
			11: "0",
			...transform,
		};

		let sum = 0;
		let weightIndex = 0;

		// If direction is 'right', we'll reverse the number so the logic within the loop remains consistent.
		const iterDigits =
			direction === "fromRight" ? digits.split("").reverse().join("") : digits;

		for (let i = 0; i < iterDigits.length; i++) {
			const digit = parseInt(iterDigits.charAt(i), 10);
			sum += digit * weights[weightIndex];
			weightIndex++;

			if (weightIndex >= weights.length) {
				weightIndex = 0;
			}
		}

		additionalSum.forEach((value) => {
			sum += value;
		});

		const mod = sum % modAlg;

		let checkDigit = returnModDirectly ? mod : modAlg - mod;

		if (transform?.[checkDigit]) {
			return transform[checkDigit];
		}

		return checkDigit.toString();
	}
}
