import { request } from "@/helpers/request";
import { BRASIL_API_URL } from "../constants";
import { DDDInfo } from "./DDD.types";

export class DDD {
  /**
   * PT-BR: Retorna estado e lista de cidades por DDD.
   * EN-US: Returns state and list of cities by DDD.
   *
   * @param ddd PT-BR: O DDD a ser pesquisado. EN-US: The DDD to be searched.
   * @returns PT-BR: As informações do estado e lista de cidades por DDD. EN-US: The state and list of cities information by DDD.
   *
   * @example
   * ```typescript
   * const DDD = new BrasilApi.DDD();
   *
   * const dddData = await DDD.getEstadoECidadesPorDdd(11);
   *
   * console.log(dddData);
   * // {
   * //   "state": "SP",
   * //   "cities": [
   * //     {
   * //       "nome": "São Paulo",
   * //       "regiao": {
   * //         "nome": "Sudeste",
   * //         "sigla": "SE"
   * //       }
   * //     }
   * //   ]
   * // }
   * ```
   */
  public async getEstadoECidadesPorDdd(ddd: number) {
    const response = await request<DDDInfo>(`${BRASIL_API_URL}/ddd/v1/${ddd}`, {
      method: "GET",
    });

    return response;
  }
}
