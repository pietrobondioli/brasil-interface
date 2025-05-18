/**
 * DDD Info
 * @example {
 *   "state": "SP",
 *   "cities": [
 *     "EMBU",
 *     "VÁRZEA PAULISTA",
 *     "VARGEM GRANDE PAULISTA",
 *     "VARGEM",
 *     "TUIUTI",
 *     "TABOÃO DA SERRA",
 *     "SUZANO",
 *     "SÃO ROQUE",
 *     "SÃO PAULO"
 *   ]
 * }
 */
export type DDDInfo = {
	state: string;
	cities: string[];
	nome?: string;
	regiao?: Region;
};

/**
 * ErrorMessage
 * @example {
 *   "message": "Cidade não localizada",
 *   "type": "city_error",
 *   "name": "CITY_NOT_FOUND"
 * }
 */
export type ErrorMessage = {
	message: string;
	name: string;
	type: string;
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
