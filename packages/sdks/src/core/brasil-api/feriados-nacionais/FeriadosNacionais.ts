import { FetchJson } from "@/helpers/fetch-json";
import { BRASIL_API_URL } from "../constants";
import { Feriado } from "./FeriadosNacionais.types";

export class FeriadosNacionais {
	private readonly http = new FetchJson(`${BRASIL_API_URL}/feriados/v1`);

	/**
	 * PT-BR: Lista os feriados nacionais de determinado ano.
	 * EN-US: Lists the national holidays for a given year.
	 *
	 * @param year PT-BR: O ano para calcular os feriados. EN-US: The year to calculate the holidays.
	 * @returns PT-BR: A lista de feriados nacionais. EN-US: The list of national holidays.
	 *
	 * @example
	 * ```typescript
	 * const FeriadosNacionais = new BrasilApi.FeriadosNacionais();
	 *
	 * const feriadosData = await FeriadosNacionais.getFeriadosNacionais(2022);
	 *
	 * console.log(feriadosData);
	 * // [
	 * //   {
	 * //     "date": "2022-01-01",
	 * //     "type": "FIXED",
	 * //     "name": "Confraternização Universal",
	 * //     "fullName": "Confraternização Universal"
	 * //   }
	 * // ]
	 * ```
	 */
	public async getFeriadosNacionais(year: number) {
		const response = await this.http.get<Feriado[]>(`${year}`);

		return response.data;
	}
}
