export class Mod11Alg {
	/**
	 * PT-BR: Calcula o digito verificador de uma string numérica usando o algoritmo Mod11.
	 *
	 * EN: Calculates the check digit of a numeric string using the Mod11 algorithm.
	 *
	 * @param number PT-BR: O número a ser calculado. EN: The number to be calculated.
	 * @param weights PT-BR: Os pesos a serem usados no cálculo. EN: The weights to be used in the calculation.
	 * @param direction PT-BR: A direção do cálculo. EN: The calculation direction. Default: "left".
	 * @param resultFor10 PT-BR: O resultado que deve ser retornado caso o digito verificador seja 10. EN: The result to be returned if the check digit is 10. Default: "0".
	 * @param resultFor11 PT-BR: O resultado que deve ser retornado caso o digito verificador seja 11. EN: The result to be returned if the check digit is 11. Default: "0".
	 * @param returnMod PT-BR: Se o resto da divisão deve ser retornado ao invés do digito verificador. Em alguns casos, o digito verificador é calculado usando o resto da divisão. EN: If the remainder of the division should be returned instead of the check digit. In some cases, the check digit is calculated using the remainder of the division. Default: false.
	 * @returns PT-BR: O digito verificador calculado. EN: The calculated check digit.
	 *
	 * @example
	 * ```
	 * Mod11Alg.calculateCheckDigit("520298940001", [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4]); // 6
	 * Mod11Alg.calculateCheckDigit("520298940001", [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3]); // 1
	 * ```
	 *
	 * @author Pietro Bondioli
	 */
	public static calculateCheckDigit({
		digits,
		weights,
		direction = "fromLeft",
		resultFor10 = "0",
		resultFor11 = "0",
	}: {
		digits: string;
		weights: number[];
		direction?: "fromLeft" | "fromRight";
		resultFor10?: string;
		resultFor11?: string;
	}): string {
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

		const mod = sum % 11;

		const checkDigit = 11 - mod;

		if (checkDigit === 10) {
			return resultFor10;
		}
		if (checkDigit === 11) {
			return resultFor11;
		}
		return checkDigit.toString();
	}
}
