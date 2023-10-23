import { FetchJson } from "@/helpers/fetch-json";
import { BRASIL_API_URL } from "../constants";
import { CNPJInfo } from "./CNPJ.types";

export class CNPJ {
	private readonly http = new FetchJson(`${BRASIL_API_URL}/cnpj/v1`);

	/**
	 * PT-BR: Busca dados de empresas por CNPJ.
	 * EN-US: Search for company data by CNPJ.
	 *
	 * @param cnpj PT-BR: O CNPJ da empresa a ser buscada. EN-US: The CNPJ of the company to search for.
	 * @returns PT-BR: As informações da empresa correspondente ao CNPJ. EN-US: The company information for the corresponding CNPJ.
	 *
	 * @example
	 * ```typescript
	 * const CNPJ = new BrasilApi.CNPJ();
	 *
	 * const cnpjData = await CNPJ.getCnpjData("19131243000197");
	 *
	 * console.log(cnpjData);
	 * // {
	 * //   "cnpj": "19131243000197",
	 * //   "identificador_matriz_filial": 1,
	 * //   "descricao_matriz_filial": "Matriz",
	 * //   "razao_social": "OPEN KNOWLEDGE BRASIL",
	 * //   "nome_fantasia": "REDE PELO CONHECIMENTO LIVRE",
	 * //   "situacao_cadastral": 2,
	 * //   "descricao_situacao_cadastral": "Ativa",
	 * //   "data_situacao_cadastral": "2013-10-03",
	 * //   "motivo_situacao_cadastral": 0,
	 * //   "nome_cidade_exterior": null,
	 * //   "codigo_natureza_juridica": 3999,
	 * //   "data_inicio_atividade": "2013-10-03",
	 * //   "cnae_fiscal": 9430800,
	 * //   "cnae_fiscal_descricao": "Atividades de associações de defesa de direitos sociais",
	 * //   "descricao_tipo_logradouro": "ALAMEDA",
	 * //   "logradouro": "FRANCA",
	 * //   "numero": "144",
	 * //   "complemento": "APT   34",
	 * //   "bairro": "JARDIM PAULISTA",
	 * //   "cep": 1422000,
	 * //   "uf": "SP",
	 * //   "codigo_municipio": 7107,
	 * //   "municipio": "SAO PAULO",
	 * //   "ddd_telefone_1": "11  23851939",
	 * //   "ddd_telefone_2": null,
	 * //   "ddd_fax": null,
	 * //   "qualificacao_do_responsavel": 10,
	 * //   "capital_social": 0,
	 * //   "porte": 5,
	 * //   "descricao_porte": "Demais",
	 * //   "opcao_pelo_simples": false,
	 * //   "data_opcao_pelo_simples": null,
	 * //   "data_exclusao_do_simples": null,
	 * //   "opcao_pelo_mei": false,
	 * //   "situacao_especial": null,
	 * //   "data_situacao_especial": null,
	 * //   "cnaes_secundarios": [
	 * //     {
	 * //       "codigo": 9493600,
	 * //       "descricao": "Atividades de organizações associativas ligadas à cultura e à arte"
	 * //     },
	 * //     {},
	 * //     {},
	 * //     {},
	 * //     {}
	 * //   ],
	 * //   "qsa": [
	 * //     {
	 * //       "identificador_de_socio": 2,
	 * //       "nome_socio": "NATALIA PASSOS MAZOTTE CORTEZ",
	 * //       "cnpj_cpf_do_socio": "***059967**",
	 * //       "codigo_qualificacao_socio": 10,
	 * //       "percentual_capital_social": 0,
	 * //       "data_entrada_sociedade": "2019-02-14",
	 * //       "cpf_representante_legal": null,
	 * //       "nome_representante_legal": null,
	 * //       "codigo_qualificacao_representante_legal": null
	 * //     }
	 * //   ]
	 * // }
	 * ```
	 */
	public async getCnpjInfo(cnpj: string) {
		const response = await this.http.get<CNPJInfo>(`/${cnpj}`);

		return response.data;
	}
}
