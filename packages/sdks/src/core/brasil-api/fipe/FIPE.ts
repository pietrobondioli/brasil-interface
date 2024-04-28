import { request } from "@/helpers/request";
import { BRASIL_API_URL } from "../constants";
import { MarcaFIPE, TabelaFIPE, VeiculoFIPE } from "./FIPE.types";

export class FIPE {
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
    const response = await request<MarcaFIPE[]>(
      `${BRASIL_API_URL}/marcas/v1/${tipoVeiculo}?tabela_referencia=${tabelaReferencia}`,
      {
        method: "GET",
      },
    );

    return response;
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
    tabelaReferencia?: number,
  ) {
    const response = await request<VeiculoFIPE>(
      `${BRASIL_API_URL}/preco/v1/${codigoFipe}?tabela_referencia=${tabelaReferencia}`,
      { method: "GET" },
    );

    return response;
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
    const response = await request<TabelaFIPE[]>(
      `${BRASIL_API_URL}/tabelas/v1`,
      {
        method: "GET",
      },
    );

    return response;
  }
}
