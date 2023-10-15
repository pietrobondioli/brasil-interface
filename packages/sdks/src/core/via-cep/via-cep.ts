import {
	ViaCepAddress
} from "./via-cep.types";

export class ViaCepAPI {
	private baseUrl = "https://viacep.com.br";

	constructor() {}

	private async fetchJson<T>(url: string): Promise<T> {
		const response = await fetch(url);

		if (!response.ok) {
			throw new Error(
				`Failed to fetch ${url}: ${response.status} ${response.statusText}`
			);
		}

		return response.json();
	}

	/**
	 * PT-BR: Obtém informações de endereço pelo número do CEP.
	 * EN-US: Get address information by CEP number.
	 *
	 * @param cep PT-BR: O número do CEP. EN-US: The CEP number.
	 * @returns PT-BR: As informações de endereço para o CEP fornecido. EN-US: The address information for the provided CEP.
	 */
	public async getCepByNumber(cep: string): Promise<ViaCepAddress> {
		const url = `${this.baseUrl}/ws/${cep}/json/`;
		return this.fetchJson<ViaCepAddress>(url);
	}
}