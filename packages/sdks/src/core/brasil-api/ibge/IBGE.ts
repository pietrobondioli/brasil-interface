import { FetchJson } from "@/helpers/fetch-json";
import { BRASIL_API_URL } from "../constants";
import { Estado, Municipio } from "./IBGE.types";

export class IBGE {
	private readonly http = new FetchJson(`${BRASIL_API_URL}/ibge`);

	/**
	 * PT-BR: Retorna os municípios da unidade federativa.
	 * EN-US: Returns the municipalities of the federative unit.
	 *
	 * @param uf PT-BR: A sigla da unidade federativa. EN-US: The abbreviation of the federative unit.
	 * @param providers PT-BR: Lista de provedores separados por vírgula. EN-US: List of providers separated by commas.
	 * @returns PT-BR: Uma lista de objetos contendo o nome e o código IBGE dos municípios. EN-US: A list of objects containing the name and IBGE code of the municipalities.
	 *
	 * @example
	 * ```typescript
	 * const IBGE = new BrasilApi.IBGE();
	 *
	 * const municipios = await IBGE.getMunicipios("SP", "dados-abertos-br,gov,wikipedia");
	 *
	 * console.log(municipios);
	 * // [
	 * //   {
	 * //     "nome": "Tubarão",
	 * //     "codigo_ibge": "421870705"
	 * //   },
	 * //   {
	 * //     "nome": "Tunápolis",
	 * //     "codigo_ibge": "421875605"
	 * //   },
	 * //   ...
	 * // ]
	 * ```
	 */
	public async getMunicipios(uf: string, providers: string) {
		const response = await this.http.get<Municipio[]>(
			`/municipios/v1/${uf}?providers=${providers}`
		);

		return response.data;
	}

	/**
	 * PT-BR: Retorna informações de todos estados do Brasil.
	 * EN-US: Returns information about all Brazilian states.
	 *
	 * @returns PT-BR: Uma lista de objetos contendo o ID, a sigla, o nome e a região dos estados. EN-US: A list of objects containing the ID, abbreviation, name and region of the states.
	 *
	 * @example
	 * ```typescript
	 * const IBGE = new BrasilApi.IBGE();
	 *
	 * const estados = await IBGE.getEstados();
	 *
	 * console.log(estados);
	 * // [
	 * //   {
	 * //     "id": 35,
	 * //     "sigla": "SP",
	 * //     "nome": "São Paulo",
	 * //     "regiao": {}
	 * //   },
	 * //   ...
	 * // ]
	 * ```
	 */
	public async getEstados() {
		const response = await this.http.get<Estado[]>("/uf/v1");

		return response.data;
	}

	/**
	 * PT-BR: Retorna informações de um estado a partir da sigla ou código.
	 * EN-US: Returns information about a state from its abbreviation or code.
	 *
	 * @param code PT-BR: A sigla ou código do estado. EN-US: The abbreviation or code of the state.
	 * @returns PT-BR: Um objeto contendo o ID, a sigla, o nome e a região do estado. EN-US: An object containing the ID, abbreviation, name and region of the state.
	 *
	 * @example
	 * ```typescript
	 * const IBGE = new BrasilApi.IBGE();
	 *
	 * const estado = await IBGE.getEstado("SP");
	 *
	 * console.log(estado);
	 * // {
	 * //   "id": 35,
	 * //   "sigla": "SP",
	 * //   "nome": "São Paulo",
	 * //   "regiao": {
	 * //     "id": 3,
	 * //     "sigla": "SE",
	 * //     "nome": "Sudeste"
	 * //   }
	 * // }
	 * ```
	 */
	public async getEstado(code: string) {
		const response = await this.http.get<Estado>(`/uf/v1/${code}`);

		return response.data;
	}
}
