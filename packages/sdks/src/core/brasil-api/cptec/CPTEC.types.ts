/**
 * City
 * @example {
 *   "nome": "São Benedito",
 *   "estado": "CE",
 *   "id": 4750
 * }
 */
export type City = {
	nome: string;
	estado: string;
	id: number;
};

/**
 * Currentcondicao
 * @example {
 *   "codigo_icao": "SBAR",
 *   "atualizado_em": "2021-01-27T15:00:00.974Z",
 *   "pressao_atmosferica": "1014",
 *   "visibilidade": "9000",
 *   "vento": 29,
 *   "direcao_vento": 90,
 *   "umidade": 74,
 *   "condicao": "ps",
 *   "condicao_Desc": "Predomínio de Sol",
 *   "temp": 28
 * }
 */
export type CurrentCondicao = {
	/** @description Código ICAO do aeroporto */
	codigo_icao: string;

	/** @description Data de última atualização em formato ISO. */
	atualizado_em: string;

	/** @description Pressão atmosférica medida na estação meteorológica do aeroporto expressa em hPa (Hectopascal). */
	pressao_atmosferica: number;

	/** @description Condição atual de visibilidade em metros. */
	visibilidade: string;

	/** @description Intensidade do vendo em km/h. */
	vento: number;

	/** @description Direção do vento em graus (de 0° a 360° */
	direcao_vento: number;

	/** @description Umidade relativa do ar em porcentagem. */
	umidade: number;

	/** @description Código da condição meteorológica */
	condicao?: string;

	/** @description Texto descritivo para a condição meteorológica. */
	condicao_desc?: string;

	/** @description Temperatura (em graus celsius) */
	temp: number;
};

/**
 * ClimaPrediction
 * @example {
 *   "cidade": "Brejo Alegre",
 *   "estado": "SP",
 *   "atualizado_em": "2020-12-27",
 *   "clima": [
 *     {
 *       "data": "2020-12-27",
 *       "condicao": "pc",
 *       "min": 20,
 *       "max": 30,
 *       "indice_uv": 13,
 *       "condicao_desc": "Pancadas de Chuva"
 *     },
 *     {
 *       "data": "2020-12-28",
 *       "condicao": "pc",
 *       "min": 22,
 *       "max": 29,
 *       "indice_uv": 13,
 *       "condicao_desc": "Pancadas de Chuva"
 *     }
 *   ]
 * }
 */
export type ClimaPrediction = {
	cidade: string;
	estado: string;
	atualizado_em: string;

	/** @description Lista com condições climáticas dia a dia */
	clima: Clima[];
};

/**
 * Clima
 * @example {
 *   "data": "2020-12-27",
 *   "condicao": "pc",
 *   "min": 20,
 *   "max": 30,
 *   "indice_uv": 13,
 *   "condicao_desc": "Pancadas de Chuva"
 * }
 */
export type Clima = {
	/** @description Data em formato ISO */
	data: string;

	/** @description Código da condição meteorológica */
	condicao: string;

	/** @description Temperatura mínima (em graus celsius) prevista. */
	min: number;

	/** @description Temperatura máxima (em graus celsius) prevista. */
	max: number;

	/** @description O IUV representa o valor máximo diário da radiação ultravioleta, isto é, no período referente ao meio-dia solar, o horário de máxima intensidade de radiação solar. */
	indice_uv: number;

	/** @description Texto descritivo para a condição meteorológica. */
	condicao_desc: string;
};

/**
 * OndasPrediction
 * @example {
 *   "cidade": "Rio de Janeiro",
 *   "estado": "RJ",
 *   "atualizado_em": "2020-12-27",
 *   "ondas": [
 *     {
 *       "data": "27-12-2020",
 *       "dados_ondas": [
 *         {
 *           "vento": 5.2,
 *           "direcao_vento": "E",
 *           "direcao_vento_desc": "Leste",
 *           "altura_onda": 0.8,
 *           "direcao_onda": "ESE",
 *           "direcao_onda_desc": "Lés-sudeste",
 *           "agitacao": "Fraco",
 *           "hora": "00h Z"
 *         },
 *         {
 *           "vento": 4.8,
 *           "direcao_vento": "E",
 *           "direcao_vento_desc": "Leste",
 *           "altura_onda": 0.5,
 *           "direcao_onda": "ESE",
 *           "direcao_onda_desc": "Lés-sudeste",
 *           "agitacao": "Fraco",
 *           "hora": "03h Z"
 *         }
 *       ]
 *     }
 *   ]
 * }
 */
export type OndasPrediction = {
	cidade: string;
	estado: string;

	/** @description Data no formato ISO */
	atualizado_em: string;
	ondas: OndasData[];
};

/**
 * OndasData
 * @example {
 *   "data": "2020-12-07",
 *   "ondas_data": [
 *     {
 *       "vento": 5.2,
 *       "direcao_vento": "E",
 *       "direcao_vento_desc": "Leste",
 *       "altura_onda": 0.8,
 *       "direcao_onda": "ESE",
 *       "direcao_onda_desc": "Lés-sudeste",
 *       "agitacao": "Fraco",
 *       "hora": "00h Z"
 *     },
 *     {
 *       "vento": 4.8,
 *       "direcao_vento": "E",
 *       "direcao_vento_desc": "Leste",
 *       "altura_onda": 0.5,
 *       "direcao_onda": "ESE",
 *       "direcao_onda_desc": "Lés-sudeste",
 *       "agitacao": "Fraco",
 *       "hora": "03h Z"
 *     }
 *   ]
 * }
 */
export type OndasData = {
	data: string;
	ondas_data: Ondas[];
};

/**
 * Ondas
 * @example {
 *   "vento": 5.2,
 *   "direcao_vento": "E",
 *   "direcao_vento_desc": "Leste",
 *   "altura_onda": 0.8,
 *   "direcao_onda": "ESE",
 *   "direcao_onda_desc": "Lés-sudeste",
 *   "agitacao": "Fraco",
 *   "hora": "00h Z"
 * }
 */
export type Ondas = {
	/** @description Velocidade do vento em km/h. */
	vento: number;

	/** @description Sigla do ponto cardeal, colateral ou subcolateral que indica a direção do vento. */
	direcao_vento: string;

	/** @description Altura em metros das ondas no município ou localidade litorâneo(a) selecionado(a) no determinado período do dia, representada por um número decimal. */
	altura_onda: number;

	/** @description Sigla do ponto cardeal, colateral ou subcolateral que indica a direção das ondas. */
	direcao_onda: string;

	/** @description Texto que indica a agitação do mar. */
	agitacao: string;

	/** @description Hora do dia para a condição prevista */
	hora: string;
};
