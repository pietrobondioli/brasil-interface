import { FetchJson } from "@/helpers/fetch-json";
import { BRASIL_API_URL } from "../constants";
import { MarcaFIPE, TabelaFIPE, VeiculoFIPE } from "./FIPE.types";

export class FIPE {
	private readonly http = new FetchJson(`${BRASIL_API_URL}/fipe/v1`);

	/**
	 * PT-BR: Lista as marcas de veículos referente ao tipo de veículo.
	 * EN-US: Lists the vehicle brands for the vehicle type.
	 *
	 * @param tipoVeiculo PT-BR: O tipo de veículo. EN-US: The vehicle type.
	 * @param tabelaReferencia PT-BR: O código da tabela fipe de referência. EN-US: The fipe reference table code.
	 * @returns PT-BR: A lista de marcas de veículos. EN-US: The list of vehicle brands.
	 *
	 * @example
	 * ```typescript
	 * const FIPE = new BrasilApi.FIPE();
	 *
	 * const marcasData = await FIPE.getMarcas("carros");
	 *
	 * console.log(marcasData);
	 * // [
	 * //   {
	 * //     "nome": "AGRALE",
	 * //     "valor": "102"
	 * //   }
	 * // ]
	 * ```
	 */
	public async getMarcas(tipoVeiculo: string, tabelaReferencia?: number) {
		const response = await this.http.get<MarcaFIPE[]>(
			`/marcas/v1/${tipoVeiculo}`,
			{
				query: { tabela_referencia: tabelaReferencia?.toString() },
			}
		);

		return response.data;
	}

	/**
	 * PT-BR: Consulta o preço do veículo segundo a tabela fipe.
	 * EN-US: Consults the vehicle price according to the fipe table.
	 *
	 * @param codigoFipe PT-BR: O código fipe do veículo. EN-US: The fipe code of the vehicle.
	 * @param tabelaReferencia PT-BR: O código da tabela fipe de referência. EN-US: The fipe reference table code.
	 * @returns PT-BR: As informações do veículo. EN-US: The vehicle information.
	 *
	 * @example
	 * ```typescript
	 * const FIPE = new BrasilApi.FIPE();
	 *
	 * const veiculoData = await FIPE.getVeiculoPorCodigoFipe("001004-9");
	 *
	 * console.log(veiculoData);
	 * // {
	 * //   "valor": "R$ 6.022,00",
	 * //   "marca": "Fiat",
	 * //   "modelo": "Palio EX 1.0 mpi 2p",
	 * //   "anoModelo": 1998,
	 * //   "combustivel": "Álcool",
	 * //   "codigoFipe": "001004-9",
	 * //   "mesReferencia": "junho de 2021 ",
	 * //   "tipoVeiculo": 1,
	 * //   "siglaCombustivel": "Á",
	 * //   "dataConsulta": "segunda-feira, 7 de junho de 2021 23:05"
	 * // }
	 * ```
	 */
	public async getVeiculoPorCodigoFipe(
		codigoFipe: string,
		tabelaReferencia?: number
	) {
		const response = await this.http.get<VeiculoFIPE>(
			`/preco/v1/${codigoFipe}`,
			{
				query: { tabela_referencia: tabelaReferencia },
			}
		);

		return response.data;
	}

	/**
	 * PT-BR: Lista as tabelas de referência existentes.
	 * EN-US: Lists the existing reference tables.
	 *
	 * @returns PT-BR: A lista de tabelas de referência. EN-US: The list of reference tables.
	 *
	 * @example
	 * ```typescript
	 * const FIPE = new BrasilApi.FIPE();
	 *
	 * const tabelasData = await FIPE.getTabelasReferencia();
	 *
	 * console.log(tabelasData);
	 * // [
	 * //   {
	 * //     "codigo": 271,
	 * //     "mes": "junho/2021 "
	 * //   }
	 * // ]
	 * ```
	 */
	public async getTabelasReferencia() {
		const response = await this.http.get<TabelaFIPE[]>("/tabelas/v1");

		return response.data;
	}
}
