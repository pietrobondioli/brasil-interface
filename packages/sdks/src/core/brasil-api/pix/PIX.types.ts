/**
 * PIXParticipant
 * @example {
 *   "ispb": "360305",
 *   "nome": "CAIXA ECONOMICA FEDERAL",
 *   "nome_reduzido": "CAIXA ECONOMICA FEDERAL",
 *   "modalidade_participacao": "PDCT",
 *   "tipo_participacao": "DRCT",
 *   "inicio_operacao": "2020-11-03T09:30:00.000Z"
 * }
 */
export type PIXParticipant = {
	/** @description ISPB */
	ispb: string;

	/** @description Nome do participante */
	nome: string;

	/** @description Nome reduzido do participante */
	nome_reduzido: string;

	/** @description Modalidade de Participação */
	modalidade_participacao: string;

	/** @description Tipo de participante */
	tipo_participacao: string;

	/** @description Date de inicio da operação */
	inicio_operacao: string;
};
