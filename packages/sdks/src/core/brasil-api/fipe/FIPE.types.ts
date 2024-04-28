/**
 * Tabelas de referência FIPE
 * @example {
 *   "codigo": 271,
 *   "mes": "junho/2021 "
 * }
 */
export type TabelaFIPE = {
	codigo: number;
	mes: string;
};

/**
 * Marcas FIPE
 * @example {
 *   "nome": "AGRALE",
 *   "valor": "102"
 * }
 */
export type MarcaFIPE = {
	nome: string;
	valor: number;
};

/**
 * Veículo FIPE
 * @example {
 *   "valor": "R$ 6.022,00",
 *   "marca": "Fiat",
 *   "modelo": "Palio EX 1.0 mpi 2p",
 *   "anoModelo": 1998,
 *   "combustivel": "Álcool",
 *   "codigoFipe": "001004-9",
 *   "mesReferencia": "junho de 2021 ",
 *   "tipoVeiculo": 1,
 *   "siglaCombustivel": "Á",
 *   "dataConsulta": "segunda-feira, 7 de junho de 2021 23:05"
 * }
 */
export type VeiculoFIPE = {
	valor: string;
	marca: string;
	modelo: string;
	anoModelo: number;
	combustivel: string;
	codigoFipe: string;
	mesReferencia: string;
	tipoVeiculo: number;
	siglaCombustivel: string;
	dataConsulta: string;
};
