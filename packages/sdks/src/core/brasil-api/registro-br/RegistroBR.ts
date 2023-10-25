import { FetchJson } from "@/helpers/fetch-json";
import { BRASIL_API_URL } from "../constants";
import { DomainInfo } from "./RegistroBR.types";

export class RegistroBR {
	private readonly http = new FetchJson(`${BRASIL_API_URL}/registrobr`);

	/**
	 * PT-BR: Avalia o status de um domínio .br.
	 * EN-US: Evaluates the status of a .br domain.
	 *
	 * @param domain PT-BR: O domínio ou nome a ser avaliado. EN-US: The domain or name to be evaluated.
	 * @returns PT-BR: Um objeto contendo o código de status, o status, o FQDN, os hosts, o status de publicação, a data de expiração e as sugestões de domínios. EN-US: An object containing the status code, status, FQDN, hosts, publication status, expiration date and domain suggestions.
	 *
	 * @example
	 * ```typescript
	 * const RegistroBRApi = new BrasilApi.RegistroBRApi();
	 *
	 * const domainInfo = await RegistroBRApi.getDomainInfo("brasilapi.com.br");
	 *
	 * console.log(domainInfo);
	 * // {
	 * //   "status_code": 2,
	 * //   "status": "REGISTERED",
	 * //   "fqdn": "brasilapi.com.br",
	 * //   "hosts": [
	 * //     "bob.ns.cloudflare.com",
	 * //     "lily.ns.cloudflare.com"
	 * //   ],
	 * //   "publication-status": "published",
	 * //   "expires-at": "2022-09-23T00:00:00-03:00",
	 * //   "suggestions": [
	 * //     "agr.br",
	 * //     "app.br",
	 * //     "art.br",
	 * //     "blog.br",
	 * //     "dev.br",
	 * //     "eco.br",
	 * //     "esp.br",
	 * //     "etc.br",
	 * //     "far.br",
	 * //     "flog.br",
	 * //     "imb.br",
	 * //     "ind.br",
	 * //     "inf.br",
	 * //     "log.br",
	 * //     "net.br",
	 * //     "ong.br",
	 * //     "rec.br",
	 * //     "seg.br",
	 * //     "srv.br",
	 * //     "tec.br",
	 * //     "tmp.br",
	 * //     "tur.br",
	 * //     "tv.br",
	 * //     "vlog.br",
	 * //     "wiki.br"
	 * //   ]
	 * // }
	 * ```
	 */
	public async getDomainInfo(domain: string) {
		const response = await this.http.get<DomainInfo>(`/v1/${domain}`);

		return response.data;
	}
}
