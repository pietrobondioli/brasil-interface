import {
	ICepAbertoAddress,
	ICepAbertoCity,
	IGetCepByAddressParams,
} from "./cep-aberto.types";

export class CepAbertoAPI {
	private baseUrl = "https://www.cepaberto.com/api/v3";

	constructor(private token: string) {}

	private async fetchJson<T>(url: string): Promise<T> {
		const response = await fetch(url, {
			headers: {
				Authorization: `Token token=${this.token}`,
			},
		});

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
	public async getCepByNumber(cep: string): Promise<ICepAbertoAddress> {
		const url = `${this.baseUrl}/cep?cep=${cep}`;
		return this.fetchJson<ICepAbertoAddress>(url);
	}

	/**
	 * PT-BR: Obtém informações de endereço pelas coordenadas de latitude e longitude.
	 * EN-US: Get address information by latitude and longitude coordinates.
	 *
	 * @param lat PT-BR: A coordenada de latitude. EN-US: The latitude coordinate.
	 * @param lng PT-BR: A coordenada de longitude. EN-US: The longitude coordinate.
	 * @returns PT-BR: As informações de endereço para as coordenadas fornecidas. EN-US: The address information for the provided coordinates.
	 */
	public async getCepByCoordinates(
		lat: number,
		lng: number
	): Promise<ICepAbertoAddress> {
		const url = `${this.baseUrl}/nearest?lat=${lat}&lng=${lng}`;
		return this.fetchJson<ICepAbertoAddress>(url);
	}

	/**
	 * PT-BR: Obtém informações de endereço pelo estado, cidade, rua e bairro.
	 * EN-US: Get address information by state, city, street and neighborhood.
	 *
	 * @param state PT-BR: A sigla do estado. EN-US: The state abbreviation.
	 * @param city PT-BR: O nome da cidade. EN-US: The city name.
	 * @param street PT-BR: O nome da rua (opcional). EN-US: The street name (optional).
	 * @param neighborhood PT-BR: O nome do bairro (opcional). EN-US: The neighborhood name (optional).
	 * @returns PT-BR: As informações de endereço para os parâmetros fornecidos. EN-US: The address information for the provided parameters.
	 */
	public async getCepByAddress(
		state: string,
		city: string,
		street?: string,
		neighborhood?: string
	): Promise<ICepAbertoAddress> {
		const params: IGetCepByAddressParams = {
			estado: state,
			cidade: city,
		};
		if (street) params.logradouro = street;
		if (neighborhood) params.bairro = neighborhood;

		const url = `${this.baseUrl}/address?${new URLSearchParams(
			params
		).toString()}`;
		return this.fetchJson<ICepAbertoAddress>(url);
	}

	/**
	 * PT-BR: Obtém uma lista de cidades em um determinado estado.
	 * EN-US: Get a list of cities in a given state.
	 *
	 * @param state PT-BR: A sigla do estado. EN-US: The state abbreviation.
	 * @returns PT-BR: Uma lista de cidades no estado fornecido. EN-US: A list of cities in the provided state.
	 */
	public async getCitiesByState(state: string): Promise<ICepAbertoCity[]> {
		const url = `${this.baseUrl}/cities?estado=${state}`;
		return this.fetchJson<ICepAbertoCity[]>(url);
	}

	/**
	 * PT-BR: Atualiza uma lista de números de CEP.
	 * EN-US: Update a list of CEP numbers.
	 *
	 * @param ceps PT-BR: Um array de números de CEP. EN-US: An array of CEP numbers.
	 * @returns PT-BR: Uma lista de números de CEP atualizados. EN-US: A list of updated CEP numbers.
	 */
	public async updateCeps(ceps: string[]): Promise<string[]> {
		const url = `${this.baseUrl}/update`;
		const response = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Token token=${this.token}`,
			},
			body: JSON.stringify({ ceps }),
		});

		if (!response.ok) {
			throw new Error(
				`Failed to update CEPs: ${response.status} ${response.statusText}`
			);
		}

		return response.json();
	}
}
