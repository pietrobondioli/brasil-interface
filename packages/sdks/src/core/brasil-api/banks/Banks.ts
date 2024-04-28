import { request } from "@/helpers/request";
import { BRASIL_API_URL } from "../constants";
import { Bank } from "./Banks.types";

export class Banks {
  /**
   * 	PT-BR: Obtém informações de todos os bancos do Brasil.
   * 	EN-US: Get information about all banks in Brazil.
   *
   * @returns PT-BR: As informações de todos os bancos do Brasil. EN-US: Information about all banks in Brazil.
   *
   * @example
   * ```typescript
   * const banks = await Banks.getAllBanks();
   *
   * console.log(banks);
   * // [
   * //   {
   * //     "ispb": "00000000",
   * //     "name": "BCO DO BRASIL S.A.",
   * //     "code": 1,
   * //     "fullName": "Banco do Brasil S.A."
   * //   },
   * //   {
   * //     "ispb": "00000000",
   * //     "name": "BCO DO BRASIL S.A.",
   * //     "code": 1,
   * //     "fullName": "Banco do Brasil S.A."
   * //   },
   * // ]
   * ```
   */
  public async getAllBanks() {
    const response = await request<Bank[]>(`${BRASIL_API_URL}/banks/v1`, {
      method: "GET",
    });

    return response;
  }

  /**
   * PT-BR: Obtém informações de um banco pelo código.
   * EN-US: Get information about a bank by code.
   *
   * @param code PT-BR: O código do banco. EN-US: The bank code.
   * @returns PT-BR: As informações do banco. EN-US: The bank information.
   *
   * @example
   * ```typescript
   * const bank = await Banks.getBankByCode(1);
   *
   * console.log(bank);
   * // {
   * //   "ispb": "00000000",
   * //   "name": "BCO DO BRASIL S.A.",
   * //   "code": 1,
   * //   "fullName": "Banco do Brasil S.A."
   * // }
   * ```
   */
  public async getBankByCode(code: number) {
    const response = await request<Bank>(`${BRASIL_API_URL}/banks/v1/${code}`, {
      method: "GET",
    });

    return response;
  }
}
