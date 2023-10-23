import { FetchJson } from "@/helpers/fetch-json";
import { BRASIL_API_URL } from "../constants";
import { AddressV2 } from "./CEPv2.types";

export class CEPv2 {
	private readonly http = new FetchJson(`${BRASIL_API_URL}/cep/v2`);

	/**
	 * PT-BR: Busca por CEP com múltiplos providers de fallback.
	 * EN-US: Search for a CEP with multiple fallback providers.
	 *
	 * @param cep PT-BR: O CEP a ser buscado. EN-US: The CEP to search for.
	 * @returns PT-BR: As informações do endereço correspondente ao CEP. EN-US: The address information for the corresponding CEP.
	 *
	 * @example
	 * ```typescript
	 * const CEPv2 = new BrasilApi.CEPv2();
	 *
	 * const cep = await CEPv2.getCepByNumber(89010025);
	 *
	 * console.log(cep);
	 * // {
	 * //   "cep": "89010025",
	 * //   "state": "SC",
	 * //   "city": "Blumenau",
	 * //   "neighborhood": "Centro",
	 * //   "street": "Rua Doutor Luiz de Freitas Melro",
	 * //   "service": "viacep",
	 * //   "location": {
	 * //     "type": "Point",
	 * //     "coordinates": {
	 * //       "longitude": "-49.0629788",
	 * //       "latitude": "-26.9244749"
	 * //     }
	 * //   }
	 * // }
	 * ```
	 */
	public async getCepByNumber(cep: number) {
		const response = await this.http.get<AddressV2>(`/${cep}`);

		return response.data;
	}
}
