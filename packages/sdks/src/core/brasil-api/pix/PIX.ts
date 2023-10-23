import { FetchJson } from "@/helpers/fetch-json";
import { BRASIL_API_URL } from "../constants";
import { PIXParticipant } from "./PIX.types";

export class PIX {
	private readonly http = new FetchJson(`${BRASIL_API_URL}/pix`);

	/**
	 * PT-BR: Retorna informações de todos os participantes do PIX no dia atual ou anterior.
	 * EN-US: Returns information about all PIX participants on the current or previous day.
	 *
	 * @returns PT-BR: Uma lista de objetos contendo o ISPB, o nome, o nome reduzido, a modalidade de participação, o tipo de participação e a data de início de operação dos participantes do PIX. EN-US: A list of objects containing the ISPB, name, abbreviated name, participation modality, participation type and start date of operation of the PIX participants.
	 *
	 * @example
	 * ```typescript
	 * const PIX = new BrasilApi.PIX();
	 *
	 * const participants = await PIX.getParticipants();
	 *
	 * console.log(participants);
	 * // [
	 * //   {
	 * //     "ispb": "360305",
	 * //     "nome": "CAIXA ECONOMICA FEDERAL",
	 * //     "nome_reduzido": "CAIXA ECONOMICA FEDERAL",
	 * //     "modalidade_participacao": "PDCT",
	 * //     "tipo_participacao": "DRCT",
	 * //     "inicio_operacao": "2020-11-03T09:30:00.000Z"
	 * //   },
	 * //   ...
	 * // ]
	 * ```
	 */
	public async getParticipants() {
		const response = await this.http.get<PIXParticipant[]>("/v1/participants");

		return response.data;
	}
}
