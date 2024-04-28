import { request } from "@/helpers/request";
import { BRASIL_API_URL } from "../constants";
import { Taxa } from "./Taxas.types";

export class Taxas {
  /**
   * PT-BR: Retorna as taxas de juros e alguns índices oficiais do Brasil.
   * EN-US: Returns the interest rates and some official indices of Brazil.
   *
   * @returns PT-BR: Uma lista de objetos contendo o nome e o valor das taxas. EN-US: A list of objects containing the name and value of the rates.
   *
   * @example
   * ```typescript
   * const Taxas = new BrasilApi.Taxas();
   *
   * const taxas = await Taxas.getTaxas();
   *
   * console.log(taxas);
   * // [
   * //   {
   * //     "nome": "CDI",
   * //     "valor": 7.65
   * //   },
   * //   ...
   * // ]
   * ```
   */
  public async getTaxas() {
    // const response = await fetch(`${BRASIL_API_URL}/v1`);
    const response = await request<Taxa[]>(`${BRASIL_API_URL}/v1`, {
      method: "GET",
    });

    return response;
  }

  /**
   * PT-BR: Busca as informações de uma taxa a partir do seu nome/sigla.
   * EN-US: Searches for information about a rate from its name/abbreviation.
   *
   * @param sigla PT-BR: A sigla da taxa. EN-US: The abbreviation of the rate.
   * @returns PT-BR: Um objeto contendo o nome e o valor da taxa. EN-US: An object containing the name and value of the rate.
   *
   * @example
   * ```typescript
   * const Taxas = new BrasilApi.Taxas();
   *
   * const cdi = await Taxas.getTaxa("CDI");
   *
   * console.log(cdi);
   * // {
   * //   "nome": "CDI",
   * //   "valor": 7.65
   * // }
   * ```
   */
  public async getTaxa(sigla: string) {
    const response = await request<Taxa>(`${BRASIL_API_URL}/v1/${sigla}`, {
      method: "GET",
    });

    return response;
  }
}
