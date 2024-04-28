/**
 * Feriado
 * @example {
 *   "date": "2021-01-01",
 *   "name": "Confraternização mundial",
 *   "type": "national"
 * }
 */
export type Feriado = {
	date: string;
	type: string;

	/** Format: int32 */
	name: string;
	fullName?: string;
};
