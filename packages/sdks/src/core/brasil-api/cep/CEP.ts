import { FetchJson } from "@/helpers/fetch-json";
import { BRASIL_API_URL } from "../constants";
import { Address } from "./CEP.types";

export class CEP {
	private readonly http = new FetchJson(`${BRASIL_API_URL}/cep/v1`);

	/**
	 * PT-BR: Busca por CEP com múltiplos providers de fallback.
	 * EN-US: Search for a CEP with multiple fallback providers.
	 *
	 * @param cep PT-BR: O CEP a ser buscado. EN-US: The CEP to search for.
	 * @returns PT-BR: As informações do endereço correspondente ao CEP. EN-US: The address information for the corresponding CEP.
	 *
	 * @example
	 * ```typescript
	 * const CEP = new BrasilApi.CEP();
	 *
	 * const cep = await CEP.getCepByNumber(89010025);
	 *
	 * console.log(cep);
	 * // {
	 * //   "cep": "89010025",
	 * //   "state": "SC",
	 * //   "city": "Blumenau",
	 * //   "neighborhood": "Centro",
	 * //   "street": "Rua Doutor Luiz de Freitas Melro",
	 * //   "service": "viacep"
	 * // }
	 * ```
	 */
	public async getCepByNumber(cep: number) {
		const response = await this.http.get<Address>(`/${cep}`);

		return response.data;
	}
}
