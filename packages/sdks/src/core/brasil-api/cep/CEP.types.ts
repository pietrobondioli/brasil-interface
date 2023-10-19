/**
 * Address
 * @example {
 *   "cep": "89010025",
 *   "state": "SC",
 *   "city": "Blumenau",
 *   "neighborhood": "Centro",
 *   "street": "Rua Doutor Luiz de Freitas Melro",
 *   "service": "viacep"
 * }
 */
export type Address = {
	cep: string;
	state: string;
	city: string;
	neighborhood: string;
	street: string;
	service: string;
};

/**
 * CepError.
 * @example {
 *   "name": "CepPromiseError",
 *   "message": "Todos os serviços de CEP retornaram erro.",
 *   "type": "service_error",
 *   "errors": [
 *     {
 *       "name": "ServiceError",
 *       "message": "CEP INVÁLIDO",
 *       "service": "correios"
 *     },
 *     {
 *       "name": "ServiceError",
 *       "message": "CEP não encontrado na base do ViaCEP.",
 *       "service": "viacep"
 *     }
 *   ]
 * }
 */
export type CepError = {
	name: string;
	message: string;
	type: string;
	errors: Error[];
};

/**
 * Error
 * @example {
 *   "name": "ServiceError",
 *   "message": "CEP INVÁLIDO",
 *   "service": "correios"
 * }
 */
export type Error = {
	name: string;
	message: string;
	service: string;
};
