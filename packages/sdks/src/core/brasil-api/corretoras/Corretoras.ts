import { FetchJson } from "@/helpers/fetch-json";
import { BRASIL_API_URL } from "../constants";
import { Corretora } from "./Corretoras.types";

export class Corretoras {
	private readonly http = new FetchJson(`${BRASIL_API_URL}/cvm/corretoras/v1`);

	/**
	 * PT-BR: Busca informações sobre corretoras ativas listadas na CVM.
	 * EN-US: Search for information about active brokers listed in CVM.
	 *
	 * @returns PT-BR: As informações das corretoras listadas na CVM. EN-US: The information of the brokers listed in CVM.
	 *
	 * @example
	 * ```typescript
	 * const corretoras = new BrasilApi.Corretoras();
	 *
	 * const corretorasData = await corretoras.getCorretoras();
	 *
	 * console.log(corretorasData);
	 * // [
	 * //   {
	 * //     "bairro": "LEBLON",
	 * //     "cep": "22440032",
	 * //     "cnpj": "02332886000104",
	 * //     "codigo_cvm": "3247",
	 * //     "complemento": "SALA 201",
	 * //     "data_inicio_situacao": "1998-02-10",
	 * //     "data_patrimonio_liquido": "2021-12-31",
	 * //     "data_registro": "1997-12-05",
	 * //     "email": "juridico.regulatorio@xpi.com.br",
	 * //     "logradouro": "AVENIDA ATAULFO DE PAIVA 153",
	 * //     "municipio": "RIO DE JANEIRO",
	 * //     "nome_social": "XP INVESTIMENTOS CCTVM S.A.",
	 * //     "nome_comercial": "XP INVESTIMENTOS",
	 * //     "pais": "",
	 * //     "status": "EM FUNCIONAMENTO NORMAL",
	 * //     "telefone": "30272237",
	 * //     "type": "CORRETORAS",
	 * //     "uf": "RJ",
	 * //     "valor_patrimonio_liquido": "5514593491.29"
	 * //   }
	 * // ]
	 * ```
	 */
	public async getCorretoras() {
		const response = await this.http.get<Corretora[]>("");

		return response.data;
	}

	/**
	 * PT-BR: Busca informações sobre uma corretora ativa listada na CVM pelo CNPJ.
	 * EN-US: Search for information about an active broker listed in CVM by CNPJ.
	 *
	 * @param cnpj PT-BR: O CNPJ da corretora a ser buscada. EN-US: The CNPJ of the broker to search for.
	 * @returns PT-BR: As informações da corretora correspondente ao CNPJ. EN-US: The broker information for the corresponding CNPJ.
	 *
	 * @example
	 * ```typescript
	 * const corretoras = new BrasilApi.Corretoras();
	 *
	 * const corretoraData = await corretoras.getCorretoraByCnpj("02332886000104");
	 *
	 * console.log(corretoraData);
	 * // {
	 * //   "bairro": "LEBLON",
	 * //   "cep": "22440032",
	 * //   "cnpj": "02332886000104",
	 * //   "codigo_cvm": "3247",
	 * //   "complemento": "SALA 201",
	 * //   "data_inicio_situacao": "1998-02-10",
	 * //   "data_patrimonio_liquido": "2021-12-31",
	 * //   "data_registro": "1997-12-05",
	 * //   "email": "juridico.regulatorio@xpi.com.br",
	 * //   "logradouro": "AVENIDA ATAULFO DE PAIVA 153",
	 * //   "municipio": "RIO DE JANEIRO",
	 * //   "nome_social": "XP INVESTIMENTOS CCTVM S.A.",
	 * //   "nome_comercial": "XP INVESTIMENTOS",
	 * //   "pais": "",
	 * //   "status": "EM FUNCIONAMENTO NORMAL",
	 * //   "telefone": "30272237",
	 * //   "type": "CORRETORAS",
	 * //   "uf": "RJ",
	 * //   "valor_patrimonio_liquido": "5514593491.29"
	 * // }
	 * ```
	 */
	public async getCorretoraByCnpj(cnpj: string) {
		const response = await this.http.get<Corretora>(`/${cnpj}`);

		return response.data;
	}
}
