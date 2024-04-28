/**
 * NCMInfo
 * @example {
 *   "codigo": "3305.10.00",
 *   "descricao": "- Xampus",
 *   "data_inicio": "2022-04-01",
 *   "data_fim": "9999-12-31",
 *   "tipo_ato": "Res Camex",
 *   "numero_ato": "000272",
 *   "ano_ato": "2021"
 * }
 */
export type NCMInfo = {
	codigo: string;
	descricao: string;
	data_inicio: string;
	data_fim: string;
	tipo_ato: string;
	numero_ato: string;
	ano: string;
};
