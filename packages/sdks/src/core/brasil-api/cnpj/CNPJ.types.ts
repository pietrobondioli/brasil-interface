/**
 * CNPJ info
 * @example {
 *   "cnpj": "19131243000197",
 *   "identificador_matriz_filial": 1,
 *   "descricao_matriz_filial": "Matriz",
 *   "razao_social": "OPEN KNOWLEDGE BRASIL",
 *   "nome_fantasia": "REDE PELO CONHECIMENTO LIVRE",
 *   "situacao_cadastral": 2,
 *   "descricao_situacao_cadastral": "Ativa",
 *   "data_situacao_cadastral": "2013-10-03",
 *   "motivo_situacao_cadastral": 0,
 *   "nome_cidade_exterior": null,
 *   "codigo_natureza_juridica": 3999,
 *   "data_inicio_atividade": "2013-10-03",
 *   "cnae_fiscal": 9430800,
 *   "cnae_fiscal_descricao": "Atividades de associações de defesa de direitos sociais",
 *   "descricao_tipo_logradouro": "ALAMEDA",
 *   "logradouro": "FRANCA",
 *   "numero": "144",
 *   "complemento": "APT   34",
 *   "bairro": "JARDIM PAULISTA",
 *   "cep": 1422000,
 *   "uf": "SP",
 *   "codigo_municipio": 7107,
 *   "municipio": "SAO PAULO",
 *   "ddd_telefone_1": "11  23851939",
 *   "ddd_telefone_2": null,
 *   "ddd_fax": null,
 *   "qualificacao_do_responsavel": 10,
 *   "capital_social": 0,
 *   "porte": 5,
 *   "descricao_porte": "Demais",
 *   "opcao_pelo_simples": false,
 *   "data_opcao_pelo_simples": null,
 *   "data_exclusao_do_simples": null,
 *   "opcao_pelo_mei": false,
 *   "situacao_especial": null,
 *   "data_situacao_especial": null,
 *   "cnaes_secundarios": [
 *     {
 *       "codigo": 9493600,
 *       "descricao": "Atividades de organizações associativas ligadas à cultura e à arte"
 *     },
 *     {
 *       "codigo": 9499500,
 *       "descricao": "Atividades associativas não especificadas anteriormente"
 *     },
 *     {
 *       "codigo": 8599699,
 *       "descricao": "Outras atividades de ensino não especificadas anteriormente"
 *     },
 *     {
 *       "codigo": 8230001,
 *       "descricao": "Serviços de organização de feiras, congressos, exposições e festas"
 *     },
 *     {
 *       "codigo": 6204000,
 *       "descricao": "Consultoria em tecnologia da informação"
 *     }
 *   ],
 *   "qsa": [
 *     {
 *       "identificador_de_socio": 2,
 *       "nome_socio": "NATALIA PASSOS MAZOTTE CORTEZ",
 *       "cnpj_cpf_do_socio": "***059967**",
 *       "codigo_qualificacao_socio": 10,
 *       "percentual_capital_social": 0,
 *       "data_entrada_sociedade": "2019-02-14",
 *       "cpf_representante_legal": null,
 *       "nome_representante_legal": null,
 *       "codigo_qualificacao_representante_legal": null
 *     }
 *   ]
 * }
 */
export type CNPJ = {
	cnpj?: string;

	/** Format: int32 */
	identificador_matriz_filial?: number;
	descricao_matriz_filial?: string;
	razao_social?: string;
	nome_fantasia?: string;

	/** Format: int32 */
	situacao_cadastral?: number;
	descricao_situacao_cadastral?: string;

	/** Format: date */
	data_situacao_cadastral?: string;

	/** Format: int32 */
	motivo_situacao_cadastral?: number;

	/** Format: nullable */
	nome_cidade_exterior?: string;

	/** Format: int32 */
	codigo_natureza_juridica?: number;

	/** Format: date */
	data_inicio_atividade?: string;

	/** Format: int32 */
	cnae_fiscal?: number;
	cnae_fiscal_descricao?: string;
	descricao_tipo_logradouro?: string;
	logradouro?: string;
	numero?: string;
	complemento?: string;
	bairro?: string;

	/** Format: int32 */
	cep?: number;
	uf?: string;

	/** Format: int32 */
	codigo_municipio?: number;
	municipio?: string;
	ddd_telefone_1?: string;

	/** Format: nullable */
	ddd_telefone_2?: string;

	/** Format: nullable */
	ddd_fax?: string;

	/** Format: int32 */
	qualificacao_do_responsavel?: number;

	/** Format: int32 */
	capital_social?: number;

	/** Format: int32 */
	porte?: number;
	descricao_porte?: string;
	opcao_pelo_simples?: boolean;

	/** Format: nullable */
	data_opcao_pelo_simples?: string;

	/** Format: nullable */
	data_exclusao_do_simples?: string;
	opcao_pelo_mei?: boolean;

	/** Format: nullable */
	situacao_especial?: string;

	/** Format: nullable */
	data_situacao_especial?: string;
	cnaes_secundarios?: {
		/** Format: int32 */
		codigo?: number;
		descricao?: string;
	}[];
	qsa?: {
		/** Format: int32 */
		identificador_de_socio?: number;
		nome_socio?: string;
		cnpj_cpf_do_socio?: string;

		/** Format: int32 */
		codigo_qualificacao_socio?: number;

		/** Format: int32 */
		percentual_capital_social?: number;

		/** Format: date */
		data_entrada_sociedade?: string;

		/** Format: nullable */
		cpf_representante_legal?: string;

		/** Format: nullable */
		nome_representante_legal?: string;

		/** Format: nullable */
		codigo_qualificacao_representante_legal?: string;
	}[];
};
