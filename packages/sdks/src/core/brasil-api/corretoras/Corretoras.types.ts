/**
 * Corretora
 * @example {
 *   "bairro": "LEBLON",
 *   "cep": "22440032",
 *   "cnpj": "02332886000104",
 *   "codigo_cvm": "3247",
 *   "complemento": "SALA 201",
 *   "data_inicio_situacao": "1998-02-10",
 *   "data_patrimonio_liquido": "2021-12-31",
 *   "data_registro": "1997-12-05",
 *   "email": "juridico.regulatorio@xpi.com.br",
 *   "logradouro": "AVENIDA ATAULFO DE PAIVA 153",
 *   "municipio": "RIO DE JANEIRO",
 *   "nome_social": "XP INVESTIMENTOS CCTVM S.A.",
 *   "nome_comercial": "XP INVESTIMENTOS",
 *   "pais": "",
 *   "status": "EM FUNCIONAMENTO NORMAL",
 *   "telefone": "30272237",
 *   "type": "CORRETORAS",
 *   "uf": "RJ",
 *   "valor_patrimonio_liquido": "5514593491.29"
 * }
 */
export type Corretora = {
	cnpj: string;
	nome_social: string;
	nome_comercial: string;
	bairro: string;
	cep: string;
	codigo_cvm: string;
	complemento: string;
	data_inicio_situacao: string;
	data_patrimonio_liquido: string;
	data_registro: string;
	email: string;
	logradouro: string;
	municipio: string;
	pais: string;
	telefone: string;
	uf: string;
	valor_patrimonio_liquido: string;
};
