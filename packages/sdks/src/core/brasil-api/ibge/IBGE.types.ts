/**
 * Municipio
 * @example {
 *   "nome": "União do Oeste",
 *   "codigo_ibge": "421885505"
 * }
 */
export type Municipio = {
	nome: string;
	codigo_ibge: string;
};

/**
 * Estado
 * @example {
 *   "id": 35,
 *   "sigla": "SP",
 *   "nome": "São Paulo",
 *   "regiao": {
 *     "id": 3,
 *     "sigla": "SE",
 *     "nome": "Sudeste"
 *   }
 * }
 */
export type Estado = {
	/** Format: int32 */
	id: number;
	sigla: string;
	nome: string;
	regiao: Regiao;
};

/**
 * Regiao
 * @example {
 *   "id": 3,
 *   "sigla": "SE",
 *   "nome": "Sudeste"
 * }
 */
export type Regiao = {
	/** Format: int32 */
	id: number;
	sigla: string;
	nome: string;
};
