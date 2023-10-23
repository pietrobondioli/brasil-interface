import { FetchJson } from "@/helpers/fetch-json";
import { VIA_CEP_URL } from "./contants";
import { ViaCepAddress } from "./via-cep.types";

export class ViaCepAPI {
	private readonly http: FetchJson;

	constructor() {
		this.http = new FetchJson(VIA_CEP_URL);
	}

	/**
	 * PT-BR: Obtém informações de endereço pelo número do CEP.
	 * EN-US: Get address information by CEP number.
	 *
	 * @param cep PT-BR: O número do CEP. EN-US: The CEP number.
	 * @returns PT-BR: As informações de endereço para o CEP fornecido. EN-US: The address information for the provided CEP.
	 */
	public async getCepByNumber(cep: string): Promise<ViaCepAddress> {
		const response = await this.http.get<ViaCepAddress>(`/${cep}/json/`);

		return response.data;
	}
}
