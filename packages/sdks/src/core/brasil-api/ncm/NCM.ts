import { FetchJson } from "@/helpers/fetch-json";
import { BRASIL_API_URL } from "../constants";
import { NCMInfo } from "./NCM.types";

export class NCM {
	private readonly http = new FetchJson(`${BRASIL_API_URL}/ncm`);

	/**
	 * PT-BR: Retorna informações de todos os NCMs.
	 * EN-US: Returns information about all NCMs.
	 *
	 * @returns PT-BR: Uma lista de objetos contendo o código, a descrição, a data de início, a data de fim, o tipo de ato, o número do ato e o ano do ato. EN-US: A list of objects containing the code, description, start date, end date, type of act, act number and year of the act.
	 *
	 * @example
	 * ```typescript
	 * const NCM = new BrasilApi.NCM();
	 *
	 * const ncms = await NCM.getNCMs();
	 *
	 * console.log(ncms);
	 * // [
	 * //   {
	 * //     "codigo": "3305.10.00",
	 * //     "descricao": "- Xampus",
	 * //     "data_inicio": "2022-04-01",
	 * //     "data_fim": "9999-12-31",
	 * //     "tipo_ato": "Res Camex",
	 * //     "numero_ato": "000272",
	 * //     "ano_ato": "2021"
	 * //   },
	 * //   ...
	 * // ]
	 * ```
	 */
	public async getNCMs() {
		const response = await this.http.get<NCMInfo[]>("/v1");

		return response.data;
	}

	/**
	 * PT-BR: Pesquisa por NCMs a partir de um código ou descrição.
	 * EN-US: Searches for NCMs from a code or description.
	 *
	 * @param search PT-BR: O código ou descrição do NCM. EN-US: The code or description of the NCM.
	 * @returns PT-BR: Uma lista de objetos contendo o código, a descrição, a data de início, a data de fim, o tipo de ato, o número do ato e o ano do ato. EN-US: A list of objects containing the code, description, start date, end date, type of act, act number and year of the act.
	 *
	 * @example
	 * ```typescript
	 * const NCM = new BrasilApi.NCM();
	 *
	 * const ncms = await NCM.searchNCMs("3305");
	 *
	 * console.log(ncms);
	 * // [
	 * //   {
	 * //     "codigo": "3305.10.00",
	 * //     "descricao": "- Xampus",
	 * //     "data_inicio": "2022-04-01",
	 * //     "data_fim": "9999-12-31",
	 * //     "tipo_ato": "Res Camex",
	 * //     "numero_ato": "000272",
	 * //     "ano_ato": "2021"
	 * //   },
	 * //   ...
	 * // ]
	 * ```
	 */
	public async searchNCMs(search: string) {
		const response = await this.http.get<NCMInfo[]>(`/v1?search=${search}`);

		return response.data;
	}

	/**
	 * PT-BR: Busca as informações de um NCM a partir de um código.
	 * EN-US: Searches for information about an NCM from a code.
	 *
	 * @param code PT-BR: O código do NCM. EN-US: The code of the NCM.
	 * @returns PT-BR: Um objeto contendo o código, a descrição, a data de início, a data de fim, o tipo de ato, o número do ato e o ano do ato. EN-US: An object containing the code, description, start date, end date, type of act, act number and year of the act.
	 *
	 * @example
	 * ```typescript
	 * const NCM = new BrasilApi.NCM();
	 *
	 * const ncm = await NCM.getNCM("3305.10.00");
	 *
	 * console.log(ncm);
	 * // {
	 * //   "codigo": "3305.10.00",
	 * //   "descricao": "- Xampus",
	 * //   "data_inicio": "2022-04-01",
	 * //   "data_fim": "9999-12-31",
	 * //   "tipo_ato": "Res Camex",
	 * //   "numero_ato": "000272",
	 * //   "ano_ato": "2021"
	 * // }
	 * ```
	 */
	public async getNCM(code: string) {
		const response = await this.http.get<NCMInfo>(`/v1/${code}`);

		return response.data;
	}
}
