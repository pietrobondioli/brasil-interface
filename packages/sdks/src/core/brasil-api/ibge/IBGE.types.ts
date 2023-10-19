/**
 * State
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
export type State = {
	/** Format: int32 */
	id: number;
	sigla: string;
	nome: string;
	regiao: Region;
};

/**
 * Region
 * @example {
 *   "id": 3,
 *   "sigla": "SE",
 *   "nome": "Sudeste"
 * }
 */
export type Region = {
	/** Format: int32 */
	id: number;
	sigla: string;
	nome: string;
};
