/**
 * Avaliação de domínio .br
 * @example {
 *   "status_code": 2,
 *   "status": "REGISTERED",
 *   "fqdn": "brasilapi.com.br",
 *   "hosts": [
 *     "bob.ns.cloudflare.com",
 *     "lily.ns.cloudflare.com"
 *   ],
 *   "publication-status": "published",
 *   "expires-at": "2022-09-23T00:00:00-03:00",
 *   "suggestions": [
 *     "agr.br",
 *     "app.br",
 *     "art.br",
 *     "blog.br",
 *     "dev.br",
 *     "eco.br",
 *     "esp.br",
 *     "etc.br",
 *     "far.br",
 *     "flog.br",
 *     "imb.br",
 *     "ind.br",
 *     "inf.br",
 *     "log.br",
 *     "net.br",
 *     "ong.br",
 *     "rec.br",
 *     "seg.br",
 *     "srv.br",
 *     "tec.br",
 *     "tmp.br",
 *     "tur.br",
 *     "tv.br",
 *     "vlog.br",
 *     "wiki.br"
 *   ]
 * }
 */
export type RegistroBR = {
	/** @description 0 - domínio disponível | 1 - disponível com tickets concorrentes | 2 - já registrado | 3 - indisponível | 4 - inválido | 5 - aguardando processo de liberação | 6 - disponível no processo de liberação em andamento | 7 - disponível no processo de liberação em andamento com tickets concorrentes | 8 - erro | 9 - domínio em processo de liberação competitivo | 10 - desconhecido */
	status_code: number;

	/** @description AVAILABLE | AVAILABLE_WITH_TICKET | REGISTERED | UNAVAILABLE | INVALID_QUERY | RELEASE_WAITING | RELEASE_IN_PROGRESS | RELEASE_IN_PROGRESS_WITH_TICKETS | ERROR | DOMAIN_PROCESS_RELEASE | UNKNOW */
	status: string;

	/** @description Domínio pesquisado */
	fqdn: string;

	/** @description Caso o dominio esteja indisponivel o registro podera sugerir extensões disponíveis para o registro */
	suggestions?: unknown[];

	/** @description CDN's de um domínio publicado */
	hosts?: unknown[];

	/** @description Status de um dominio registrado */
	"publication-status"?: string;

	/** @description Vencimento do domínio */
	"expires-at"?: string;

	/** @description Justificativas da indisponibilidade de registro ainda não registrado */
	reasons?: unknown[];
};

/**
 * Erro ao avaliar o domínio
 * @example {
 *   "message": "O domínio não foi informado corretamente!",
 *   "type": "bad_request",
 *   "name": "BadRequestError"
 * }
 */
export type RegistroBrBadRequest = {
	/** @description Mensagem de erro */
	message: string;

	/** @description Tipo do erro */
	type: string;

	/** @description Nome do erro */
	name: string;
};
