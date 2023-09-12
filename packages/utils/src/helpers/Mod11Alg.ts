export class Mod11Alg {
	/**
	 * PT-BR: Calcula o digito verificador de uma string numérica usando o algoritmo Mod11.
	 *
	 * EN: Calculates the check digit of a numeric string using the Mod11 algorithm.
	 *
	 * @param number PT-BR: O número a ser calculado. EN: The number to be calculated.
	 * @param weights PT-BR: Os pesos a serem usados no cálculo. EN: The weights to be used in the calculation.
	 * @param direction PT-BR: A direção do cálculo. EN: The calculation direction. Default: "left".
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
	public static calculateCheckDigit(
		number: string,
		weights: number[],
		direction: "left" | "right" = "left"
	): number {
		let sum = 0;
		let weightIndex = 0;

		// If direction is 'right', we'll reverse the number so the logic within the loop remains consistent.
		const iterNumber =
			direction === "right" ? number.split("").reverse().join("") : number;

		for (let i = 0; i < iterNumber.length; i++) {
			const digit = parseInt(iterNumber.charAt(i), 10);
			sum += digit * weights[weightIndex];
			weightIndex++;

			if (weightIndex >= weights.length) {
				weightIndex = 0;
			}
		}

		const mod = sum % 11;
		return mod < 2 ? 0 : 11 - mod;
	}
}
